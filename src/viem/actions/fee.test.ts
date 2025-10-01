import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { setTimeout } from 'node:timers/promises'
import { tempoLocal } from 'tempo/chains'
import { Instance } from 'tempo/prool'
import * as actions from 'tempo/viem/actions'
import { parseEther, publicActions } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { waitForTransactionReceipt, writeContract } from 'viem/actions'
import { tip20Abi } from '../abis.js'
import { usdAddress } from '../addresses.js'
import { createTempoClient } from '../client.js'

const instance = Instance.tempo({ port: 8545 })

beforeEach(() => instance.start())
afterEach(() => instance.stop())

const account = mnemonicToAccount(
  'test test test test test test test test test test test junk',
)
const account2 = mnemonicToAccount(
  'test test test test test test test test test test test junk',
  { accountIndex: 1 },
)
const account3 = mnemonicToAccount(
  'test test test test test test test test test test test junk',
  { accountIndex: 2 },
)

const client = createTempoClient({
  account,
  chain: tempoLocal,
  pollingInterval: 100,
}).extend(publicActions)

describe.skipIf(!!process.env.CI)('getUserToken', () => {
  test('default', async () => {
    // Fund accounts
    await writeContract(client, {
      abi: tip20Abi,
      address: usdAddress,
      functionName: 'transfer',
      args: [account2.address, parseEther('100')],
    })
    const hash = await writeContract(client, {
      abi: tip20Abi,
      address: usdAddress,
      functionName: 'transfer',
      args: [account3.address, parseEther('100')],
    })
    await waitForTransactionReceipt(client, { hash })

    {
      // Set token (address)
      const hash = await actions.fee.setUserToken(client, {
        account: account2,
        token: '0x20c0000000000000000000000000000000000001',
      })
      await waitForTransactionReceipt(client, { hash })
    }

    {
      // Set another token (id)
      const hash = await actions.fee.setUserToken(client, {
        account: account3,
        token: 2n,
      })
      await waitForTransactionReceipt(client, { hash })
    }

    // Assert that account (with default) & account2 (with custom) tokens are set correctly.
    expect(
      await actions.fee.getUserToken(client, { account }),
    ).toMatchInlineSnapshot(`
      {
        "address": "0x20C0000000000000000000000000000000000000",
        "id": 0n,
      }
    `)
    expect(
      await actions.fee.getUserToken(client, { account: account2 }),
    ).toMatchInlineSnapshot(`
      {
        "address": "0x20C0000000000000000000000000000000000001",
        "id": 1n,
      }
    `)
    expect(
      await actions.fee.getUserToken(client, { account: account3 }),
    ).toMatchInlineSnapshot(`
      {
        "address": "0x20C0000000000000000000000000000000000002",
        "id": 2n,
      }
    `)
  })
})

describe.skipIf(!!process.env.CI)('setUserToken', () => {
  test('default', async () => {
    expect(await actions.fee.getUserToken(client)).toMatchInlineSnapshot(
      `
        {
          "address": "0x20C0000000000000000000000000000000000000",
          "id": 0n,
        }
      `,
    )

    {
      const hash = await actions.fee.setUserToken(client, {
        token: '0x20c0000000000000000000000000000000000001',
      })
      await waitForTransactionReceipt(client, { hash })
    }

    expect(await actions.fee.getUserToken(client, {})).toMatchInlineSnapshot(
      `
        {
          "address": "0x20C0000000000000000000000000000000000001",
          "id": 1n,
        }
      `,
    )

    {
      const hash = await actions.fee.setUserToken(client, {
        feeToken: 0n,
        token: 0n,
      })
      await waitForTransactionReceipt(client, { hash })
    }

    expect(await actions.fee.getUserToken(client, {})).toMatchInlineSnapshot(
      `
        {
          "address": "0x20C0000000000000000000000000000000000000",
          "id": 0n,
        }
      `,
    )
  })
})

describe.skipIf(!!process.env.CI)('watchSetUserToken', () => {
  test('default', async () => {
    const receivedSets: Array<{
      args: actions.fee.watchSetUserToken.Args
      log: actions.fee.watchSetUserToken.Log
    }> = []

    // Start watching for user token set events
    const unwatch = actions.fee.watchSetUserToken(client, {
      onUserTokenSet: (args, log) => {
        receivedSets.push({ args, log })
      },
    })

    try {
      // Set token for account2
      {
        const hash = await writeContract(client, {
          abi: tip20Abi,
          address: usdAddress,
          functionName: 'transfer',
          args: [account2.address, parseEther('1')],
        })
        await waitForTransactionReceipt(client, { hash })
      }

      const hash1 = await actions.fee.setUserToken(client, {
        account: account2,
        token: '0x20c0000000000000000000000000000000000001',
      })
      await waitForTransactionReceipt(client, { hash: hash1 })

      // Set token for account3
      {
        const hash = await writeContract(client, {
          abi: tip20Abi,
          address: usdAddress,
          functionName: 'transfer',
          args: [account3.address, parseEther('1')],
        })
        await waitForTransactionReceipt(client, { hash })
      }

      const hash2 = await actions.fee.setUserToken(client, {
        account: account3,
        token: '0x20c0000000000000000000000000000000000002',
      })
      await waitForTransactionReceipt(client, { hash: hash2 })

      await setTimeout(100)

      expect(receivedSets).toHaveLength(2)

      expect(receivedSets.at(0)!.args).toMatchInlineSnapshot(`
        {
          "token": "0x20C0000000000000000000000000000000000001",
          "user": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
        }
      `)
      expect(receivedSets.at(1)!.args).toMatchInlineSnapshot(`
        {
          "token": "0x20C0000000000000000000000000000000000002",
          "user": "0x98e503f35D0a019cB0a251aD243a4cCFCF371F46",
        }
      `)
    } finally {
      if (unwatch) unwatch()
    }
  })

  test('behavior: filter by user address', async () => {
    const receivedSets: Array<{
      args: actions.fee.watchSetUserToken.Args
      log: actions.fee.watchSetUserToken.Log
    }> = []

    // Start watching for user token set events only for account2
    const unwatch = actions.fee.watchSetUserToken(client, {
      args: {
        user: account2.address,
      },
      onUserTokenSet: (args, log) => {
        receivedSets.push({ args, log })
      },
    })

    try {
      // Transfer gas to accounts
      {
        const hash = await writeContract(client, {
          abi: tip20Abi,
          address: usdAddress,
          functionName: 'transfer',
          args: [account2.address, parseEther('1')],
        })
        await waitForTransactionReceipt(client, { hash })
      }

      {
        const hash = await writeContract(client, {
          abi: tip20Abi,
          address: usdAddress,
          functionName: 'transfer',
          args: [account3.address, parseEther('1')],
        })
        await waitForTransactionReceipt(client, { hash })
      }

      // Set token for account2 (should be captured)
      const hash1 = await actions.fee.setUserToken(client, {
        account: account2,
        token: '0x20c0000000000000000000000000000000000001',
      })
      await waitForTransactionReceipt(client, { hash: hash1 })

      // Set token for account3 (should NOT be captured)
      const hash2 = await actions.fee.setUserToken(client, {
        account: account3,
        token: '0x20c0000000000000000000000000000000000002',
      })
      await waitForTransactionReceipt(client, { hash: hash2 })

      // Set token for account2 again (should be captured)
      const hash3 = await actions.fee.setUserToken(client, {
        account: account2,
        feeToken: 0n,
        token: 2n,
      })
      await waitForTransactionReceipt(client, { hash: hash3 })

      await setTimeout(100)

      // Should only receive 2 events (for account2)
      expect(receivedSets).toHaveLength(2)

      expect(receivedSets.at(0)!.args).toMatchInlineSnapshot(`
        {
          "token": "0x20C0000000000000000000000000000000000001",
          "user": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
        }
      `)
      expect(receivedSets.at(1)!.args).toMatchInlineSnapshot(`
        {
          "token": "0x20C0000000000000000000000000000000000002",
          "user": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
        }
      `)

      // Verify all received events are for account2
      for (const set of receivedSets) {
        expect(set.args.user).toBe(account2.address)
      }
    } finally {
      if (unwatch) unwatch()
    }
  })
})

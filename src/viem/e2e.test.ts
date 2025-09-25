import { afterEach, beforeEach, expect, test } from 'bun:test'
import { tempoLocal } from 'tempo/chains'
import { Instance } from 'tempo/prool'
import { createClient, http, publicActions, walletActions } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'

const instance = Instance.tempo({ port: 8545 })

beforeEach(() => instance.start())
afterEach(() => instance.stop())

test('sendTransaction (type: 0x77)', async () => {
  const client = createClient({
    account: mnemonicToAccount(
      'test test test test test test test test test test test junk',
    ),
    chain: tempoLocal,
    transport: http(),
  })
    .extend(publicActions)
    .extend(walletActions)

  const hash = await client.sendTransaction({
    feeToken: '0x20c0000000000000000000000000000000000000',
    to: '0x0000000000000000000000000000000000000000',
  })

  expect(await client.getTransaction({ hash })).toMatchInlineSnapshot(`
    {
      "accessList": [],
      "authorizationList": [],
      "blockHash": null,
      "blockNumber": null,
      "chainId": 1337,
      "data": "0x",
      "feeToken": "0x20c0000000000000000000000000000000000000",
      "from": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      "gas": 21000n,
      "gasPrice": 52n,
      "hash": "0x7d2455f8401a00846195c0832eef2b90b10001ca6935dfa7b6c69193664c255f",
      "input": "0x",
      "maxFeePerBlobGas": undefined,
      "maxFeePerGas": 52n,
      "maxPriorityFeePerGas": 0n,
      "nonce": 0n,
      "r": 58460916333183078649529489738684041515880112183282369675165050600259272149944n,
      "s": 13523533666714072908825723941075329471154256851896494868115028113855216484763n,
      "to": "0x0000000000000000000000000000000000000000",
      "transactionIndex": null,
      "type": "feeToken",
      "typeHex": "0x77",
      "v": 27,
      "value": 0n,
      "yParity": 0,
    }
  `)
})

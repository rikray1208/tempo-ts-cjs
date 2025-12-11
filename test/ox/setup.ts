import { setTimeout } from 'node:timers/promises'
import { afterAll, beforeAll } from 'vitest'
import { Actions } from '../../src/viem/index.js'
import { nodeEnv, rpcUrl } from '../config.js'
import { accounts, client } from '../viem/config.js'

beforeAll(async () => {
  if (nodeEnv === 'localnet') return
  await Actions.faucet.fundSync(client, {
    account: accounts[0].address,
  })
  // TODO: remove once testnet load balancing is fixed.
  await setTimeout(2000)
})

afterAll(async () => {
  if (nodeEnv !== 'localnet') return
  await fetch(`${rpcUrl}/stop`)
})

import * as Address from 'ox/Address'
import * as Bytes from 'ox/Bytes'
import * as Hash from 'ox/Hash'
import * as Hex from 'ox/Hex'
import * as Provider from 'ox/Provider'
import * as RpcRequest from 'ox/RpcRequest'
import {
  createClient,
  type EIP1193Provider,
  getAddress,
  type LocalAccount,
  SwitchChainError,
  type Transport,
  type Account as viem_Account,
} from 'viem'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import {
  getTransactionReceipt,
  sendTransaction,
  sendTransactionSync,
} from 'viem/actions'
import { ChainNotConfiguredError, createConnector } from 'wagmi'
import * as Account from '../viem/Account.js'
import type * as tempo_Chain from '../viem/Chain.js'
import * as WebAuthnP256 from '../viem/WebAuthnP256.js'

type Chain = ReturnType<ReturnType<typeof tempo_Chain.define>>

const sendCallsMagic = Hash.keccak256(Hex.fromString('TEMPO_5792'))

/**
 * Connector for a Secp256k1 EOA.
 *
 * WARNING: NOT RECOMMENDED FOR PRODUCTION USAGE.
 * This connector stores private keys in clear text, and are bound to the session
 * length of the storage used.
 *
 * @returns Connector.
 */
export function dangerous_secp256k1(
  options: dangerous_secp256k1.Parameters = {},
) {
  let account: LocalAccount | undefined

  type Properties = {
    connect<withCapabilities extends boolean = false>(parameters: {
      capabilities?:
        | {
            createAccount?: boolean | undefined
          }
        | undefined
      chainId?: number | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }): Promise<{
      accounts: readonly Address.Address[]
      chainId: number
    }>
  }
  type Provider = Pick<EIP1193Provider, 'request'>
  type StorageItem = {
    'secp256k1.activeAddress': Address.Address
    'secp256k1.lastActiveAddress': Address.Address
    [key: `secp256k1.${string}.privateKey`]: Hex.Hex
  }

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'secp256k1',
    name: 'EOA (Secp256k1)',
    type: 'secp256k1',
    async setup() {
      const address = await config.storage?.getItem('secp256k1.activeAddress')
      const privateKey = await config.storage?.getItem(
        `secp256k1.${address}.privateKey`,
      )
      if (privateKey) account = privateKeyToAccount(privateKey)
      else if (
        address &&
        options.account &&
        Address.isEqual(address, options.account.address)
      )
        account = options.account
    },
    async connect(parameters = {}) {
      const address = await (async () => {
        if (
          'capabilities' in parameters &&
          parameters.capabilities?.createAccount
        ) {
          const privateKey = generatePrivateKey()
          const account = privateKeyToAccount(privateKey)
          const address = account.address
          await config.storage?.setItem(
            `secp256k1.${address}.privateKey`,
            privateKey,
          )
          await config.storage?.setItem('secp256k1.activeAddress', address)
          await config.storage?.setItem('secp256k1.lastActiveAddress', address)
          return address
        }

        const address = await config.storage?.getItem(
          'secp256k1.lastActiveAddress',
        )
        const privateKey = await config.storage?.getItem(
          `secp256k1.${address}.privateKey`,
        )

        if (privateKey) account = privateKeyToAccount(privateKey)
        else if (options.account) {
          account = options.account
          await config.storage?.setItem(
            'secp256k1.lastActiveAddress',
            account.address,
          )
        }

        if (!account) throw new Error('account not found.')

        await config.storage?.setItem(
          'secp256k1.activeAddress',
          account.address,
        )
        return account.address
      })()

      const chainId = parameters.chainId ?? config.chains[0]?.id
      if (!chainId) throw new ChainNotConfiguredError()

      return {
        accounts: (parameters.withCapabilities
          ? [{ address }]
          : [address]) as never,
        chainId,
      }
    },
    async disconnect() {
      await config.storage?.removeItem('secp256k1.activeAddress')
      account = undefined
    },
    async getAccounts() {
      if (!account) return []
      return [getAddress(account.address)]
    },
    async getChainId() {
      return config.chains[0]?.id!
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch (error) {
        console.error(
          'Connector.secp256k1: Failed to check authorization',
          error,
        )
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())
      return chain
    },
    onAccountsChanged() {},
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect() {
      config.emitter.emit('disconnect')
      account = undefined
    },
    async getClient({ chainId } = {}) {
      const chain =
        config.chains.find((x) => x.id === chainId) ?? config.chains[0]
      if (!chain) throw new ChainNotConfiguredError()

      const transports = config.transports
      if (!transports) throw new ChainNotConfiguredError()

      const transport = transports[chain.id]
      if (!transport) throw new ChainNotConfiguredError()

      return createClient({
        account,
        chain: chain as Chain,
        transport: withErc5792Compat(transport, {
          account,
        }),
      })
    },
    async getProvider({ chainId } = {}) {
      const { request } = await this.getClient!({ chainId })
      return { request }
    },
  }))
}

export declare namespace dangerous_secp256k1 {
  export type Parameters = {
    account?: LocalAccount | undefined
  }
}

/**
 * Connector for a WebAuthn EOA.
 *
 * @returns Connector.
 */
export function webAuthn(options: webAuthn.Parameters = {}) {
  let account: Account.Account | undefined

  type Properties = {
    connect<withCapabilities extends boolean = false>(parameters: {
      chainId?: number | undefined
      capabilities?:
        | {
            createAccount?:
              | boolean
              | {
                  label?: string | undefined
                }
              | undefined
          }
        | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }): Promise<{ accounts: readonly Address.Address[]; chainId: number }>
  }
  type Provider = Pick<EIP1193Provider, 'request'>
  type StorageItem = {
    'webAuthn.activeCredential': WebAuthnP256.P256Credential
    'webAuthn.lastActiveCredential': WebAuthnP256.P256Credential
    [key: `webAuthn.${string}.publicKey`]: Hex.Hex
  }

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'webAuthn',
    name: 'EOA (WebAuthn)',
    type: 'webAuthn',
    async setup() {
      const credential = await config.storage?.getItem(
        'webAuthn.activeCredential',
      )
      if (!credential) return
      account = Account.fromWebAuthnP256(credential)
    },
    async connect(parameters = {}) {
      account ??= await (async () => {
        let credential: WebAuthnP256.P256Credential | undefined

        if (
          'capabilities' in parameters &&
          parameters.capabilities?.createAccount
        ) {
          // Create credential (sign up)
          const createOptions =
            typeof parameters.capabilities?.createAccount === 'boolean'
              ? {}
              : parameters.capabilities?.createAccount
          const challenge = await options.createOptions?.getChallenge?.()
          credential = await WebAuthnP256.createCredential({
            ...(options.createOptions ?? {}),
            challenge: challenge
              ? new Uint8Array(Bytes.fromHex(challenge))
              : undefined,
            label:
              createOptions.label ??
              options.createOptions?.label ??
              `Account ${new Date().toISOString().split('T')[0]}`,
            rpId: options.createOptions?.rpId ?? options.rpId,
          })
          config.storage?.setItem(
            `webAuthn.${credential.id}.publicKey`,
            credential.publicKey,
          )
        } else {
          // Load credential (log in)
          credential = (await config.storage?.getItem(
            'webAuthn.activeCredential',
          )) as WebAuthnP256.P256Credential | undefined

          // If no active credential, load (last active, if present) credential from keychain.
          const lastActiveCredential = await config.storage?.getItem(
            'webAuthn.lastActiveCredential',
          )
          credential ??= await WebAuthnP256.getCredential({
            ...(options.getOptions ?? {}),
            credentialId: lastActiveCredential?.id,
            // biome-ignore lint/suspicious/noTsIgnore: _
            // @ts-ignore
            async getPublicKey(credential) {
              {
                const publicKey =
                  await options.getOptions?.getPublicKey?.(credential)
                if (publicKey) return publicKey
              }

              {
                const publicKey = await config.storage?.getItem(
                  `webAuthn.${credential.id}.publicKey`,
                )
                if (!publicKey) throw new Error('publicKey not found')
                return publicKey as Hex.Hex
              }
            },
            rpId: options.getOptions?.rpId ?? options.rpId,
          })
        }

        config.storage?.setItem('webAuthn.activeCredential', credential)
        config.storage?.setItem('webAuthn.lastActiveCredential', credential)
        return Account.fromWebAuthnP256(credential)
      })()

      const address = getAddress(account.address)

      const chainId = parameters.chainId ?? config.chains[0]?.id
      if (!chainId) throw new ChainNotConfiguredError()

      return {
        accounts: (parameters.withCapabilities
          ? [{ address }]
          : [address]) as never,
        chainId,
      }
    },
    async disconnect() {
      await config.storage?.removeItem('webAuthn.activeCredential')
      account = undefined
    },
    async getAccounts() {
      if (!account) return []
      return [getAddress(account.address)]
    },
    async getChainId() {
      return config.chains[0]?.id!
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch (error) {
        console.error(
          'Connector.webAuthn: Failed to check authorization',
          error,
        )
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())
      return chain
    },
    onAccountsChanged() {},
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect() {
      config.emitter.emit('disconnect')
      account = undefined
    },
    async getClient({ chainId } = {}) {
      const chain =
        config.chains.find((x) => x.id === chainId) ?? config.chains[0]
      if (!chain) throw new ChainNotConfiguredError()

      const transports = config.transports
      if (!transports) throw new ChainNotConfiguredError()

      const transport = transports[chain.id]
      if (!transport) throw new ChainNotConfiguredError()

      return createClient({
        account,
        chain: chain as Chain,
        transport: withErc5792Compat(transport, {
          account,
        }),
      })
    },
    async getProvider({ chainId } = {}) {
      const { request } = await this.getClient!({ chainId })
      return { request }
    },
  }))
}

export declare namespace webAuthn {
  export type Parameters = {
    /** Options for WebAuthn registration. */
    createOptions?:
      | (Pick<
          WebAuthnP256.createCredential.Parameters,
          'createFn' | 'label' | 'rpId' | 'userId' | 'timeout'
        > & {
          /** Function to fetch a challenge to sign over at registration. */
          getChallenge?: (() => Promise<Hex.Hex>) | undefined
        })
      | undefined
    /** Options for WebAuthn authentication. */
    getOptions?:
      | (Pick<WebAuthnP256.getCredential.Parameters, 'getFn' | 'rpId'> & {
          /** Function to fetch the public key for a credential. */
          getPublicKey?:
            | WebAuthnP256.getCredential.Parameters['getPublicKey']
            | undefined
        })
      | undefined
    /** The RP ID to use for WebAuthn. */
    rpId?: string | undefined
  }
}

// TODO: This is a temporary workaround to support EIP-5792. To be removed
// once we support a EIP-1193 Provider abstraction for Tempo accounts.
// biome-ignore lint/correctness/noUnusedVariables: _
function withErc5792Compat(
  transport: Transport,
  { account }: withErc5792Compat.Options,
): Transport {
  return (options) => {
    const t = transport(options)

    return {
      ...t,
      async request(args: never) {
        const request = RpcRequest.from(args)

        const client = createClient({
          account,
          chain: options.chain as Chain,
          transport,
        })

        if (request.method === 'wallet_sendCalls') {
          const params = request.params[0] ?? {}
          const { capabilities, chainId, from } = params
          const { sync } = capabilities ?? {}

          if (!account) throw new Provider.DisconnectedError()
          if (!chainId) throw new Provider.UnsupportedChainIdError()
          if (Number(chainId) !== client.chain.id)
            throw new Provider.UnsupportedChainIdError()
          if (from && !Address.isEqual(from, account.address))
            throw new Provider.DisconnectedError()

          const calls = (params.calls ?? []).map((call) => ({
            to: call.to,
            value: call.value ? BigInt(call.value) : undefined,
            data: call.data,
          }))

          const hash = await (async () => {
            if (!sync)
              return sendTransaction(client, {
                account,
                calls,
              })

            const { transactionHash } = await sendTransactionSync(client, {
              account,
              calls,
            })
            return transactionHash
          })()

          const id = Hex.concat(hash, Hex.padLeft(chainId, 32), sendCallsMagic)

          return {
            capabilities: { sync },
            id,
          }
        }

        if (request.method === 'wallet_getCallsStatus') {
          const [id] = request.params ?? []
          if (!id) throw new Error('`id` not found')
          if (!id.endsWith(sendCallsMagic.slice(2)))
            throw new Error('`id` not supported')
          Hex.assert(id)

          const hash = Hex.slice(id, 0, 32)
          const chainId = Hex.slice(id, 32, 64)

          const receipt = await getTransactionReceipt(client, { hash })
          return {
            atomic: true,
            chainId: Number(chainId),
            receipts: [receipt],
            status: receipt.status === 'success' ? 200 : 500,
            version: '2.0.0',
          }
        }

        return t.request(args)
      },
    } as never
  }
}

declare namespace withErc5792Compat {
  type Options = {
    account: viem_Account | undefined
  }
}

import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi'

export function App() {
  const account = useAccount()

  return (
    <div>
      <h1>Tempo Example</h1>
      <hr />
      {account.isConnected ? (
        <>
          <h2>Account</h2>
          <Account />
        </>
      ) : (
        <>
          <h2>Connect</h2>
          <Connect />
        </>
      )}
    </div>
  )
}

export function Connect() {
  const connect = useConnect()
  const [connector] = useConnectors()

  if (connect.isPending) return <div>Check prompt...</div>
  return (
    <div>
      <button
        onClick={() =>
          connect.connect({ connector, capabilities: { createAccount: true } })
        }
        type="button"
      >
        Sign up
      </button>

      <button onClick={() => connect.connect({ connector })} type="button">
        Sign in
      </button>
    </div>
  )
}

export function Account() {
  const account = useAccount()
  const disconnect = useDisconnect()

  return (
    <div>
      <div>
        {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
      </div>
      <button onClick={() => disconnect.disconnect()} type="button">
        Sign out
      </button>
    </div>
  )
}

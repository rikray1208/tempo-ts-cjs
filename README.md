# Tempo TS

> [!NOTE]
> This is a temporary package for TypeScript tooling for Tempo.
> It will be merged into [Wevm](https://github.com/wevm) repositories soon.

## Install

```sh
pnpm i tempo@github:tempoxyz/tempo-ts#main
```

## Entrypoints

| Entrypoint | Description |
| ---------- | ----------- |
| `tempo/ox` | Tempo primitives for Ox. |
| `tempo/viem` | Tempo extension for Viem. |
| `tempo/prool` | Tempo instance for pooled HTTP/WS tests. |

## Usage

### `tempo/ox`

```ts
import { Value } from 'ox'
import { TransactionEnvelopeFeeToken } from 'tempo/ox'

const envelope = TransactionEnvelopeFeeToken.from({
  chainId: 1,
  feeToken: '0x20c0000000000000000000000000000000000000',
  maxFeePerGas: Value.fromGwei('10'),
  maxPriorityFeePerGas: Value.fromGwei('1'),
  to: '0x0000000000000000000000000000000000000000',
  value: Value.fromEther('1'),
})
```
import { type Account, type Address, type Chain, type Client, type ExtractAbiItem, type GetEventArgs, type Hex, type Log, type ReadContractReturnType, type TransactionReceipt, type Transport, type Log as viem_Log, type WatchContractEventParameters, type WriteContractReturnType } from 'viem';
import { writeContract, writeContractSync } from 'viem/actions';
import type { Compute, UnionOmit } from "../../internal/types.js";
import * as TokenId from "../../ox/TokenId.js";
import { feeAmmAbi } from "../abis.js";
import type { ReadParameters, WriteParameters } from "../types.js";
/**
 * Gets the pool ID for a token pair.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const poolId = await actions.amm.getPoolId(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The pool ID.
 */
export declare function getPoolId<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getPoolId.Parameters): Promise<getPoolId.ReturnValue>;
export declare namespace getPoolId {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Address or ID of the user token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = ReadContractReturnType<typeof feeAmmAbi, 'getPoolId', never>;
    /**
     * Defines a call to the `getPoolId` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "getPoolId";
            readonly inputs: readonly [{
                readonly name: "userToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "validatorToken";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "pure";
        }];
        functionName: "getPoolId";
        args?: readonly [`0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
}
/**
 * Gets the reserves for a liquidity pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const pool = await actions.amm.getPool(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The pool reserves.
 */
export declare function getPool<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getPool.Parameters): Promise<getPool.ReturnValue>;
export declare namespace getPool {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Address or ID of the user token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = Compute<{
        /** Reserve of user token. */
        reserveUserToken: bigint;
        /** Reserve of validator token. */
        reserveValidatorToken: bigint;
    }>;
    /**
     * Defines a call to the `getPool` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "getPool";
            readonly inputs: readonly [{
                readonly name: "userToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "validatorToken";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly internalType: "struct FeeAMM.Pool";
                readonly components: readonly [{
                    readonly name: "reserveUserToken";
                    readonly type: "uint128";
                    readonly internalType: "uint128";
                }, {
                    readonly name: "reserveValidatorToken";
                    readonly type: "uint128";
                    readonly internalType: "uint128";
                }];
            }];
            readonly stateMutability: "view";
        }];
        functionName: "getPool";
        args?: readonly [`0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
}
/**
 * Gets the total supply of LP tokens for a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const poolId = await actions.amm.getPoolId(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 *
 * const totalSupply = await actions.amm.getTotalSupply(client, { poolId })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The total supply of LP tokens.
 */
export declare function getTotalSupply<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getTotalSupply.Parameters): Promise<getTotalSupply.ReturnValue>;
export declare namespace getTotalSupply {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Pool ID. */
        poolId: Hex;
    };
    type ReturnValue = ReadContractReturnType<typeof feeAmmAbi, 'totalSupply', never>;
    /**
     * Defines a call to the `totalSupply` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "totalSupply";
            readonly inputs: readonly [{
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly stateMutability: "view";
        }];
        functionName: "totalSupply";
        args?: readonly [`0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
}
/**
 * Gets the LP token balance for an account in a specific pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const poolId = await actions.amm.getPoolId(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 *
 * const balance = await actions.amm.getLiquidityBalance(client, {
 *   poolId,
 *   address: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The LP token balance.
 */
export declare function getLiquidityBalance<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getLiquidityBalance.Parameters): Promise<getLiquidityBalance.ReturnValue>;
export declare namespace getLiquidityBalance {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Address to check balance for. */
        address: Address;
        /** Pool ID. */
        poolId: Hex;
    };
    type ReturnValue = ReadContractReturnType<typeof feeAmmAbi, 'liquidityBalances', never>;
    /**
     * Defines a call to the `liquidityBalances` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "liquidityBalances";
            readonly inputs: readonly [{
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly stateMutability: "view";
        }];
        functionName: "liquidityBalances";
        args?: readonly [`0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
}
/**
 * Performs a rebalance swap from validator token to user token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await actions.amm.rebalanceSwap(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 *   amountOut: 100n,
 *   to: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function rebalanceSwap<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: rebalanceSwap.Parameters<chain, account>): Promise<rebalanceSwap.ReturnValue>;
export declare namespace rebalanceSwap {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of user token to receive. */
        amountOut: bigint;
        /** Address to send the user token to. */
        to: Address;
        /** Address or ID of the user token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: rebalanceSwap.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `rebalanceSwap` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'tempo/chains'
     * import * as actions from 'tempo/viem/actions'
     *
     * const client = createClient({
     *   chain: tempo,
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.amm.rebalanceSwap.call({
     *       userToken: '0x20c0...beef',
     *       validatorToken: '0x20c0...babe',
     *       amountOut: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *     actions.amm.rebalanceSwap.call({
     *       userToken: '0x20c0...babe',
     *       validatorToken: '0x20c0...babe',
     *       amountOut: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "rebalanceSwap";
            readonly inputs: readonly [{
                readonly name: "userToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "validatorToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amountOut";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "amountIn";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "rebalanceSwap";
        args?: readonly [`0x${string}`, `0x${string}`, bigint, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`, bigint, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
    /**
     * Extracts the `RebalanceSwap` event from logs.
     *
     * @param logs - The logs.
     * @returns The `RebalanceSwap` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "M";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "MIN_LIQUIDITY";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "N";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "SCALE";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "burn";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "getPool";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly internalType: "struct FeeAMM.Pool";
            readonly components: readonly [{
                readonly name: "reserveUserToken";
                readonly type: "uint128";
                readonly internalType: "uint128";
            }, {
                readonly name: "reserveValidatorToken";
                readonly type: "uint128";
                readonly internalType: "uint128";
            }];
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getPoolId";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "pure";
    }, {
        readonly type: "function";
        readonly name: "liquidityBalances";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "mint";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "pools";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly name: "reserveUserToken";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "reserveValidatorToken";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "rebalanceSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "totalSupply";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "event";
        readonly name: "Burn";
        readonly inputs: readonly [{
            readonly name: "sender";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly indexed: false;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "FeeSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Mint";
        readonly inputs: readonly [{
            readonly name: "sender";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "RebalanceSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "swapper";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }], "RebalanceSwap">;
}
/**
 * Performs a rebalance swap from validator token to user token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const result = await actions.amm.rebalanceSwapSync(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 *   amountOut: 100n,
 *   to: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function rebalanceSwapSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: rebalanceSwapSync.Parameters<chain, account>): Promise<rebalanceSwapSync.ReturnValue>;
export declare namespace rebalanceSwapSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = rebalanceSwap.Parameters<chain, account>;
    type Args = rebalanceSwap.Args;
    type ReturnValue = Compute<GetEventArgs<typeof feeAmmAbi, 'RebalanceSwap', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
}
/**
 * Adds liquidity to a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await actions.amm.mint(client, {
 *   userToken: {
 *     address: '0x20c0...beef',
 *     amount: 100n,
 *   },
 *   validatorToken: {
 *     address: '0x20c0...babe',
 *     amount: 100n,
 *   },
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function mint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: mint.Parameters<chain, account>): Promise<mint.ReturnValue>;
export declare namespace mint {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address to mint LP tokens to. */
        to: Address;
        /** User token address and amount. */
        userToken: {
            /** Address or ID of the user token. */
            address: TokenId.TokenIdOrAddress;
            /** Amount of user token to add. */
            amount: bigint;
        };
        /** Validator token address and amount. */
        validatorToken: {
            /** Address or ID of the validator token. */
            address: TokenId.TokenIdOrAddress;
            /** Amount of validator token to add. */
            amount: bigint;
        };
    };
    type ReturnValue = WriteContractReturnType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: mint.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `mint` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'tempo/chains'
     * import * as actions from 'tempo/viem/actions'
     *
     * const client = createClient({
     *   chain: tempo,
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.amm.mint.call({
     *       userToken: {
     *         address: '0x20c0...beef',
     *         amount: 100n,
     *       },
     *       validatorToken: {
     *         address: '0x20c0...babe',
     *         amount: 100n,
     *       },
     *       to: '0xfeed...fede',
     *     }),
     *     actions.amm.mint.call({
     *       userToken: {
     *         address: '0x20c0...babe',
     *         amount: 100n,
     *       },
     *       validatorToken: {
     *         address: '0x20c0...babe',
     *         amount: 100n,
     *       },
     *       to: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "mint";
            readonly inputs: readonly [{
                readonly name: "userToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "validatorToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amountUserToken";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "amountValidatorToken";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "liquidity";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "mint";
        args?: readonly [`0x${string}`, `0x${string}`, bigint, bigint, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`, bigint, bigint, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
    /**
     * Extracts the `Mint` event from logs.
     *
     * @param logs - The logs.
     * @returns The `Mint` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "M";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "MIN_LIQUIDITY";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "N";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "SCALE";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "burn";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "getPool";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly internalType: "struct FeeAMM.Pool";
            readonly components: readonly [{
                readonly name: "reserveUserToken";
                readonly type: "uint128";
                readonly internalType: "uint128";
            }, {
                readonly name: "reserveValidatorToken";
                readonly type: "uint128";
                readonly internalType: "uint128";
            }];
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getPoolId";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "pure";
    }, {
        readonly type: "function";
        readonly name: "liquidityBalances";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "mint";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "pools";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly name: "reserveUserToken";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "reserveValidatorToken";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "rebalanceSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "totalSupply";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "event";
        readonly name: "Burn";
        readonly inputs: readonly [{
            readonly name: "sender";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly indexed: false;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "FeeSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Mint";
        readonly inputs: readonly [{
            readonly name: "sender";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "RebalanceSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "swapper";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }], "Mint">;
}
/**
 * Adds liquidity to a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await actions.amm.mint(client, {
 *   userToken: {
 *     address: '0x20c0...beef',
 *     amount: 100n,
 *   },
 *   validatorToken: {
 *     address: '0x20c0...babe',
 *     amount: 100n,
 *   },
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function mintSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: mintSync.Parameters<chain, account>): Promise<mintSync.ReturnValue>;
export declare namespace mintSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = mint.Parameters<chain, account>;
    type Args = mint.Args;
    type ReturnValue = Compute<GetEventArgs<typeof feeAmmAbi, 'Mint', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
}
/**
 * Removes liquidity from a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await actions.amm.burn(client, {
 *   userToken: '0x20c0...beef',
 *   validatorToken: '0x20c0...babe',
 *   liquidity: 50n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function burn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burn.Parameters<chain, account>): Promise<burn.ReturnValue>;
export declare namespace burn {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of LP tokens to burn. */
        liquidity: bigint;
        /** Address to send tokens to. */
        to: Address;
        /** Address or ID of the user token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: burn.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `burn` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'tempo/chains'
     * import * as actions from 'tempo/viem/actions'
     *
     * const client = createClient({
     *   chain: tempo,
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.amm.burn.call({
     *       liquidity: 100n,
     *       to: '0xfeed...fede',
     *       userToken: '0x20c0...beef',
     *       validatorToken: '0x20c0...babe',
     *     }),
     *     actions.amm.burn.call({
     *       liquidity: 100n,
     *       to: '0xfeed...fede',
     *       userToken: '0x20c0...babe',
     *       validatorToken: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "burn";
            readonly inputs: readonly [{
                readonly name: "userToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "validatorToken";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "liquidity";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "amountUserToken";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "amountValidatorToken";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "burn";
        args?: readonly [`0x${string}`, `0x${string}`, bigint, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`, bigint, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
    /**
     * Extracts the `Burn` event from logs.
     *
     * @param logs - The logs.
     * @returns The `Burn` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "M";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "MIN_LIQUIDITY";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "N";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "SCALE";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "burn";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "getPool";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly internalType: "struct FeeAMM.Pool";
            readonly components: readonly [{
                readonly name: "reserveUserToken";
                readonly type: "uint128";
                readonly internalType: "uint128";
            }, {
                readonly name: "reserveValidatorToken";
                readonly type: "uint128";
                readonly internalType: "uint128";
            }];
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getPoolId";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "pure";
    }, {
        readonly type: "function";
        readonly name: "liquidityBalances";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "mint";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "pools";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly name: "reserveUserToken";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "reserveValidatorToken";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "rebalanceSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "totalSupply";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "event";
        readonly name: "Burn";
        readonly inputs: readonly [{
            readonly name: "sender";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly indexed: false;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "FeeSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Mint";
        readonly inputs: readonly [{
            readonly name: "sender";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountUserToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountValidatorToken";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidity";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "RebalanceSwap";
        readonly inputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "swapper";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amountIn";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "amountOut";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }], "Burn">;
}
/**
 * Removes liquidity from a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const result = await actions.amm.burnSync(client, {
 *   userToken: '0x20c0...beef',
 *   validatorToken: '0x20c0...babe',
 *   liquidity: 50n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function burnSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burnSync.Parameters<chain, account>): Promise<burnSync.ReturnValue>;
export declare namespace burnSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = burn.Parameters<chain, account>;
    type Args = burn.Args;
    type ReturnValue = Compute<GetEventArgs<typeof feeAmmAbi, 'Burn', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
}
/**
 * Watches for rebalance swap events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.amm.watchRebalanceSwap(client, {
 *   onRebalanceSwap: (args, log) => {
 *     console.log('Rebalance swap:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchRebalanceSwap<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchRebalanceSwap.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchRebalanceSwap {
    type Args = GetEventArgs<typeof feeAmmAbi, 'RebalanceSwap', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof feeAmmAbi, 'RebalanceSwap'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof feeAmmAbi, 'RebalanceSwap', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a rebalance swap occurs. */
        onRebalanceSwap: (args: Args, log: Log) => void;
        /** Address or ID of the user token to filter events. */
        userToken?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the validator token to filter events. */
        validatorToken?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for fee swap events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.amm.watchFeeSwap(client, {
 *   onFeeSwap: (args, log) => {
 *     console.log('Fee swap:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchFeeSwap<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchFeeSwap.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchFeeSwap {
    type Args = GetEventArgs<typeof feeAmmAbi, 'FeeSwap', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof feeAmmAbi, 'FeeSwap'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof feeAmmAbi, 'FeeSwap', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a fee swap occurs. */
        onFeeSwap: (args: Args, log: Log) => void;
        /** Address or ID of the user token to filter events. */
        userToken?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the validator token to filter events. */
        validatorToken?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for liquidity mint events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.amm.watchMint(client, {
 *   onMint: (args, log) => {
 *     console.log('Liquidity added:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchMint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchMint.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchMint {
    type Args = {
        liquidity: bigint;
        sender: Address;
        userToken: {
            address: Address;
            amount: bigint;
        };
        validatorToken: {
            address: Address;
            amount: bigint;
        };
    };
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof feeAmmAbi, 'Mint'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof feeAmmAbi, 'Mint', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when liquidity is added. */
        onMint: (args: Args, log: Log) => void;
        /** Address or ID of the sender to filter events. */
        sender?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the user token to filter events. */
        userToken?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the validator token to filter events. */
        validatorToken?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for liquidity burn events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.amm.watchBurn(client, {
 *   onBurn: (args, log) => {
 *     console.log('Liquidity removed:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchBurn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchBurn.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchBurn {
    type Args = GetEventArgs<typeof feeAmmAbi, 'Burn', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof feeAmmAbi, 'Burn'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof feeAmmAbi, 'Burn', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when liquidity is removed. */
        onBurn: (args: Args, log: Log) => void;
        /** Address or ID of the user token to filter events. */
        userToken?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the validator token to filter events. */
        validatorToken?: TokenId.TokenIdOrAddress | undefined;
    };
}
//# sourceMappingURL=amm.d.ts.map
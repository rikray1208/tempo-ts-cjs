import { type Account, type Address, type Chain, type Client, type ExtractAbiItem, type GetEventArgs, type Log, type TransactionReceipt, type Transport, type Log as viem_Log, type WatchContractEventParameters, type WriteContractReturnType } from 'viem';
import { writeContract, writeContractSync } from 'viem/actions';
import type { Compute, UnionOmit } from "../../internal/types.js";
import * as TokenId from "../../ox/TokenId.js";
import { feeManagerAbi } from "../abis.js";
import type { GetAccountParameter, ReadParameters, WriteParameters } from "../types.js";
/**
 * Gets the user's default fee token.
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
 * const { address, id } = await actions.fee.getUserToken(client)
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function getUserToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, ...parameters: account extends Account ? [getUserToken.Parameters<account>] | [] : [getUserToken.Parameters<account>]): Promise<getUserToken.ReturnValue>;
export declare namespace getUserToken {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & GetAccountParameter<account>;
    type Args = {
        /** Account address. */
        account: Address;
    };
    type ReturnValue = Compute<{
        address: Address;
        id: bigint;
    }>;
    /**
     * Defines a call to the `userTokens` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "userTokens";
            readonly inputs: readonly [{
                readonly name: "";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly stateMutability: "view";
        }];
        functionName: "userTokens";
        args?: readonly [`0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Sets the user's default fee token.
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
 * const hash = await actions.fee.setUserToken(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setUserToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setUserToken.Parameters<chain, account>): Promise<setUserToken.ReturnValue>;
export declare namespace setUserToken {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: setUserToken.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `setUserToken` function.
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
     *     actions.fee.setUserToken.call({
     *       token: '0x20c0...beef',
     *     }),
     *     actions.fee.setUserToken.call({
     *       token: '0x20c0...babe',
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
            readonly name: "setUserToken";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "setUserToken";
        args?: readonly [`0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
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
        readonly name: "collectFeePostTx";
        readonly inputs: readonly [{
            readonly name: "user";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "maxAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "actualUsed";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validatorToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "collectFeePreTx";
        readonly inputs: readonly [{
            readonly name: "user";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "txToAddress";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "maxAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly outputs: readonly [{
            readonly name: "userToken";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "executeBlock";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
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
        readonly name: "setUserToken";
        readonly inputs: readonly [{
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "setValidatorToken";
        readonly inputs: readonly [{
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
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
        readonly type: "function";
        readonly name: "userTokens";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "validatorTokens";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
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
    }, {
        readonly type: "event";
        readonly name: "UserTokenSet";
        readonly inputs: readonly [{
            readonly name: "user";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "ValidatorTokenSet";
        readonly inputs: readonly [{
            readonly name: "validator";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }], "UserTokenSet">;
}
/**
 * Sets the user's default fee token.
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
 * const result = await actions.fee.setUserTokenSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function setUserTokenSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setUserTokenSync.Parameters<chain, account>): Promise<setUserTokenSync.ReturnValue>;
export declare namespace setUserTokenSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = setUserToken.Parameters<chain, account>;
    type Args = setUserToken.Args;
    type ReturnValue = Compute<GetEventArgs<typeof feeManagerAbi, 'UserTokenSet', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
}
/**
 * Watches for user token set events.
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
 * const unwatch = actions.fee.watchSetUserToken(client, {
 *   onUserTokenSet: (args, log) => {
 *     console.log('User token set:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchSetUserToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchSetUserToken.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchSetUserToken {
    type Args = GetEventArgs<typeof feeManagerAbi, 'UserTokenSet', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof feeManagerAbi, 'UserTokenSet'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof feeManagerAbi, 'UserTokenSet', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a user token is set. */
        onUserTokenSet: (args: Args, log: Log) => void;
    };
}
//# sourceMappingURL=fee.d.ts.map
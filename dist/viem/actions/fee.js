import { parseEventLogs, } from 'viem';
import { parseAccount } from 'viem/accounts';
import { readContract, watchContractEvent, writeContract, writeContractSync, } from 'viem/actions';
import * as TokenId from "../../ox/TokenId.js";
import { feeManagerAbi } from "../abis.js";
import { feeManagerAddress } from "../addresses.js";
import { defineCall } from "../utils.js";
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
export async function getUserToken(client, ...parameters) {
    const { account: account_ = client.account, ...rest } = parameters[0] ?? {};
    if (!account_)
        throw new Error('account is required.');
    const account = parseAccount(account_);
    const address = await readContract(client, {
        ...rest,
        ...getUserToken.call({ account: account.address }),
    });
    return {
        address,
        id: TokenId.fromAddress(address),
    };
}
(function (getUserToken) {
    /**
     * Defines a call to the `userTokens` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeManagerAbi,
            args: [account],
            functionName: 'userTokens',
        });
    }
    getUserToken.call = call;
})(getUserToken || (getUserToken = {}));
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
export async function setUserToken(client, parameters) {
    return setUserToken.inner(writeContract, client, parameters);
}
(function (setUserToken) {
    /** @internal */
    async function inner(action, client, parameters) {
        const call = setUserToken.call(parameters);
        return (await action(client, {
            ...parameters,
            ...call,
        }));
    }
    setUserToken.inner = inner;
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
    function call(args) {
        const { token } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeManagerAbi,
            functionName: 'setUserToken',
            args: [TokenId.toAddress(token)],
        });
    }
    setUserToken.call = call;
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: feeManagerAbi,
            logs,
            eventName: 'UserTokenSet',
            strict: true,
        });
        if (!log)
            throw new Error('`UserTokenSet` event not found.');
        return log;
    }
    setUserToken.extractEvent = extractEvent;
})(setUserToken || (setUserToken = {}));
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
export async function setUserTokenSync(client, parameters) {
    const receipt = await setUserToken.inner(writeContractSync, client, parameters);
    const { args } = setUserToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export function watchSetUserToken(client, parameters) {
    const { onUserTokenSet, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: feeManagerAddress,
        abi: feeManagerAbi,
        eventName: 'UserTokenSet',
        onLogs: (logs) => {
            for (const log of logs)
                onUserTokenSet(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=fee.js.map
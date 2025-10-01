// TODO:
// - add `.call` to namespaces
// - add `.simulate` to namespaces
// - add `.estimateGas` to namespaces
import { parseAccount } from 'viem/accounts';
import { readContract, watchContractEvent, writeContract } from 'viem/actions';
import * as TokenId from "../../ox/TokenId.js";
import { feeManagerAbi } from "../abis.js";
import { feeManagerAddress } from "../addresses.js";
/**
 * Gets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import { tokenActions } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const { address, id } = await tokenActions.getUserToken(client)
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
        address: feeManagerAddress,
        abi: feeManagerAbi,
        functionName: 'userTokens',
        args: [account.address],
    });
    return {
        address,
        id: TokenId.fromAddress(address),
    };
}
/**
 * Sets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import { tokenActions } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await tokenActions.setUserToken(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setUserToken(client, parameters) {
    const { account = client.account, chain = client.chain, token, ...rest } = parameters;
    return writeContract(client, {
        ...rest,
        account,
        address: feeManagerAddress,
        abi: feeManagerAbi,
        chain,
        functionName: 'setUserToken',
        args: [TokenId.toAddress(token)],
    });
}
/**
 * Watches for user token set events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import { tokenActions } from 'tempo/viem'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = tokenActions.watchSetUserToken(client, {
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
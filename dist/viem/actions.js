// TODO:
// - add `.call` to namespaces
// - add `.simulate` to namespaces
// - add `.estimateGas` to namespaces
// - add "watch" actions for events
import * as Hex from 'ox/Hex';
import * as Signature from 'ox/Signature';
import { parseAccount } from 'viem/accounts';
import { multicall, readContract, simulateContract, watchContractEvent, writeContract, } from 'viem/actions';
import * as TokenId from "../ox/TokenId.js";
import * as TokenRole from "../ox/TokenRole.js";
import { feeManagerAbi, tip20Abi, tip20FactoryAbi } from "./abis.js";
import { feeManagerAddress, tip20FactoryAddress, usdAddress, } from "./addresses.js";
const transferPolicy = {
    0: 'always-reject',
    1: 'always-allow',
};
/**
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.approveToken({
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function approveToken(client, parameters) {
    const { account = client.account, amount, chain = client.chain, spender, token = usdAddress, ...rest } = parameters;
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'approve',
        args: [spender, amount],
    });
}
/**
 * Burns TIP20 tokens from a blocked address.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.burnBlockedToken({
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function burnBlockedToken(client, parameters) {
    const { account = client.account, amount, chain = client.chain, from, token, ...rest } = parameters;
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'burnBlocked',
        args: [from, amount],
    });
}
/**
 * Burns TIP20 tokens from the caller's balance.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.burnToken({
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function burnToken(client, parameters) {
    const { account = client.account, amount, chain = client.chain, memo, token, ...rest } = parameters;
    const args = memo
        ? {
            functionName: 'burnWithMemo',
            args: [amount, Hex.padLeft(memo, 32)],
        }
        : {
            functionName: 'burn',
            args: [amount],
        };
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        ...args,
    });
}
/**
 * Changes the transfer policy ID for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.changeTokenTransferPolicy({
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function changeTokenTransferPolicy(client, parameters) {
    const { account = client.account, chain = client.chain, token, policyId, ...rest } = parameters;
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'changeTransferPolicyId',
        args: [policyId],
    });
}
/**
 * Creates a new TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const { hash, id, address } = await client.createToken({
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function createToken(client, parameters) {
    const { account = client.account, admin: admin_ = client.account, chain = client.chain, name, symbol, currency, ...rest } = parameters;
    const admin = admin_ ? parseAccount(admin_) : undefined;
    if (!admin)
        throw new Error('admin is required.');
    const { request, result } = await simulateContract(client, {
        ...rest,
        account,
        address: tip20FactoryAddress,
        abi: tip20FactoryAbi,
        chain,
        functionName: 'createToken',
        args: [name, symbol, currency, admin.address],
    });
    const hash = await writeContract(client, request);
    const id = Hex.toBigInt(result);
    const address = TokenId.toAddress(id);
    return {
        address,
        admin: admin.address,
        hash,
        id,
    };
}
/**
 * Gets TIP20 token allowance.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const allowance = await client.getTokenAllowance({
 *   spender: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token allowance.
 */
export async function getTokenAllowance(client, parameters) {
    const { account = client.account, token = usdAddress, spender, ...rest } = parameters;
    const address = account ? parseAccount(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        functionName: 'allowance',
        args: [address, spender],
    });
}
/**
 * Gets TIP20 token balance for an address.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const balance = await client.getTokenBalance()
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token balance.
 */
export async function getTokenBalance(client, ...parameters) {
    const { account = client.account, token = usdAddress, ...rest } = parameters[0] ?? {};
    const address = account ? parseAccount(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        functionName: 'balanceOf',
        args: [address],
    });
}
/**
 * Gets TIP20 token metadata including name, symbol, currency, decimals, and total supply.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const metadata = await client.getTokenMetadata({
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token metadata.
 */
export async function getTokenMetadata(client, parameters = {}) {
    const { token = usdAddress, ...rest } = parameters;
    const address = TokenId.toAddress(token);
    const abi = tip20Abi;
    return multicall(client, {
        ...rest,
        contracts: [
            {
                address,
                abi,
                functionName: 'currency',
            },
            {
                address,
                abi,
                functionName: 'decimals',
            },
            {
                address,
                abi,
                functionName: 'name',
            },
            {
                address,
                abi,
                functionName: 'paused',
            },
            {
                address,
                abi,
                functionName: 'supplyCap',
            },
            {
                address,
                abi,
                functionName: 'symbol',
            },
            {
                address,
                abi,
                functionName: 'totalSupply',
            },
            {
                address,
                abi,
                functionName: 'transferPolicyId',
            },
        ],
        allowFailure: false,
        deployless: true,
    }).then(([currency, decimals, name, paused, supplyCap, symbol, totalSupply, transferPolicyId,]) => ({
        name,
        symbol,
        currency,
        decimals,
        totalSupply,
        paused,
        supplyCap,
        transferPolicy: transferPolicy[Number(transferPolicyId)],
    }));
}
/**
 * Gets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const { address, id } = await client.getUserToken()
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
 * Grants a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.grantTokenRoles({
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['minter'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function grantTokenRoles(client, parameters) {
    const { account = client.account, chain = client.chain, token, to, ...rest } = parameters;
    if (parameters.roles.length > 1)
        throw new Error('granting multiple roles is not supported yet.');
    const [role] = parameters.roles.map((role) => TokenRole.serialize(role));
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'grantRole',
        args: [role, to],
    });
}
/**
 * Mints TIP20 tokens to an address.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.mintToken({
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function mintToken(client, parameters) {
    const { account = client.account, amount, chain = client.chain, memo, token, to, ...rest } = parameters;
    const args = memo
        ? {
            functionName: 'mintWithMemo',
            args: [to, amount, Hex.padLeft(memo, 32)],
        }
        : {
            functionName: 'mint',
            args: [to, amount],
        };
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        // TODO: fix
        gas: 30000n,
        ...args,
    });
}
/**
 * Pauses a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.pauseToken({
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function pauseToken(client, parameters) {
    const { account = client.account, chain = client.chain, token, ...rest } = parameters;
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'pause',
        args: [],
    });
}
/**
 * Approves a spender using a signed permit.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.permitToken({
 *   owner: '0x...',
 *   spender: '0x...',
 *   value: 100n,
 *   deadline: 1234567890n,
 *   signature: { r: 0n, s: 0n, yParity: 0 },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function permitToken(client, parameters) {
    const { account = client.account, chain = client.chain, token = usdAddress, owner, spender, value, deadline, signature, ...rest } = parameters;
    const { r, s, yParity } = Signature.from(signature);
    const v = Signature.yParityToV(yParity);
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'permit',
        args: [
            owner,
            spender,
            value,
            deadline,
            v,
            Hex.trimLeft(Hex.fromNumber(r)),
            Hex.trimLeft(Hex.fromNumber(s)),
        ],
    });
}
/**
 * Renounces a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.renounceTokenRoles({
 *   token: '0x...',
 *   roles: ['minter'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function renounceTokenRoles(client, parameters) {
    const { account = client.account, chain = client.chain, token, ...rest } = parameters;
    if (parameters.roles.length > 1)
        throw new Error('renouncing multiple roles is not supported yet.');
    const [role] = parameters.roles.map(TokenRole.serialize);
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'renounceRole',
        args: [role],
    });
}
/**
 * Revokes a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.revokeTokenRoles({
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['minter'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function revokeTokenRoles(client, parameters) {
    const { account = client.account, chain = client.chain, token, from, ...rest } = parameters;
    if (parameters.roles.length > 1)
        throw new Error('revoking multiple roles is not supported yet.');
    const [role] = parameters.roles.map(TokenRole.serialize);
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'revokeRole',
        args: [role, from],
    });
}
/**
 * Sets the supply cap for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.setTokenSupplyCap({
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setTokenSupplyCap(client, parameters) {
    const { account = client.account, chain = client.chain, token, supplyCap, ...rest } = parameters;
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'setSupplyCap',
        args: [supplyCap],
    });
}
/**
 * Sets the admin role for a specific role in a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.setTokenRoleAdmin({
 *   token: '0x...',
 *   role: 'minter',
 *   adminRole: 'admin',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setTokenRoleAdmin(client, parameters) {
    const { account = client.account, adminRole, chain = client.chain, token, role, ...rest } = parameters;
    const roleHash = TokenRole.serialize(role);
    const adminRoleHash = TokenRole.serialize(adminRole);
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'setRoleAdmin',
        args: [roleHash, adminRoleHash],
    });
}
/**
 * Sets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.setUserToken({
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
 * Transfers TIP20 tokens to another address.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.transferToken({
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function transferToken(client, parameters) {
    const { account = client.account, amount, chain = client.chain, from, memo, token = usdAddress, to, ...rest } = parameters;
    const args = (() => {
        if (memo && from)
            return {
                functionName: 'transferFromWithMemo',
                args: [from, to, amount, Hex.padLeft(memo, 32)],
            };
        if (memo)
            return {
                functionName: 'transferWithMemo',
                args: [to, amount, Hex.padLeft(memo, 32)],
            };
        if (from)
            return {
                functionName: 'transferFrom',
                args: [from, to, amount],
            };
        return {
            functionName: 'transfer',
            args: [to, amount],
        };
    })();
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        ...args,
    });
}
/**
 * Unpauses a TIP20 token.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createTempoClient({
 *   account: privateKeyToAccount('0x...')
 * })
 *
 * const hash = await client.unpauseToken({
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function unpauseToken(client, parameters) {
    const { account = client.account, chain = client.chain, token, ...rest } = parameters;
    return writeContract(client, {
        ...rest,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'unpause',
        args: [],
    });
}
/**
 * Watches for TIP20 token approval events.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchApproveToken({
 *   onApproval: (args, log) => {
 *     console.log('Approval:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchApproveToken(client, parameters) {
    const { onApproval, token = usdAddress, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        eventName: 'Approval',
        onLogs: (logs) => {
            for (const log of logs)
                onApproval(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token burn events.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchBurnToken({
 *   onBurn: (args, log) => {
 *     console.log('Burn:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchBurnToken(client, parameters) {
    const { onBurn, token = usdAddress, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        eventName: 'Burn',
        onLogs: (logs) => {
            for (const log of logs)
                onBurn(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for new TIP20 tokens created.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchCreateToken({
 *   onTokenCreated: (args, log) => {
 *     console.log('Token created:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchCreateToken(client, parameters) {
    const { onTokenCreated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: tip20FactoryAddress,
        abi: tip20FactoryAbi,
        eventName: 'TokenCreated',
        onLogs: (logs) => {
            for (const log of logs)
                onTokenCreated(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token mint events.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchMintToken({
 *   onMint: (args, log) => {
 *     console.log('Mint:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchMintToken(client, parameters) {
    const { onMint, token = usdAddress, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        eventName: 'Mint',
        onLogs: (logs) => {
            for (const log of logs)
                onMint(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for user token set events.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchSetUserToken({
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
/**
 * Watches for TIP20 token role admin updates.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchTokenAdminRole({
 *   onRoleAdminUpdated: (args, log) => {
 *     console.log('Role admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchTokenAdminRole(client, parameters) {
    const { onRoleAdminUpdated, token = usdAddress, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        eventName: 'RoleAdminUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onRoleAdminUpdated(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token role membership updates.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchTokenRole({
 *   onRoleUpdated: (args, log) => {
 *     console.log('Role updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchTokenRole(client, parameters) {
    const { onRoleUpdated, token = usdAddress, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        eventName: 'RoleMembershipUpdated',
        onLogs: (logs) => {
            for (const log of logs) {
                const type = log.args.hasRole ? 'granted' : 'revoked';
                onRoleUpdated({ ...log.args, type }, log);
            }
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token transfer events.
 *
 * @example
 * ```ts
 * import { createTempoClient } from 'tempo/viem'
 *
 * const client = createTempoClient()
 *
 * const unwatch = client.watchTransferToken({
 *   onTransfer: (args, log) => {
 *     console.log('Transfer:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchTransferToken(client, parameters) {
    const { onTransfer, token = usdAddress, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        eventName: 'Transfer',
        onLogs: (logs) => {
            for (const log of logs)
                onTransfer(log.args, log);
        },
        strict: true,
    });
}
export function decorator() {
    return (client) => {
        return {
            approveToken: (parameters) => approveToken(client, parameters),
            burnBlockedToken: (parameters) => burnBlockedToken(client, parameters),
            burnToken: (parameters) => burnToken(client, parameters),
            changeTokenTransferPolicy: (parameters) => changeTokenTransferPolicy(client, parameters),
            createToken: (parameters) => createToken(client, parameters),
            getTokenAllowance: (parameters) => getTokenAllowance(client, parameters),
            // @ts-expect-error
            getTokenBalance: (parameters) => getTokenBalance(client, parameters),
            getTokenMetadata: (parameters) => getTokenMetadata(client, parameters),
            // @ts-expect-error
            getUserToken: (parameters) => getUserToken(client, parameters),
            grantTokenRoles: (parameters) => grantTokenRoles(client, parameters),
            mintToken: (parameters) => mintToken(client, parameters),
            pauseToken: (parameters) => pauseToken(client, parameters),
            permitToken: (parameters) => permitToken(client, parameters),
            renounceTokenRoles: (parameters) => renounceTokenRoles(client, parameters),
            revokeTokenRoles: (parameters) => revokeTokenRoles(client, parameters),
            setTokenSupplyCap: (parameters) => setTokenSupplyCap(client, parameters),
            setTokenRoleAdmin: (parameters) => setTokenRoleAdmin(client, parameters),
            setUserToken: (parameters) => setUserToken(client, parameters),
            transferToken: (parameters) => transferToken(client, parameters),
            unpauseToken: (parameters) => unpauseToken(client, parameters),
            watchApproveToken: (parameters) => watchApproveToken(client, parameters),
            watchBurnToken: (parameters) => watchBurnToken(client, parameters),
            watchCreateToken: (parameters) => watchCreateToken(client, parameters),
            watchMintToken: (parameters) => watchMintToken(client, parameters),
            watchSetUserToken: (parameters) => watchSetUserToken(client, parameters),
            watchTokenAdminRole: (parameters) => watchTokenAdminRole(client, parameters),
            watchTokenRole: (parameters) => watchTokenRole(client, parameters),
            watchTransferToken: (parameters) => watchTransferToken(client, parameters),
        };
    };
}
//# sourceMappingURL=actions.js.map
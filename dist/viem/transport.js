import { createTransport } from 'viem';
import { parseTransaction } from "./transaction.js";
/**
 * Creates a fee payer transport that routes requests between
 * the default transport or the fee payer transport.
 *
 * @param defaultTransport - The default transport to use.
 * @param feePayerTransport - The fee payer transport to use.
 * @returns A relay transport.
 */
export function withFeePayer(defaultTransport, relayTransport) {
    return (config) => {
        const transport_default = defaultTransport(config);
        const transport_relay = relayTransport(config);
        return createTransport({
            key: withFeePayer.type,
            name: 'Relay Proxy',
            async request({ method, params }, options) {
                if (method === 'eth_sendRawTransactionSync' ||
                    method === 'eth_sendRawTransaction') {
                    const serialized = params[0];
                    const transaction = parseTransaction(serialized);
                    // If the transaction is intended to be sponsored, forward it to the relay.
                    if (transaction.feePayerSignature === null)
                        return transport_relay.request({ method, params }, options);
                }
                return transport_default.request({ method, params }, options);
            },
            type: withFeePayer.type,
        });
    };
}
//# sourceMappingURL=transport.js.map
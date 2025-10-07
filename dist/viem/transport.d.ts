import { type Transport } from 'viem';
export type Relay = Transport<typeof withFeePayer.type>;
/**
 * Creates a fee payer transport that routes requests between
 * the default transport or the fee payer transport.
 *
 * @param defaultTransport - The default transport to use.
 * @param feePayerTransport - The fee payer transport to use.
 * @returns A relay transport.
 */
export declare function withFeePayer(defaultTransport: Transport, relayTransport: Transport): withFeePayer.ReturnValue;
export declare namespace withFeePayer {
    const type = "feePayer";
    type ReturnValue = Relay;
}
//# sourceMappingURL=transport.d.ts.map
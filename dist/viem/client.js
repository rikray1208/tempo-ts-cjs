import { createClient, http, } from 'viem';
import { tempo } from "../chains.js";
import * as actions from "./actions.js";
/**
 * Instantiates a default Tempo client.
 *
 * @example
 * TODO
 *
 * @param parameters - The parameters for the client.
 * @returns A Tempo client.
 */
export function createTempoClient(parameters = {}) {
    const { chain = tempo, transport = http(), ...rest } = parameters;
    return createClient({
        ...rest,
        chain,
        transport,
    }).extend(actions.decorator());
}
//# sourceMappingURL=client.js.map
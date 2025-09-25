import { defineTransaction, defineTransactionRequest, serializeTransaction, } from 'viem';
import * as Transaction from "../ox/Transaction.js";
import * as TxFeeToken from "../ox/TransactionEnvelopeFeeToken.js";
import * as TransactionRequest from "../ox/TransactionRequest.js";
export const config = {
    blockTime: 1_000,
    formatters: {
        transaction: defineTransaction({ format: Transaction.fromRpc }),
        transactionRequest: defineTransactionRequest({
            format: TransactionRequest.toRpc,
        }),
    },
    serializers: {
        transaction(transaction, signature) {
            if (transaction.type === 'feeToken' || transaction.feeToken)
                return TxFeeToken.serialize(transaction, { signature: signature });
            return serializeTransaction(transaction, signature);
        },
    },
};
//# sourceMappingURL=chain.js.map
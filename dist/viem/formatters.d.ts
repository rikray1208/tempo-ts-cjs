import { type Transaction, type TransactionRequest, type TransactionRequestRpc, type TransactionRpc } from "./transaction.js";
export declare const formatTransaction: (transaction: TransactionRpc) => Transaction<bigint, number, boolean>;
export declare const formatTransactionRequest: (r: TransactionRequest, action?: string | undefined) => TransactionRequestRpc;
//# sourceMappingURL=formatters.d.ts.map
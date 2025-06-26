/** 공통 타입 */
import { LedgerRequire } from "./ledger";

export interface FormRequire extends LedgerRequire {
  cardPrice?: number;
  cashPrice?: number;
}

export * from "./api";
export * from "./error";
export * from "./ledger";
export * from "./payment";

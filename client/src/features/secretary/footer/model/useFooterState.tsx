import { totalProfit } from "@/shared/utils";
import { LedgerModel } from "@/shared/types";

const useFooterState = (getData: LedgerModel[], todayUTC: string): number => {
  return totalProfit(getData, todayUTC);
};

export default useFooterState;

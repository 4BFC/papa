import { totalProfit } from "@/shared/utils";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";

const useFooterState = (todayUTC: string): number => {
  const { ledgerData } = useSecretaryContext();
  return totalProfit(ledgerData, todayUTC);
};

export default useFooterState;

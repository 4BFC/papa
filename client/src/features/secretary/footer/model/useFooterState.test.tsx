import { totalProfit } from "@/shared/utils";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";
import useLedgerListState from "@/features/secretary/body/model/useLedgerListState.test";

const useFooterState = (todayUTC: string): number => {
  const { isSelectedDate } = useSecretaryContext();
  // const { ledgerData } = useSecretaryContext();
  const { data } = useLedgerListState({ todayUTC });
  return totalProfit(data, isSelectedDate ? isSelectedDate : todayUTC);
};

export default useFooterState;

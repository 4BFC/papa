import { LedgerModel } from "@/shared/types";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";

const useLedgerListState = ({
  todayUTC,
}: {
  todayUTC: string;
}): { data: LedgerModel[]; isLoading: boolean } => {
  const { ledgerData, isSelectedDate, getLoading } = useSecretaryContext();

  if (!ledgerData || !Array.isArray(ledgerData)) {
    return { data: [], isLoading: getLoading };
  }

  const filteredData = ledgerData.filter((el) =>
    isSelectedDate
      ? String(el.createdAt).split("T")[0] === isSelectedDate
      : String(el.createdAt).split("T")[0] === todayUTC.split("T")[0]
  );

  return { data: filteredData, isLoading: getLoading };
};

export default useLedgerListState;

import DataRowList from "@/features/secretary/body/ui/DataRowList";
import useLedgerListState from "@/features/secretary/body/model/useLedgerListState";
import { LedgerModel, PaymentModel } from "@/shared/types";
import HeaderRow from "../presentational/HeaderRow";

const DataRowListContainer = ({
  data,
  paymentData,
  getLoading,
  isSelectedDate,
  todayUTC,
}: {
  data: LedgerModel[];
  paymentData: PaymentModel[];
  getLoading: boolean;
  isSelectedDate: string;
  todayUTC: string;
}): React.ReactElement => {
  /**해당 훅에서 데이터를 필터링 해준다. */
  const filteredData = useLedgerListState({
    getData: data,
    paymentData,
    isSelectedDate,
    todayUTC,
  });
  /**해당 컴포넌트에서 데이터를 렌더링 해준다. */
  return (
    <DataRowList
      data={filteredData}
      paymentData={paymentData}
      getLoading={getLoading}
    >
      <HeaderRow />
    </DataRowList>
  );
};

export default DataRowListContainer;

import DataRowList from "@/features/secretary/body/ui/DataRowList.test";
import useLedgerListState from "@/features/secretary/body/model/useLedgerListState.test";
// import { LedgerModel, PaymentModel } from "@/shared/types";
import HeaderRow from "../presentational/HeaderRow";

const DataRowListContainer = ({
  todayUTC,
}: {
  todayUTC: string;
}): React.ReactElement => {
  /**해당 훅에서 데이터를 필터링 해준다. */
  const { data } = useLedgerListState({
    todayUTC,
  });
  /**해당 컴포넌트에서 데이터를 렌더링 해준다. */
  return (
    <DataRowList data={data}>
      <HeaderRow />
    </DataRowList>
  );
};

export default DataRowListContainer;

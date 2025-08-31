import useLedgerRowState from "@/features/secretary/body/model/useLedgerRowState.test";
import DataRowItem from "@/features/secretary/body/ui/DataRowItem.test";
import { LedgerModel } from "@/shared/types";

const DataRow = ({ data }: { data: LedgerModel }): React.ReactElement => {
  const { cardPayment, cashPayment, isButtonActive, setButtonActive } =
    useLedgerRowState({ data });
  return (
    <DataRowItem
      data={data}
      cardPayment={cardPayment}
      cashPayment={cashPayment}
      isButtonActive={isButtonActive}
      onToggle={() => setButtonActive((prev) => !prev)}
    />
  );
};

export default DataRow;

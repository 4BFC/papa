import useLedgerRowState from "@/features/secretary/body/model/useLedgerRowState";
import DataRowItem from "@/features/secretary/body/ui/DataRowItem";
import { LedgerModel, PaymentModel } from "@/shared/types";

const DataRow = ({
  data,
  payment,
}: {
  data: LedgerModel;
  payment: PaymentModel[];
}): React.ReactElement => {
  const { cardPayment, cashPayment, isButtonActive, setButtonActive } =
    useLedgerRowState({ data, payment });
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

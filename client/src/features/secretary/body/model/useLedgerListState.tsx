import { LedgerModel, PaymentModel } from "@/shared/types";

const useLedgerListState = ({
  getData,
  paymentData,
  isSelectedDate,
  todayUTC,
}: {
  getData: LedgerModel[];
  paymentData: PaymentModel[];
  isSelectedDate: string;
  todayUTC: string;
}): LedgerModel[] => {
  return (
    getData &&
    paymentData &&
    getData.filter((el) =>
      isSelectedDate
        ? String(el.createdAt).split("T")[0] === isSelectedDate
        : String(el.createdAt).split("T")[0] === todayUTC.split("T")[0]
    )
  );
};

export default useLedgerListState;

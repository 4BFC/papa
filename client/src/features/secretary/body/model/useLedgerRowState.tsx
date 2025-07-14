import { useState } from "react";
import { LedgerModel, PaymentModel } from "@/shared/types";
// import { splitData, formatCurrencyData } from "@/shared/utils";

type UseDataReturn = {
  cardPayment?: PaymentModel;
  cashPayment?: PaymentModel;
  isButtonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLedgerRowState = ({
  data,
  payment,
}: {
  data: LedgerModel;
  payment: PaymentModel[];
}): UseDataReturn => {
  const [isButtonActive, setButtonActive] = useState<boolean>(true);

  const paymentForThisRow = Array.isArray(payment)
    ? payment.filter((el) => el.ledgerId === data.id)
    : [];
  const cardPayment = paymentForThisRow.find((el) => el.type === "card");
  const cashPayment = paymentForThisRow.find((el) => el.type === "cash");
  // console.log(cardPayment);
  // console.log(cashPayment);
  return {
    cardPayment,
    cashPayment,
    isButtonActive,
    setButtonActive,
  };
};

export default useLedgerRowState;

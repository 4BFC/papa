import { useRef, useState } from "react";
import { SecretaryContextStateType } from "@/shared/types/secretary/contextType";

const useSecretaryState = (): SecretaryContextStateType => {
  const [isSelectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDateSlideOpen, setDateSlideOpen] = useState<boolean>(false);
  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  const [isComplexPayment, setComplexPayment] = useState<boolean>(false);
  const [isTax, setTax] = useState<boolean>(false);
  // 여기에서 추가 필요 한가?
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaymentState, setPaymentState] = useState<PaymentType>("default");

  // const handleDateSlide = (): SetStateAction<boolean> =>
  //   setDateSlideOpen((prev) => !prev);

  // const handleHeaderActive = (): SetStateAction<boolean> =>
  //   setHeaderActive((prev) => !prev);

  // const handleComplexPayment = (): SetStateAction<boolean> =>
  //   setComplexPayment((prev) => !prev);

  // const handleSelectedDate = (date: string): SetStateAction<string | null> =>
  //   setSelectedDate(date);

  return {
    // state: {
    //   isSelectedDate,
    //   isDateSlideOpen,
    //   isHeaderActive,
    //   isComplexPayment,
    // },
    // actions: {
    //   setSelectedDate,
    //   setDateSlideOpen,
    //   setHeaderActive,
    //   setComplexPayment,
    //   handleDateSlide,
    //   handleHeaderActive,
    //   handleComplexPayment,
    //   handleSelectedDate,
    // },
    isSelectedDate,
    setSelectedDate,
    isDateSlideOpen,
    setDateSlideOpen,
    isHeaderActive,
    setHeaderActive,
    isComplexPayment,
    setComplexPayment,
    isTax,
    setTax,
    scrollRef,
    isPaymentState,
    setPaymentState,
  };
};

export default useSecretaryState;

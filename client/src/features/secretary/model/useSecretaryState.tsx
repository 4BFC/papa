import { useState } from "react";
import { SecretaryContextStateType } from "@/shared/types/secretary/contextType";

const useSecretaryState = (): SecretaryContextStateType => {
  const [isSelectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDateSlideOpen, setDateSlideOpen] = useState<boolean>(false);
  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  const [isComplexPayment, setComplexPayment] = useState<boolean>(false);

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
  };
};

export default useSecretaryState;

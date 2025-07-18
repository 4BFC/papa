import { useState } from "react";

const useSecretaryState = (): void => {
  const [isSelectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDateSlideOpen, setDateSlideOpen] = useState<boolean>(false);
  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  const [isComplexPayment, setComplexPayment] = useState<boolean>(false);

  const handleDateSlide = (): SetStateAction<boolean> =>
    setDateSlideOpen((prev) => !prev);

  const handleHeaderActive = (): SetStateAction<boolean> =>
    setHeaderActive((prev) => !prev);

  const handleComplexPayment = (): SetStateAction<boolean> =>
    setComplexPayment((prev) => !prev);

  const handleSelectedDate = (date: string): SetStateAction<string | null> =>
    setSelectedDate(date);

  return {
    state: {
      isSelectedDate,
      isDateSlideOpen,
      isHeaderActive,
      isComplexPayment,
    },
    actions: {
      setSelectedDate,
      setDateSlideOpen,
      setHeaderActive,
      setComplexPayment,
      handleDateSlide,
      handleHeaderActive,
      handleComplexPayment,
      handleSelectedDate,
    },
  };
};

export default useSecretaryState;

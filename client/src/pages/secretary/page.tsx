import { useState } from "react";
import ProviderState from "./context/ProviderState";

export default function SecretaryPage(): React.ReactElement {
  const [isSelectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDateSlideOpen, setDateSlideOpen] = useState<boolean>(false);
  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  const [isComplexPayment, setComplexPayment] = useState<boolean>(false);
  return (
    <ProviderState
      value={{
        isSelectedDate,
        setSelectedDate,
        isDateSlideOpen,
        setDateSlideOpen,
        isHeaderActive,
        setHeaderActive,
        isComplexPayment,
        setComplexPayment,
      }}
    >
      <div>SecretaryPage</div>
    </ProviderState>
  );
}

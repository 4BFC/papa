export interface SecretaryContextType {
  isSelectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  isDateSlideOpen: boolean;
  setDateSlideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHeaderActive: boolean;
  setHeaderActive: React.Dispatch<React.SetStateAction<boolean>>;
  isComplexPayment: boolean;
  setComplexPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

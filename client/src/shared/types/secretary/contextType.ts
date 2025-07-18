import {
  LedgerModel,
  LedgerRequire,
  PaymentDataResponse,
  PaymentModel,
  PaymentRequire,
  LedgerDataResponse,
} from "@/shared/types";

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

export interface SecretaryContextStateType {
  isSelectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  isDateSlideOpen: boolean;
  setDateSlideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHeaderActive: boolean;
  setHeaderActive: React.Dispatch<React.SetStateAction<boolean>>;
  isComplexPayment: boolean;
  setComplexPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SecretaryContextFetchType {
  ledgerData: LedgerModel[];
  paymentData: PaymentModel[];
  postData: LedgerDataResponse[];
  paymentPostData: PaymentDataResponse[];
  actions: {
    ledgerPost: (payload: LedgerRequire) => void;
    paymentPost: (payload: PaymentRequire[]) => void;
  };
  fetchData: {
    getFetchData: () => void;
    paymentFetchData: () => void;
  };
  isLoading: boolean;
  isError: boolean;
}

export type SecretaryContextType = SecretaryContextStateType &
  SecretaryContextFetchType;

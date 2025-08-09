import {
  LedgerModel,
  LedgerRequire,
  PaymentDataResponse,
  PaymentModel,
  PaymentRequire,
  LedgerDataResponse,
} from "@/shared/types";

// export interface SecretaryContextType {
//   isSelectedDate: string | null;
//   setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
//   isDateSlideOpen: boolean;
//   setDateSlideOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   isHeaderActive: boolean;
//   setHeaderActive: React.Dispatch<React.SetStateAction<boolean>>;
//   isComplexPayment: boolean;
//   setComplexPayment: React.Dispatch<React.SetStateAction<boolean>>;
// }

export interface SecretaryContextStateType {
  isSelectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  isDateSlideOpen: boolean;
  setDateSlideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHeaderActive: boolean;
  setHeaderActive: React.Dispatch<React.SetStateAction<boolean>>;
  isComplexPayment: boolean;
  setComplexPayment: React.Dispatch<React.SetStateAction<boolean>>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isTax: boolean;
  setTax: React.Dispatch<React.SetStateAction<boolean>>;
  isPaymentState: PaymentType;
  setPaymentState: React.Dispatch<React.SetStateAction<PaymentType>>;
}

export interface SecretaryContextFetchType {
  ledgerData: LedgerModel[];
  paymentData: PaymentModel[];
  postData: LedgerDataResponse[];
  paymentPostData: PaymentDataResponse[];
  actions: {
    ledgerPost: (payload: LedgerRequire) => Promise<LedgerDataResponse>;
    paymentPost: (payload: PaymentRequire[]) => Promise<PaymentDataResponse>;
  };
  fetchData: {
    getFetchData: () => void;
    paymentFetchData: () => void;
  };

  isLoading: boolean;
  getLoading: boolean;
  paymentLoading: boolean;
  postLoading: boolean;
  paymentPostLoading: boolean;

  isError: string | null;

  getFetchData: () => void;
  paymentFetchData: () => void;
  postMutate: (payload: LedgerRequire) => Promise<LedgerDataResponse>;
  paymentPostMutate: (
    payload: PaymentRequire[]
  ) => Promise<PaymentDataResponse>;
}

export type SecretaryContextType = SecretaryContextStateType &
  SecretaryContextFetchType;

import { useFetch, useMutation } from "@/shared/lib/hook";
import { get, post } from "@/shared/lib/axios";
import {
  LedgerDataResponse,
  LedgerModel,
  LedgerRequire,
  PaymentDataResponse,
  PaymentModel,
  PaymentRequire,
} from "@/shared/types";

const useSecretaryFetch = (): void => {
  /** ledger API GET state 확인 */
  const {
    isData: getData,
    isLoading: getLoading,
    isError: getError,
    fetchData: getFetchData,
    // 해당 get의 타입이 명시적이 않다.
  } = useFetch<LedgerModel[]>(
    () => get<LedgerDataResponse>("/api/ledger/get"),
    true
  );

  /** payment API GET state 확인 */
  const {
    isData: paymentData,
    isLoading: paymentLoading,
    isError: paymentError,
    fetchData: paymentFetchData,
    // 해당 get의 타입이 명시적이 않다.
  } = useFetch<PaymentModel[]>(
    () => get<PaymentDataResponse>("/api/payment/get"),
    true
  );

  /** API POST state 확인 */
  const {
    isData: postData,
    isLoading: postLoading,
    isError: postError,
    mutate: postMutate,
  } = useMutation<LedgerDataResponse, LedgerRequire>((payload) =>
    post<LedgerDataResponse, LedgerRequire>("/api/ledger/post", payload)
  );

  /** API Payment POST state 확인 */
  const {
    isData: paymentPostData,
    isLoading: paymentPostLoading,
    isError: paymentPostError,
    mutate: paymentPostMutate,
  } = useMutation<PaymentDataResponse, PaymentRequire[]>((payload) =>
    post<PaymentDataResponse, PaymentRequire[]>("/api/payment/post", payload)
  );
  return {
    /** get */
    ledgerData: getData ?? [],
    paymentData: paymentData ?? [],

    /** post */
    postData: postData ?? [],
    paymentPostData: paymentPostData ?? [],

    /** post */
    actions: {
      ledgerPost: postMutate,
      paymentPost: paymentPostMutate,
    },

    /** get fetch */
    fetchData: {
      getFetchData: getFetchData,
      paymentFetchData: paymentFetchData,
    },

    /** loading */
    isLoading:
      getLoading || paymentLoading || postLoading || paymentPostLoading,

    /** error */
    isError: getError || paymentError || postError || paymentPostError,
  };
};

export default useSecretaryFetch;

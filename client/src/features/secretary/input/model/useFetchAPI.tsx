import { useEffect } from "react";
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

const useFetchAPI = (
  todayUTC: string
): {
  postMutate: (payload: LedgerRequire) => Promise<LedgerDataResponse>;
  paymentPostMutate: (
    payload: PaymentRequire[]
  ) => Promise<PaymentDataResponse>;
  fetchData: () => void;
  paymentFetchData: () => void;
} => {
  /**
   * postMutate
   * paymentPostMutate
   * fetchData
   * paymentFetchData
   */

  const {
    isData: getData,
    isLoading: getLoading,
    isError: getError,
    fetchData,
    // 해당 get의 타입이 명시적이 않다.
  } = useFetch<LedgerModel[]>(
    () => get<LedgerDataResponse>("/api/ledger/get"),
    true
  );

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

  const {
    isData: postData,
    isLoading: postLoading,
    isError: postError,
    mutate: postMutate,
  } = useMutation<LedgerDataResponse, LedgerRequire>((payload) =>
    post<LedgerDataResponse, LedgerRequire>("/api/ledger/post", payload)
  );

  const {
    isData: paymentPostData,
    isLoading: paymentPostLoading,
    isError: paymentPostError,
    mutate: paymentPostMutate,
  } = useMutation<PaymentDataResponse, PaymentRequire[]>((payload) =>
    post<PaymentDataResponse, PaymentRequire[]>("/api/payment/post", payload)
  );

  /** ledger API GET state 확인 */
  useEffect(() => {
    console.log(todayUTC);
    if (getLoading) {
      console.log("Loading...");
    }
    if (
      getData &&
      getData.filter(
        (el) => el.createdAt.split("T")[0] === todayUTC.split("T")[0]
      )
    ) {
      console.log(
        getData.filter(
          (el) => el.createdAt.split("T")[0] === todayUTC.split("T")[0]
        )
      );
    }
    if (getError) {
      console.log(getError);
    }
  }, [getData, getLoading, getError]);

  /** payment API GET state 확인 */
  useEffect(() => {
    console.log(todayUTC);
    if (paymentLoading) {
      console.log("Loading...");
    }
    if (paymentData) {
      console.log(paymentData);
      // console.log(typeof paymentData);
    }
    if (paymentError) {
      console.log(paymentError);
    }
  }, [paymentData, paymentLoading, paymentError]);

  /** API POST state 확인 */
  useEffect(() => {
    if (postData) {
      console.log(postData);
    }
    if (postLoading) {
      console.log("Loading...");
    }
    if (postError) {
      console.log(postError);
    }
  }, [postData, postLoading, postError]);

  /** API Payment POST state 확인 */
  useEffect(() => {
    if (paymentPostData) {
      console.log(paymentPostData);
    }
    if (paymentPostLoading) {
      console.log("Loading...");
    }
    if (paymentPostError) {
      console.log(paymentPostError);
    }
  }, [paymentPostData, paymentPostLoading, paymentPostError]);

  return {
    postMutate,
    paymentPostMutate,
    fetchData,
    paymentFetchData,
  };
};

export default useFetchAPI;

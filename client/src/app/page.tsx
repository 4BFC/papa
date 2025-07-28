"use client";

import {
  // Dispatch,
  ReactElement,
  // SetStateAction,
  useEffect,
  useState,
} from "react";
// import { useForm } from "react-hook-form";
import {
  LedgerDataResponse,
  LedgerModel,
  LedgerRequire,
  PaymentModel,
  PaymentDataResponse,
  PaymentRequire,
  // FormRequire,
} from "@/shared/types";
import DateItem from "@/features/secretary/slider/ui/DateItem";
import DataRowListContainer from "@/widgets/secretary/body/container/DataRowListContainer";
import Footer from "@/widgets/secretary/footer/presentational/Footer";
import { useFetch, useMutation } from "@/shared/lib/hook";
import { get, post } from "@/shared/lib/axios";
import "@/shared/lib/axios/axiosInterceptors";
import {
  // Calendar,
  X,
  // ChevronDown,
  // ChevronUp,
  // Loader2,
  // CreditCard,
  // Banknote,
  // Check,
  // CheckCheck,
} from "lucide-react";

import { getUniqueSortedDates } from "@/shared/utils";
import Header from "@/features/secretary/header/Header";
import InputForm from "@/widgets/secretary/input/presentational/InputForm";
// import { totalProfit, getUniqueSortedDates } from "@/shared/utils";

// export interface PaymentRequire {
//   ledger_id: number;
//   type: "card" | "cash";
//   price: number;
//   profit: number;
// }

// export type PaymentPostRequest = PaymentUnit[];

export default function Home(): ReactElement {
  /** 표기 방법 */
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const todayUTC = new Date().toISOString();

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

  const [isSelectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDateSlideOpen, setDateSlideOpen] = useState<boolean>(false);
  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  const [isComplexPayment, setComplexPayment] = useState<boolean>(false);
  /** POST 임시 상태 관리 */
  // const [, setIsResponse] = useState<LedgerRequire | null>(null);
  /** 폼 상태 관리 && 데이터 */
  // 복합결제를 위해서 타입 확장성이 필요함.
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormRequire>();

  // const [isTax, setTax] = useState<boolean>(false);

  // const totalProfit = useMemo(() => {
  //   return getData
  //     ? getData
  //         .filter((el) => el.createdAt.split("T")[0] === todayUTC.split("T")[0])
  //         .reduce((acc, item) => acc + (item.profit ?? 0), 0)
  //     : 0;
  // }, [getData]);

  // const handleActive = ({
  //   handle,
  // }: {
  //   // 해당 Dispatch는 어떤 역할인가?
  //   handle: Dispatch<SetStateAction<boolean>>;
  // }): void => {
  //   handle((prev) => !prev);
  // };

  // const onSubmit = async (data: FormRequire): Promise<void> => {
  //   try {
  //     const costPrice = data.costPrice * data.count;
  //     const salePrice = data.salePrice * data.count;
  //     let profit = salePrice - costPrice;

  //     if (isTax) {
  //       profit = profit - profit * 0.1;
  //     }

  //     /**profit 필드 추가 */
  //     const payload = {
  //       // ...data,
  //       count: data.count,
  //       item: data.item,
  //       profit,
  //       costPrice,
  //       salePrice,
  //       type: isTax,
  //     };

  //     // 데이터에 required에 맞는 필드 추가 필요.
  //     // const result = await post("api/ledger/post", payload);
  //     // const result = await post("api/ledger/post", payload);
  //     const ledgerResult = await postMutate(payload);
  //     console.log("🎯ledgerResult", ledgerResult.data[0].id);
  //     const ledgerId = ledgerResult.data[0].id;
  //     // 2. Payment 요청 준비
  //     if (!ledgerResult || !ledgerId) {
  //       throw new Error("다중 결제 등록 실패");
  //     }

  //     //확인 필요
  //     const paymentPayload: PaymentRequire[] = [
  //       {
  //         ledgerId,
  //         type: "card",
  //         price: Number(data.cardPrice),
  //         profit: 6300,
  //       },
  //       {
  //         ledgerId,
  //         type: "cash",
  //         price: Number(data.cashPrice),
  //         profit: 6300,
  //       },
  //     ];
  //     // if (data.cardPrice) {
  //     //   paymentPayload.push({
  //     //     ledgerId: 46,
  //     //     type: "card",
  //     //     price: Number(data.cardPrice),
  //     //     profit: 100,
  //     //   });
  //     // }

  //     // if (data.cashPrice) {
  //     //   paymentPayload.push({
  //     //     ledgerId: 46,
  //     //     type: "cash",
  //     //     price: Number(data.cashPrice),
  //     //     profit: 100,
  //     //   });
  //     // }
  //     console.log("🎯paymentPayload", paymentPayload);
  //     const paymentResult = await paymentPostMutate(paymentPayload);
  //     console.log("🎯paymentResult", paymentResult);

  //     await fetchData();
  //     await paymentFetchData();
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //     } else {
  //       console.error("예외 타입 Error", String(error));
  //       throw error;
  //     }
  //   }
  // };

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

  // const dateList = useMemo(() => {
  //   return Array.from(
  //     new Set(getData?.map((el) => el.createdAt.split("T")[0]))
  //   ).sort((a, b) => b.localeCompare(a));
  // }, [getData]);

  return (
    // 여기서 h-screen은 매번 기입을 해야하는건가?
    <div className="h-screen flex flex-col items-center justify-center">
      {/* Header */}
      {/* <div className="flex w-full justify-center items-center p-5 text-lg font-bold">
        <div className="flex justify-start items-center w-1/3">
          <div
            className={`relative flex justify-center items-center w-11 h-6 transition-colors duration-200 ${
              isComplexPayment ? "bg-blue-200" : "bg-gray-200"
            } rounded-full`}
            onClick={() => {
              setComplexPayment((prev) => !prev);
              setHeaderActive(true);
            }}
          >
            <span
              className={`absolute left-0 w-4 h-4 rounded-full transform transition-transform duration-400 ease-in-out ${
                isComplexPayment
                  ? "translate-x-6 bg-blue-400"
                  : "translate-x-1 bg-white"
              } transition-colors`}
            />
          </div>
        </div>
        <span className="flex justify-center items-center w-1/3">
          {isSelectedDate ? isSelectedDate : today}
        </span>
        <div className="flex justify-end items-center w-1/3">
          <span
            className="flex justify-end items-center bg-blue-50 text-blue-600 rounded-md p-2"
            onClick={() => setDateSlideOpen(true)}
          >
            <Calendar className="w-5 h-5" />
          </span>
        </div>
      </div> */}
      <Header
        setComplexPayment={setComplexPayment}
        setHeaderActive={setHeaderActive}
        setDateSlideOpen={setDateSlideOpen}
        isComplexPayment={isComplexPayment}
        isSelectedDate={isSelectedDate ?? ""}
        today={today}
      />
      {/* Input */}
      <InputForm
        // todayUTC={todayUTC}
        isHeaderActive={isHeaderActive}
        setHeaderActive={setHeaderActive}
        setComplexPayment={setComplexPayment}
        // handleActive={handleActive}
        getLoading={getLoading}
        postLoading={postLoading}
        isComplexPayment={isComplexPayment}
        postMutate={postMutate}
        paymentPostMutate={paymentPostMutate}
        fetchData={fetchData}
        paymentFetchData={paymentFetchData}
      />
      {/* Body */}
      <DataRowListContainer
        data={getData ?? []}
        paymentData={paymentData ?? []}
        getLoading={getLoading}
        isSelectedDate={isSelectedDate ?? ""}
        todayUTC={todayUTC}
      />
      <Footer data={getData ?? []} todayUTC={todayUTC} />

      {/* 슬라이드 */}
      {/* 오버레이 */}
      {isDateSlideOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setDateSlideOpen(false)}
        />
      )}
      {/* 우측 슬라이드 패널 */}
      <div
        className={`flex flex-col fixed top-0 right-0 h-full overflow-y-auto w-[300px] bg-white transform transition-transform duration-300 ease-in-out z-50 p-2 gap-2 ${
          isDateSlideOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-3">
          <div>날짜별 매출</div>
          <div onClick={() => setDateSlideOpen(false)}>
            <X className="w-5 h-5" />
          </div>
        </div>

        {getData &&
          getUniqueSortedDates(getData) &&
          getUniqueSortedDates(getData).map((date) => (
            <DateItem
              key={date}
              date={date}
              onClickDate={setSelectedDate}
              onClickSlide={setDateSlideOpen}
            />
          ))}
      </div>
    </div>
  );
}

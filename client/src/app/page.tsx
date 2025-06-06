"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { LedgerModel, LedgerRequire } from "@/types";
import { HeaderRow, DataRow } from "@/components";
import { useFetch } from "@/hook";
import { get, post } from "@/api";
import "@/api/client/axiosInterceptors";
import { Calendar, X, ChevronDown, ChevronUp } from "lucide-react";

// interface FormValues {
//   item: string;
//   count: number;
//   costPrice: number;
//   salePrice: number;
// }

export default function Home(): ReactElement {
  // type LedgerGetResponse = {
  //   data: LedgerModel[];
  // };

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
  } = useFetch<LedgerModel[]>(() => get("/api/ledger/get"), true);

  const [isDateSlideOpen, setDateSlideOpen] = useState<boolean>(false);
  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  /** POST 임시 상태 관리 */
  const [, setIsResponse] = useState<LedgerRequire | null>(null);
  /** 폼 상태 관리 && 데이터 */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LedgerRequire>();
  const [isTax, setTax] = useState<boolean>(false);
  const totalProfit = useMemo(() => {
    return getData
      ? getData.reduce((acc, item) => acc + (item.profit ?? 0), 0)
      : 0;
  }, [getData]);

  const handleActive = ({
    handle,
  }: {
    handle: Dispatch<SetStateAction<boolean>>;
  }): void => {
    handle((prev) => !prev);
  };

  const onSubmit = async (data: LedgerRequire): Promise<void> => {
    try {
      const costPrice = data.costPrice * data.count;
      const salePrice = data.salePrice * data.count;
      let profit = salePrice - costPrice;

      if (isTax) {
        profit = profit - profit * 0.1;
      }

      /**profit 필드 추가 */
      const payload = {
        ...data,
        profit,
        costPrice,
        salePrice,
        type: isTax,
      };

      // 데이터에 required에 맞는 필드 추가 필요.
      const result = await post("api/ledger/post", payload);
      await fetchData();
      if (result !== undefined) {
        setIsResponse(result);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("예외 타입 Error", String(error));
        throw error;
      }
    }
  };

  /** API GET state 확인 */
  useEffect(() => {
    console.log(todayUTC);
    if (getLoading) {
      console.log("Loading...");
    }
    if (getData) {
      console.log(getData);
    }
    if (getError) {
      console.log(getError);
    }
  }, [getData, getLoading, getError]);

  return (
    // 여기서 h-screen은 매번 기입을 해야하는건가?
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex w-full justify-center items-center p-5 text-lg font-bold">
        <div className="flex justify-end items-center w-1/3" />
        <span className="flex justify-center items-center w-1/3">{today}</span>
        <div className="flex justify-end items-center w-1/3">
          <span
            className="flex justify-end items-center bg-blue-50 text-blue-600 rounded-md p-2"
            onClick={() => setDateSlideOpen(true)}
          >
            <Calendar className="w-5 h-5" />
          </span>
        </div>
      </div>
      <div
        className={`flex items-center justify-center w-full transition-all duration-300 ease-in-out
          ${
            isHeaderActive
              ? "max-h-0 opacity-0 transform scale-y-0 origin-top p-0"
              : "max-h-[500px] opacity-100 transform scale-y-100 origin-top p-2"
          }
        }`}
      >
        <form
          className="flex flex-col items-center justify-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center items-center gap-2 w-11/12">
            <div className="flex justify-center items-center gap-1 w-full">
              <div className="flex justify-end items-center w-full gap-2">
                <div className="flex justify-center items-center gap-1">
                  <span className="flex">카드</span>
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    onClick={() => {
                      console.log("check isTax");
                      setTax((prev) => !prev);
                    }}
                    {...register("type")}
                  />
                </div>
                <div className="w-8/12">
                  <input
                    className="w-full p-2 border-1 border-gray-400 rounded"
                    type="text"
                    placeholder="상품"
                    {...register("item", {
                      required: "상품 기입은 필수 입니다.",
                    })}
                  />
                  {errors.item && (
                    <span className="text-red-500 text-xs">
                      {errors.item.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-4/12">
                <input
                  className="w-full p-2 border-1 border-gray-400 rounded"
                  type="number"
                  placeholder="수량"
                  {...register("count", {
                    required: "수량 기입 필",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "수량 1개 이상 필",
                    },
                  })}
                />
                {errors.count && (
                  <span className="text-red-500 text-xs">
                    {errors.count.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center gap-1 w-full">
              <div className="w-full">
                <input
                  className="w-full p-2 border-1 border-gray-400 rounded"
                  type="number"
                  placeholder="판매가"
                  {...register("salePrice", {
                    required: "판매가를 기입해야 합니다.",
                    valueAsNumber: true,
                    min: {
                      value: 100,
                      message: "가격은 100원 이상이어야 합니다.",
                    },
                  })}
                />
                {errors.salePrice && (
                  <span className="text-red-500 text-xs">
                    {errors.salePrice.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                {/* 원가 계산을 수량에 따라 값이 적용되게 코드를 구현할 필요 있음 */}
                <input
                  className="w-full p-2 border-1 border-gray-400 rounded"
                  type="number"
                  placeholder="원가"
                  {...register("costPrice", {
                    required: "원가를 기입해야 합니다.",
                    valueAsNumber: true,
                    min: {
                      value: 100,
                      message: "가격은 100원 이상이어야 합니다.",
                    },
                  })}
                />
                {errors.costPrice && (
                  <span className="text-red-500 text-xs">
                    {errors.costPrice.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            className={`${
              getLoading ? "bg-gray-400" : "bg-blue-500"
            }  text-white px-8 py-2 font-medium rounded-md mt-4`}
            type="submit"
            disabled={getLoading}
          >
            등록
          </button>
        </form>
      </div>
      <div className="py-2">
        <button onClick={() => handleActive({ handle: setHeaderActive })}>
          {isHeaderActive ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="h-screen w-full bg-gray-200 overflow-y-auto pb-16">
        <div className="w-full">
          {/* 헤더 : component로 분리 필요 */}
          <HeaderRow />
          {/* 데이터 행 : 기능 구현 후 componet로 분리 필요 */}
          {getData &&
            getData
              .filter(
                (el) =>
                  String(el.createdAt).split("T")[0] === todayUTC.split("T")[0]
              )
              .map((item) => <DataRow key={item.id} data={item} />)}
          {/* {getData &&
            getData.map((item) => <DataRow key={item.id} data={item} />)} */}
        </div>
      </div>
      <footer className="fixed bottom-0 flex w-full rounded-t-3xl bg-gray-300 justify-center items-center p-5 text-gray-600 font-medium">
        <span>이득 총합&nbsp;</span>
        <span className="text-green-600 font-bold">
          {totalProfit.toLocaleString()}
        </span>
        원
      </footer>

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
        className={`flex flex-col fixed top-0 right-0 h-full w-[300px] bg-white transform transition-transform duration-300 ease-in-out z-50 p-2 gap-2 ${
          isDateSlideOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-3">
          <div>날짜별 매출</div>
          <div onClick={() => setDateSlideOpen(false)}>
            <X className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col w-full border-1 border-gray-300 rounded-lg justify-center gap-2 p-4">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-lg font-bold">Date</div>
            <div className="text-sm font-medium text-gray-600">
              count 개 상품
            </div>
          </div>
          <div className="flex gap-2">
            <div className="">총 이익</div>
            <div className="font-bold text-green-600">이익 금액</div>
          </div>
        </div>
      </div>
    </div>
  );
}

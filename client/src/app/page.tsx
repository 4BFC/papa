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

  const {
    isData: getData,
    isLoading: getLoading,
    isError: getError,
    fetchData,
  } = useFetch<LedgerModel[]>(() => get("/api/ledger/get"), true);

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
        profit *= 0.97;
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
      <div className="flex justify-center items-center p-5 text-2xl font-bold">
        오늘 날짜
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
          <div className="flex justify-center items-center gap-1 w-11/12">
            <div className="w-full">
              <div className="flex items-center gap-1">
                <input
                  className="w-10 h-10"
                  type="checkbox"
                  onClick={() => {
                    console.log("check isTax");
                    setTax((prev) => !prev);
                  }}
                  {...register("type")}
                />
                <input
                  className="w-full p-1 border-1"
                  type="text"
                  placeholder="상품"
                  {...register("item", { required: "상품을 기입해야 합니다." })}
                />
              </div>
              {errors.item && <span>{errors.item.message}</span>}
            </div>

            <div className="w-full">
              <input
                className="w-full p-1 border-1"
                type="number"
                placeholder="수량"
                {...register("count", {
                  required: "수량을 기입해야 합니다.",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "수량은 1 이상이어야 합니다.",
                  },
                })}
              />
              {errors.count && <span>{errors.count.message}</span>}
            </div>
            <div className="w-full">
              <input
                className="w-full p-1 border-1"
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
              {errors.salePrice && <span>{errors.salePrice.message}</span>}
            </div>
            <div className="w-full">
              {/* 원가 계산을 수량에 따라 값이 적용되게 코드를 구현할 필요 있음 */}
              <input
                className="w-full p-1 border-1"
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
              {errors.costPrice && <span>{errors.costPrice.message}</span>}
            </div>
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <button onClick={() => handleActive({ handle: setHeaderActive })}>
        {isHeaderActive ? "열기" : "접기"}
      </button>
      <div className="h-screen w-full bg-gray-200 overflow-y-auto">
        <div className="w-full">
          {/* 헤더 : component로 분리 필요 */}
          <HeaderRow />
          {/* 데이터 행 : 기능 구현 후 componet로 분리 필요 */}
          {getData &&
            getData.map((item) => <DataRow key={item.id} data={item} />)}
        </div>
      </div>
      <footer>이득 총합 : {totalProfit.toLocaleString()}원</footer>
    </div>
  );
}

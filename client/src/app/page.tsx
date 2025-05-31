"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { LedgerModel, LedgerRequire } from "@/types";
import { HeaderRow } from "@/components";
import { useFetch } from "@/hook";
import { get, post } from "@/api";

// interface FormValues {
//   item: string;
//   count: number;
//   costPrice: number;
//   salePrice: number;
// }

const Home: ReactElement = () => {
  const {
    isData: getData,
    isLoading: getLoading,
    isError: getError,
  } = useFetch<LedgerModel[]>(() => get("/api/ledger/get"), true);

  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  const [isButtonActive, setButtonActive] = useState<boolean>(true);
  /** POST 임시 상태 관리 */
  const [, setIsResponse] = useState<LedgerRequire | null>(null);
  /** 폼 상태 관리 && 데이터 */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LedgerRequire>();
  const [isTax] = useState<boolean>(false);

  const handleActive = ({
    handle,
  }: {
    handle: Dispatch<SetStateAction<boolean>>;
  }): void => {
    handle((prev) => !prev);
  };

  const onSubmit = async (data: LedgerRequire): Promise<void> => {
    try {
      const profit = data.costPrice - data.salePrice;
      /**profit 필드 추가 */
      const payload = {
        ...data,
        profit,
        type: isTax,
      };

      // 데이터에 required에 맞는 필드 추가 필요.
      const result = await post("api/ledger/post", payload);
      setIsResponse(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(`예외 타입 Error : ${error.message}`);
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
          <div className="flex justify-center gap-1 w-11/12">
            <div className="w-full">
              <input
                className="w-full p-1 border-1"
                type="text"
                placeholder="상품"
                {...register("item", { required: "상품을 기입해야 합니다." })}
              />
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
          <div>
            <div
              className="grid grid-cols-4 bg-gray-100"
              onClick={() => handleActive({ handle: setButtonActive })}
            >
              <div className="border border-gray-300 p-2">가방</div>
              <div className="border border-gray-300 p-2">1</div>
              <div className="border border-gray-300 p-2">1,000,000</div>
              <div className="border border-gray-300 p-2">800,000</div>
            </div>
            <div
              className="grid grid-cols-2 bg-gray-100"
              onClick={() => handleActive({ handle: setButtonActive })}
            >
              <div className="border border-gray-300 p-1">이득 금액</div>
              <div className="border border-gray-300 p-1">200,000</div>
            </div>
            {/* 버튼 행 */}
            <div className="grid grid-cols-4">
              <div
                className={`w-full border border-gray-300 col-span-4 flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
                  isButtonActive
                    ? "max-h-0 opacity-0 transform scale-y-0 origin-top p-0"
                    : "max-h-[100px] opacity-100 transform scale-y-100 origin-top p-2"
                }`}
              >
                <div className="flex w-6/12 gap-4">
                  <button className="w-1/2 bg-blue-500 text-white p-2 rounded-md">
                    수정
                  </button>
                  <button className="w-1/2 bg-red-400 text-white p-2 rounded-md">
                    삭제
                  </button>
                </div>
                <div>작성일 : 2025.05.29</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>이득 총합 : 1,200,000</footer>
    </div>
  );
};

export default Home;

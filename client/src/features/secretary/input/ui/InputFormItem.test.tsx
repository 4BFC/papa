import { Banknote, CreditCard, ChevronUp, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import type {
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { FormRequire } from "@/shared/types";
// import useSecretaryState from "../../model/useSecretaryState";
// import useSecretaryFetch from "../../model/useSecretaryFetch";
import useSecretaryContext from "@/pages/secretary/context/useSecretaryContext";

const InputFormItem = ({
  // isHeaderActive,
  // setHeaderActive,
  // setComplexPayment,
  // handleActive,
  // getLoading,
  // postLoading,
  // isComplexPayment,
  handleSubmit,
  onSubmit,
  register,
  errors,
  setTax,
}: {
  // isHeaderActive: boolean;
  // setHeaderActive: Dispatch<SetStateAction<boolean>>;
  // setComplexPayment: (value: boolean) => void;
  //   handleActive: (value: boolean) => void;
  // getLoading: boolean;
  // postLoading: boolean;
  // isComplexPayment: boolean;
  handleSubmit: UseFormHandleSubmit<FormRequire>;
  onSubmit: SubmitHandler<FormRequire>;
  register: UseFormRegister<FormRequire>;
  errors: FieldErrors<FormRequire>;
  setTax: Dispatch<SetStateAction<boolean>>;
}): React.ReactElement => {
  const {
    isHeaderActive,
    isComplexPayment,
    setHeaderActive,
    setComplexPayment,
    isLoading,
  } = useSecretaryContext();
  // const { getLoading, postLoading } = useSecretaryFetch();

  useEffect(() => {
    console.log("InputFormItem: isComplexPayment changed to", isComplexPayment);
  }, [isComplexPayment]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Input Form */}
      <div
        className={`flex items-center justify-center w-full transition-all duration-500 ease-in-out
        ${
          isHeaderActive
            ? "max-h-[500px] opacity-100 transform scale-y-100 origin-top p-2"
            : "max-h-0 opacity-0 transform scale-y-0 origin-top p-0"
        }
      }`}
      >
        <form
          className="flex flex-col items-center justify-center w-full gap-2"
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
          {/* 다중 결제 추가 영역 */}
          <div
            className={`flex flex-col justify-center items-center w-11/12 transition-all duration-500 ease-in-out ${
              isComplexPayment
                ? "max-h-[500px] opacity-100 transform scale-y-100 origin-top"
                : "max-h-0 opacity-0 transform scale-y-0 origin-top p-0"
            }`}
          >
            <div className="flex flex-col justify-center items-center gap-1 w-full">
              <div className="flex justify-center items-center w-full gap-1">
                <CreditCard strokeWidth={2} className="text-blue-500" />
                <span className="flex w-1/3">카드</span>
                <input
                  type="text"
                  className="w-full p-2 border-1 border-gray-400 rounded"
                  placeholder="카드 금액"
                  {...register("cardPrice")}
                />
              </div>
              <div className="flex justify-center items-center w-full gap-1 ">
                <Banknote strokeWidth={2} className="text-green-500" />
                <span className="flex w-1/3">현금</span>
                <input
                  type="text"
                  className="w-full p-2 border-1 border-gray-400 rounded"
                  placeholder="현금 금액"
                  {...register("cashPrice")}
                />
              </div>
            </div>
          </div>
          <button
            className={`${
              isLoading ? "bg-gray-400" : "bg-blue-500"
            }  text-white px-8 py-2 font-medium rounded-md mt-4`}
            type="submit"
            disabled={isLoading}
          >
            등록
          </button>
        </form>
      </div>
      {/* Input Form 접기 버튼 */}
      <div className="py-2">
        <button
          onClick={() => {
            // handleActive({ handle: setHeaderActive });
            setHeaderActive((prev) => !prev);
            setComplexPayment(false);
          }}
        >
          {isHeaderActive ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputFormItem;

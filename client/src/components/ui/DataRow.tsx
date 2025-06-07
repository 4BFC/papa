import { useState } from "react";
import { LedgerModel } from "@/types";
import { splitData, formatCurrencyData } from "@/utils";

const DataRow = ({ data }: { data: LedgerModel }): React.ReactElement => {
  const [isButtonActive, setButtonActive] = useState<boolean>(true);

  return (
    <>
      <div
        className="overflow-x-auto"
        onClick={() => setButtonActive((prev) => !prev)}
      >
        <div
          className={`w-full flex justify-center items-center text-sm font-sans border-b border-gray-200 ${
            data.type ? "bg-blue-50" : "bg-white"
          }`}
        >
          <div className="w-18/100 py-3 px-1 text-left">
            {splitData(data.item).map((el, index) => (
              // 사실상 고유한 키값은 아니다. 이를 해결할 방법을 생각할 필요 있다.
              <div key={`${el}-${index}`}>{el}</div>
            ))}
          </div>
          <div className="w-7/100 py-3 px-0 text-center">{data.count}</div>
          <div className="flex flex-col w-26/100 py-3 px-2 text-right">
            {formatCurrencyData(data.salePrice, "ko-KR")}
            <div className="flex flex-col justify-between text-xs text-gray-600">
              <span>카드 16,000</span>
              <span>현금 16,000</span>
            </div>
          </div>
          <div className="flex flex-col w-26/100 py-3 px-1 text-right">
            {formatCurrencyData(data.costPrice, "ko-KR")}
            <div className="flex flex-col justify-between text-xs text-gray-600">
              <span>카드 16,000</span>
              <span>현금 16,000</span>
            </div>
          </div>
          <div className="flex flex-col w-23/100 py-3 px-1 text-right text-green-600 font-medium">
            {formatCurrencyData(data.profit, "ko-KR")}
          </div>
        </div>
      </div>
      {/** 버튼 행 */}
      <div className="grid grid-cols-4 text-sm font-medium">
        <div
          className={`w-full border gap-2 border-gray-300 col-span-4 flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
            isButtonActive
              ? "max-h-0 opacity-0 transform scale-y-0 origin-top p-0"
              : "max-h-[110px] opacity-100 transform scale-y-100 origin-top px-2 py-3"
          }`}
        >
          <div className="flex justify-between w-8/12 gap-4">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">
              수정
            </button>
            <button className="w-full bg-red-400 text-white py-2 rounded-md">
              삭제
            </button>
            {/* <button className="w-full bg-red-500 text-white py-2 rounded-md">
              복합 결제
            </button> */}
          </div>
          <div className="text-xs text-gray-600">
            작성일 :{" "}
            {String(data.createdAt).split("T")[0] +
              " " +
              String(data.createdAt)
                .split("T")[1]
                .split(".")[0]
                .split(":")
                .slice(0, 2)
                .join(":")}
          </div>
          {data.type ? (
            <div className="text-xs text-gray-600">카드 결제</div>
          ) : (
            <div className="text-xs text-gray-600">현금 결제</div>
          )}
        </div>
      </div>
    </>
  );
};

export default DataRow;

import { useState } from "react";
import { LedgerModel } from "@/shared/types";

const DataRow = ({ data }: { data: LedgerModel }): React.ReactElement => {
  const [isButtonActive, setButtonActive] = useState<boolean>(true);

  return (
    <>
      <div
        className="grid grid-cols-4 bg-gray-100"
        onClick={() => setButtonActive((prev) => !prev)}
      >
        <div className="border border-gray-300 p-2">{data.item}</div>
        <div className="border border-gray-300 p-2">{data.count}</div>
        <div className="border border-gray-300 p-2">{data.salePrice}</div>
        <div className="border border-gray-300 p-2">{data.costPrice}</div>
      </div>
      <div
        className="grid grid-cols-2 bg-gray-100"
        onClick={() => setButtonActive((prev) => !prev)}
      >
        <div className="border border-gray-300 p-1">이득 금액</div>
        <div className="border border-gray-300 p-1">{data.profit}</div>
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
    </>
  );
};

export default DataRow;

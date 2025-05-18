"use client";

import { useState } from "react";

const Home = () => {
  const [isHeaderActive, setHeaderActive] = useState<boolean>(false);
  const [isButtonActive, setButtonActive] = useState<boolean>(true);

  const handleActive = ({
    handle,
  }: {
    handle: Dispatch<SetStateAction<boolean>>;
  }) => {
    handle((prev) => !prev);
  };

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
          action=""
        >
          <div className="flex justify-center gap-1 w-11/12">
            {/* <div> */}
            <input
              className="border-1 p-1 w-full"
              type="text"
              name="name"
              placeholder="상품"
            />
            {/* </div> */}
            {/* <div> */}
            <input
              className="border-1 p-1 w-full"
              type="text"
              name="name"
              placeholder="수량"
            />
            {/* </div> */}
            {/* <div> */}
            <input
              className="border-1 p-1 w-full"
              type="text"
              name="name"
              placeholder="가격"
            />
            {/* </div> */}
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
      <div className="h-screen w-full bg-gray-200">
        <div className="w-full">
          {/* 헤더 */}
          <div className="grid grid-cols-4 bg-gray-100">
            <div className="border border-gray-300 p-2">상품</div>
            <div className="border border-gray-300 p-2">수량</div>
            <div className="border border-gray-300 p-2">가격</div>
            <div className="border border-gray-300 p-2">날짜</div>
          </div>
          {/* 데이터 행 */}
          <div
            className="grid grid-cols-4 bg-gray-100"
            onClick={() => handleActive({ handle: setButtonActive })}
          >
            <div className="border border-gray-300 p-2">가방</div>
            <div className="border border-gray-300 p-2">1</div>
            <div className="border border-gray-300 p-2">1,000,000</div>
            <div className="border border-gray-300 p-2">25.05.18</div>
          </div>
          {/* 버튼 행 */}
          <div className="grid grid-cols-4">
            <div
              className={`w-full border border-gray-300 col-span-4 flex justify-center items-center transition-all duration-300 ease-in-out ${
                isButtonActive
                  ? "max-h-0 opacity-0 transform scale-y-0 origin-top p-0"
                  : "max-h-[58px] opacity-100 transform scale-y-100 origin-top p-2"
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
            </div>
          </div>
        </div>
      </div>
      <footer>총합</footer>
    </div>
  );
};

export default Home;

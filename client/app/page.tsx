"use client";

import { useState } from "react";

const Home = () => {
  const [isActive, setActive] = useState(false);
  return (
    // 여기서 h-screen은 매번 기입을 해야하는건가?
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setActive(!isActive)}>
        {isActive ? "접기" : "열기"}
      </button>

      <div
        className={`w-full transition-all duration-300 ease-in-out
          ${
            isActive
              ? "max-h-0 opacity-0 transform scale-y-0 origin-top p-0"
              : "max-h-[500px] opacity-100 transform scale-y-100 origin-top p-10"
          }
        }`}
      >
        <form className="flex flex-col items-center justify-center" action="">
          <div>
            <input className="border-1 p-2" type="text" name="name" />
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="h-screen w-full bg-gray-200">tabel</div>
    </div>
  );
};

export default Home;

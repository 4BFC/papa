"use client";

import { useFetch } from "@/hook";
import { get } from "@/api";
import { LedgerModel } from "@/types";
import "@/api/client/axiosInterceptors";
// import { useEffect } from "react";

const Test = (): React.ReactNode => {
  /**client-side 호출 */
  const URL: string =
    // process.env.NEXT_PUBLIC_MY_API ||
    "https://jsonplaceholder.typicode.com/posts";
  const { isData } = useFetch<LedgerModel[]>(() => get(`${URL}`), true);

  console.log(isData);

  /**server-side 호출 */
  // const fetchLedger = async (): Promise<void> => {
  //   try {
  //     const res = await fetch("/api/ledger/get"); // ✅ Next API Route 호출
  //     if (!res.ok) throw new Error("서버 응답 실패");

  //     const data = await res.json();
  //     console.log("Ledger:", data);
  //   } catch (error) {
  //     console.error("Ledger 불러오기 실패:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchLedger();
  // }, []);
  /**--- */
  return <div>Test</div>;
};

export default Test;

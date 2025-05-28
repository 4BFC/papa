"use client";

// import { useFetch } from "@/hook";
// import { get } from "@/api";
// import { LedgerModel } from "@/types";
import "@/lib/axios/axiosInterceptors";
import { useEffect } from "react";

const Test = (): React.ReactNode => {
  // const URL: string = process.env.NEXT_PUBLIC_MY_API || "";
  // const { isData } = useFetch<LedgerModel[]>(() => get(`${URL}/ledger`), true);

  // console.log(isData);

  const fetchLedger = async (): Promise<void> => {
    try {
      const res = await fetch("/api/ledger"); // ✅ Next API Route 호출
      if (!res.ok) throw new Error("서버 응답 실패");

      const data = await res.json();
      console.log("Ledger:", data);
    } catch (error) {
      console.error("Ledger 불러오기 실패:", error);
    }
  };
  useEffect(() => {
    fetchLedger();
  }, []);
  return <div>Test</div>;
};

export default Test;

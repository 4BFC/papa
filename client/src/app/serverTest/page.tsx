"use client";

// import "@/api/client/axiosInterceptors";
import { useEffect } from "react";

const Test = (): React.ReactNode => {
  /**server-side 호출 */
  const fetchLedger = async (): Promise<void> => {
    try {
      const res = await fetch("/api/ledger/get"); // ✅ Next API Route 호출
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

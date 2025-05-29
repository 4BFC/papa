"use client";

import { useFetch } from "@/hook";
import { get } from "@/api";
import { LedgerModel } from "@/types";
import { useEffect } from "react";

const Test = (): React.ReactNode => {
  /**server-side 호출 */
  const { isData, isLoading, isError } = useFetch<LedgerModel[]>(
    () => get("/api/ledger/get"),
    true
  );
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }
    if (isData) {
      console.log(isData);
    }
    if (isError) {
      console.log(isError);
    }
  }, [isData, isLoading, isError]);

  return <div>Test</div>;
};

export default Test;

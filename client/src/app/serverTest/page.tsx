"use client";

import { useFetch } from "@/hook";
import { get } from "@/api";
import { LedgerModel } from "@/types";
import { useEffect } from "react";

const Test = (): React.ReactNode => {
  /**server-side 호출 */
  const { isData } = useFetch<LedgerModel[]>(
    () => get("/api/ledger/get"),
    true
  );
  useEffect(() => {
    console.log(isData);
  }, [isData]);

  return <div>Test</div>;
};

export default Test;

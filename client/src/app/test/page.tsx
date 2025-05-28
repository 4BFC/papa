"use client";

import { useFetch } from "@/hook";
import { get } from "@/api";
import { LedgerModel } from "@/types";
import "@/lib/axios/axiosInterceptors";

const Test = (): React.ReactNode => {
  const URL: string = process.env.NEXT_PUBLIC_MY_API || "";
  const { isData } = useFetch<LedgerModel[]>(() => get(`${URL}/ledger`), true);

  console.log(isData);

  return <div>Test</div>;
};

export default Test;

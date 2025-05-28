"use client";

import { useFetch } from "@/hook";
import { get } from "@/api";
import { LedgerModel } from "@/types";
// import "@/lib/axios/axiosInterceptors";

const Test = (): React.ReactNode => {
  // const URL: string = process.env.MY_API || "";
  const { isData } = useFetch<LedgerModel[]>(
    () =>
      get("https://bqqtkzywfttjzwswydxp.supabase.co/functions/v1/api/ledger"),
    true
  );

  console.log(isData);

  return <div>Test</div>;
};

export default Test;

"use client";

import { useFetch } from "@/shared/lib/hook";
import { get } from "@/shared/lib/axios";
import { LedgerModel } from "@/shared/types";
import { useEffect } from "react";

const Test = (): React.ReactNode => {
  /**client-side 호출 */
  const URL: string =
    // process.env.NEXT_PUBLIC_MY_API ||
    "https://jsonplaceholder.typicode.com/posts";
  const { isData } = useFetch<LedgerModel[]>(() => get(`${URL}`), true);

  useEffect(() => {
    console.log(isData);
  }, [isData]);

  return <div>Test</div>;
};

export default Test;

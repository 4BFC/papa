"use client";

import { useEffect, useState } from "react";

const useFetch = (
  type: () => Promise<T>,
  enabled: boolean
): { isData: T | null } => {
  const [isData, setData] = useState<T>();
  useEffect(() => {
    if (!enabled) return;
    const fetchData = async (): void => {
      try {
        const response = await type();
        setData(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
        } else {
          console.error("예외 타입 Error", String(error));
        }
      }
    };
    fetchData();
    /**type을 의존성 배열에 넣으면 무한 렌더링 발생 따라서 외부에서 useCallback으로 감싸서 의존성 배열에 넣어주는게 좋다. */
  }, [enabled]);
  return { isData };
};
export default useFetch;

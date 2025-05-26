import { get } from "@/api";
import { useState, useEffect } from "react";

const useFetch = (
  url: string,
  enabled: boolean
): {
  isData: unknown;
  isLoading: boolean;
  isError: unknown;
} => {
  const [isData, setData] = useState<unknown>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<unknown>();

  useEffect(() => {
    if (!enabled) return;
    const fetch = async (): Promise<void> => {
      setLoading(true);
      try {
        // 타입을 정의 해야함. - 타입을 정의 하는 방식은 여러가지가 있다.
        const data = await get<unknown>(url);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [url, enabled]);
  return { isData, isLoading, isError };
};
export default useFetch;

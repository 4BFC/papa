import { useEffect, useState } from "react";

const useFetch = <T,>(
  type: () => Promise<T>,
  enabled: boolean
): {
  isData: T | undefined;
  isLoading: boolean;
  isError: string;
  fetchData: () => Promise<void>;
} => {
  const [isData, setData] = useState<T>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");

  const fetchData = async (): void => {
    try {
      setLoading(true);
      const { data } = await type();
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`예외 타입 Error : ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) return;
    fetchData();
    /**type을 의존성 배열에 넣으면 무한 렌더링 발생 따라서 외부에서 useCallback으로 감싸서 의존성 배열에 넣어주는게 좋다. */
  }, [enabled]);
  return { isData, isLoading, isError, fetchData };
};
export default useFetch;

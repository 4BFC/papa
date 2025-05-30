import { useEffect, useState } from "react";

const useFetch = (
  type: () => Promise<T>,
  enabled: boolean
): { isData: T | null } => {
  const [isData, setData] = useState<T>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");

  useEffect(() => {
    if (!enabled) return;
    const fetchData = async (): void => {
      try {
        setLoading(true);
        const response = await type();
        setData(response);
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
    fetchData();
    /**type을 의존성 배열에 넣으면 무한 렌더링 발생 따라서 외부에서 useCallback으로 감싸서 의존성 배열에 넣어주는게 좋다. */
  }, [enabled]);
  return { isData, isLoading, isError };
};
export default useFetch;

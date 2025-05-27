import { useEffect, useState } from "react";

const useFetch = (type: Promise<T>, enabled: boolean): { isData: T } => {
  const [isData, setData] = useState<T>();
  useEffect(() => {
    if (!enabled) return;
    const fetchData = async (): void => {
      try {
        const response = await type;
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [enabled, type]);
  return { isData };
};
export default useFetch;

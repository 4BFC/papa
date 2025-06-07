import { useState } from "react";

const useMutation = <T, Request>(
  type: (input: Request) => Promise<{ data: T }>
): {
  isData: T | undefined;
  isLoading: boolean;
  isError: string;
  mutate: () => Promise<void>;
} => {
  const [isData, setData] = useState<T>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");

  const mutate = async (input: Request): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await type(input);
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`예외 타입 Error : ${String(error.message)}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return { isData, isLoading, isError, mutate };
};

export default useMutation;

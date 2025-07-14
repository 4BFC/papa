import { useState } from "react";

const useMutation = <Response, Request>(
  type: (payload: Request) => Promise<Response>
): {
  isData: Response | undefined;
  isLoading: boolean;
  isError: string;
  mutate: (payload: Request) => Promise<Response>;
} => {
  const [isData, setData] = useState<Response>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");

  const mutate = async (payload: Request): Promise<Response> => {
    try {
      setLoading(true);
      const data = await type(payload);
      setData(data);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`예외 타입 Error : ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
    throw new Error("mutate 함수에서 반환되지 않았습니다.");
  };
  return { isData, isLoading, isError, mutate };
};

export default useMutation;

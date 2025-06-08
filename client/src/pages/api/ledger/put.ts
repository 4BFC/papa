import type { NextApiRequest, NextApiResponse } from "next";
import { axiosInstanceServer } from "@/api";
// import { corsMiddleware } from "@/utils/cors";

const put = async <T>(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<T> => {
  // await corsMiddleware(req, res);

  try {
    const response = await axiosInstanceServer.put<T>(`/ledger`, req.body);
    res.status(200).json(response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("예외 타입 Error", String(error));
      throw new Error("알 수 없는 에러");
    }
  }
  // undefined를 반환하지 않는 경우 에러 발생 또는 undeinfed를 명시적으로 반환하는 것이 좋음.
  throw new Error("put 함수에서 반환되지 않았습니다.");
};
export default put;

import type { NextApiRequest, NextApiResponse } from "next";
import { axiosInstanceServer } from "@/api";
// import { corsMiddleware } from "@/utils/cors";

const put = async <T>(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // await corsMiddleware(req, res);

  try {
    const response = await axiosInstanceServer.put<T>(`/ledger`, req.body);
    res.status(200).json(response.data);
    // return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("예외 타입 Error", String(error));
      throw error;
    }
  }
};
export default put;

import type { NextApiRequest, NextApiResponse } from "next";
import { axiosInstanceServer } from "@/api";
import { corsMiddleware } from "@/utils/cors";

const get = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await corsMiddleware(req, res);

  try {
    const response = await axiosInstanceServer.get("/ledger");
    // const { data } = await axiosInstanceServer.get("/ledger");
    res.status(200).json(response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "An unknown error occurred" });
  }
};

export default get;

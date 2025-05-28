import type { NextApiRequest, NextApiResponse } from "next";
import { axiosServer } from "@/api";

const ledger = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { data } = await axiosServer.get("/ledger");
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "An unknown error occurred" });
  }
};

export default ledger;

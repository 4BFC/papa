import { LedgerModel } from "@/shared/types";

const totalProfit = <T extends LedgerModel[]>(
  getData: T,
  todayUTC: string
): number => {
  return getData
    ? getData
        .filter((el) => el.createdAt.split("T")[0] === todayUTC.split("T")[0])
        .reduce((acc, item) => acc + (item.profit ?? 0), 0)
    : 0;
};

export default totalProfit;

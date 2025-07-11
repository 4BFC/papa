import { LedgerModel } from "@/shared/types";

const getUniqueSortedDates = <T extends LedgerModel[]>(
  getData: T
): string[] => {
  return Array.from(
    new Set(getData?.map((el) => el.createdAt.split("T")[0]))
  ).sort((a, b) => b.localeCompare(a));
};

export default getUniqueSortedDates;

import { LedgerModel } from "@/types";

const DataRow = ({ data }: { data: LedgerModel }): React.ReactElement => {
  return (
    <div className="overflow-x-auto">
      <div className="w-full flex justify-center items-center text-sm font-sans border-b border-gray-200">
        <div className="w-20/100 bg-white py-3 px-2 text-left">{data.item}</div>
        <div className="w-15/100 bg-white py-3 px-2 text-center">
          {data.count}
        </div>
        <div className="w-25/100 bg-white py-3 px-2 text-right">
          {data.salePrice}
        </div>
        <div className="w-20/100 bg-white py-3 px-2 text-right">
          {data.costPrice}
        </div>
        <div className="w-20/100 bg-white py-3 px-2 text-right text-green-600 font-medium">
          {data.profit}
        </div>
      </div>
    </div>
  );
};

export default DataRow;

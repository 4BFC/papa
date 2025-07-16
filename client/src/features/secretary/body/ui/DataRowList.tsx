import { Loader2 } from "lucide-react";
import DataRow from "@/widgets/secretary/body/presentational/DataRow";
import { LedgerModel, PaymentModel } from "@/shared/types";

const DataRowList = ({
  data,
  paymentData,
  getLoading,
  children,
}: {
  data: LedgerModel[];
  paymentData: PaymentModel[];
  getLoading: boolean;
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-200 overflow-y-auto pb-16">
      <div className="flex-1 overflow-y-auto w-full">
        {children}
        {/* 로딩 부분을 따로 분리해서 관리 할 수 있게 해야한다. 또는 suspense 사용을해서 문제를 해결 해야한다.*/}
        {getLoading ? (
          <div className="flex flex-col justify-center items-center h-full gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            <span className="text-sm font-medium text-gray-600">
              로딩 중입니다...
            </span>
          </div>
        ) : (
          data &&
          paymentData &&
          data.map((item) => (
            <DataRow key={item.id} data={item} payment={paymentData} />
          ))
        )}
      </div>
    </div>
  );
};

export default DataRowList;

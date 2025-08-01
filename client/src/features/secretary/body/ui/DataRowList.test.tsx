import { Loader2 } from "lucide-react";
import DataRow from "./DataRow.test";
import { LedgerModel } from "@/shared/types";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";

const DataRowList = ({
  data,
  children,
}: {
  data: LedgerModel[];
  children: React.ReactNode;
}): React.ReactElement => {
  const { getLoading, scrollRef } = useSecretaryContext();

  return (
    <div ref={scrollRef} className="h-screen bg-gray-200 overflow-y-auto pb-16">
      <div className="flex flex-col w-full">
        {children}
        {/* 로딩 부분을 따로 분리해서 관리 할 수 있게 해야한다. 또는 suspense 사용을해서 문제를 해결 해야한다.*/}
        {getLoading ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            <span className="text-sm font-medium text-gray-600">
              로딩 중입니다...
            </span>
          </div>
        ) : (
          data.map((item) => <DataRow key={item.id} data={item} />)
        )}
      </div>
    </div>
  );
};

export default DataRowList;

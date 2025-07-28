import { X } from "lucide-react";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";
import { getUniqueSortedDates } from "@/shared/utils";
import DateItem from "./DateItem";

const SliderItem = (): React.ReactElement => {
  const { isDateSlideOpen, setDateSlideOpen, setSelectedDate, ledgerData } =
    useSecretaryContext();
  return (
    <>
      {isDateSlideOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setDateSlideOpen(false)}
        />
      )}
      {/* 우측 슬라이드 패널 */}
      <div
        className={`flex flex-col fixed top-0 right-0 h-full overflow-y-auto w-[300px] bg-white transform transition-transform duration-300 ease-in-out z-50 p-2 gap-2 ${
          isDateSlideOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-3">
          <div>날짜별 매출</div>
          <div onClick={() => setDateSlideOpen(false)}>
            <X className="w-5 h-5" />
          </div>
        </div>

        {ledgerData &&
          getUniqueSortedDates(ledgerData) &&
          getUniqueSortedDates(ledgerData).map((date) => (
            <DateItem
              key={date}
              date={date}
              onClickDate={setSelectedDate}
              onClickSlide={setDateSlideOpen}
            />
          ))}
      </div>
    </>
  );
};

export default SliderItem;

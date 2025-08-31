const DateItem = ({
  date,
  onClickDate,
  onClickSlide,
  total,
  profit,
}: {
  date: string;
  onClickDate: (date: string) => void;
  onClickSlide: (isOpen: boolean) => void;
  total: number;
  profit: string;
}): React.ReactElement => {
  return (
    <div
      className="border-1 border-gray-300 rounded-lg justify-center gap-2 p-4"
      onClick={() => {
        onClickDate(date);
        onClickSlide(false);
      }}
    >
      <div className="flex flex-col justify-center gap-1">
        <div className="text-lg font-bold">{date}</div>
        <div className="text-sm font-medium text-gray-600">{total} 개 상품</div>
      </div>
      <div className="flex gap-2">
        <div className="">총 이익</div>
        <div className="font-bold text-green-600">{profit} 원</div>
      </div>
    </div>
  );
};

export default DateItem;

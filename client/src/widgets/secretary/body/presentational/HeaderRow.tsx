const HeaderRow = (): React.ReactNode => {
  return (
    <div className="sticky top-0 z-10 overflow-x-auto">
      <div className="w-full flex justify-center items-center text-sm  text-gray-700 bg-gray-100">
        <div className="w-18/100 p-2 text-left">상품</div>
        <div className="w-7/100 p-0 text-center">수량</div>
        <div className="w-26/100 p-2 text-right">판매가</div>
        <div className="w-26/100 p-2 text-right">원가</div>
        <div className="w-23/100 p-2 text-right">이득금액</div>
      </div>
    </div>
  );
};

export default HeaderRow;

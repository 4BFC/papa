const HeaderRow = (): React.ReactNode => {
  return (
    <div className="overflow-x-auto">
      <div className="w-full flex justify-center items-center text-sm  text-gray-700">
        <div className="w-20/100 bg-gray-100 p-2 text-left">상품</div>
        <div className="w-15/100 bg-gray-100 p-2 text-center">수량</div>
        <div className="w-25/100 bg-gray-100 p-2 text-right">판매가</div>
        <div className="w-20/100 bg-gray-100 p-2 text-right">원가</div>
        <div className="w-20/100 bg-gray-100 p-2 text-right">이득금액</div>
      </div>
    </div>
  );
};

export default HeaderRow;

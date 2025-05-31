const HeaderRow = (): React.ReactNode => {
  return (
    <div className="grid grid-cols-4 bg-gray-100">
      <div className="border border-gray-300 p-2">상품</div>
      <div className="border border-gray-300 p-2">수량</div>
      <div className="border border-gray-300 p-2">판매가</div>
      <div className="border border-gray-300 p-2">원가</div>
    </div>
  );
};

export default HeaderRow;

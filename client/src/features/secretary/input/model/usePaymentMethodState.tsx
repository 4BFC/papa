// 결제 방식의 결과 값을 나타내는 코드
const usePaymentMethodState = ({
  isTax,
  isComplexPayment,
}: {
  isTax: boolean;
  isComplexPayment: boolean;
}): string => {
  // const [isPaymentMethod, setPaymentMethod] = useState<string>("default");
  if (!isTax && !isComplexPayment) {
    return "default";
  } else if (isTax && !isComplexPayment) {
    return "card";
  } else if (isTax && isComplexPayment) {
    return "complex";
  }
};

export default usePaymentMethodState;

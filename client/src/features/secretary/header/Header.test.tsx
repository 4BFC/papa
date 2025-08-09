import { Calendar } from "lucide-react";
// import { Dispatch, SetStateAction } from "react";
// import useSecretaryState from "../model/useSecretaryState";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";
import { getPaymentValidation } from "@/features/secretary/model/paymentValidation";
const Header = ({ today }: { today: string }): React.ReactElement => {
  const {
    isSelectedDate,
    isComplexPayment,
    setComplexPayment,
    setHeaderActive,
    setDateSlideOpen,
    setPaymentState,
    isTax,
    setTax,
  } = useSecretaryContext();
  return (
    <div className="flex w-full justify-center items-center p-5 text-lg font-bold">
      <div className="flex justify-start items-center w-1/3">
        <div
          className={`relative flex justify-center items-center w-11 h-6 transition-colors duration-200 ${
            isComplexPayment && isTax ? "bg-blue-200" : "bg-gray-200"
          } rounded-full`}
          onClick={() => {
            // 이 로직 구조가 너무 별로임.....
            // console.log("payment is ONLY COMPLEX");
            const nextComplex = !isComplexPayment;
            const nextTax = nextComplex ? true : false; // 정책: 켜지면 true, 꺼지면 false

            setComplexPayment(nextComplex);
            setTax(nextTax); // off면 tax도 false로

            const nextType = getPaymentValidation(nextTax, nextComplex); // 'default' 포함 정확히 계산
            setPaymentState(nextType);

            setHeaderActive(true);
          }}
        >
          <span
            className={`absolute left-0 w-4 h-4 rounded-full transform transition-transform duration-400 ease-in-out ${
              isComplexPayment && isTax
                ? "translate-x-6 bg-blue-400"
                : "translate-x-1 bg-white"
            } transition-colors`}
          />
        </div>
      </div>
      <span className="flex justify-center items-center w-1/3">
        {isSelectedDate ? isSelectedDate : today}
      </span>
      <div className="flex justify-end items-center w-1/3">
        <span
          className="flex justify-end items-center bg-blue-50 text-blue-600 rounded-md p-2"
          onClick={() => setDateSlideOpen(true)}
        >
          <Calendar className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
};

export default Header;

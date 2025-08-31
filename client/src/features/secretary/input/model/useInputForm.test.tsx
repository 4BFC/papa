import { Dispatch, SetStateAction, useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  useForm,
  SubmitHandler,
} from "react-hook-form";
import { FormRequire, PaymentRequire } from "@/shared/types";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";
// import usePaymentMethodState from "./usePaymentMethodState";

const useInputForm = (): {
  isTax: boolean;
  setTax: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<FormRequire>;
  handleSubmit: UseFormHandleSubmit<FormRequire>;
  errors: FieldErrors<FormRequire>;
  onSubmit: SubmitHandler<FormRequire>;
} => {
  // const [isTax, setTax] = useState<boolean>(false); // 해당 Tax는 isChecked와 동일하다.
  // const [isChecked, setChecked] = useState<boolean>(false);
  const {
    getFetchData,
    paymentFetchData,
    paymentPostMutate,
    postMutate,
    scrollRef,
    isComplexPayment,
    isTax,
    setTax,
    isPaymentState,
  } = useSecretaryContext();
  // const paymentMethod = usePaymentMethodState({ isTax, isComplexPayment });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormRequire>();

  /** 현재 isTax가 전역 상태로 넘어가야하는지 확인 필요. */
  useEffect(() => {
    if (!isComplexPayment) {
      setTax(false);
      // setChecked(false);
    } else {
      setTax(true);
      // setChecked(true);
    }
  }, [isComplexPayment, setTax]);

  /** 상태를 점검 하기 위한 useEffect */
  useEffect(() => {
    console.log("✅ isPaymentState", isPaymentState);
  }, [isPaymentState]);

  const onSubmit: SubmitHandler<FormRequire> = async (data) => {
    /**상태에 따라서 계산해야하는 로직이 명확 해야함
     * 현재 복합적으로 로직이 꼬여 있다. 즉, 상태에 따라 동작하는 계산이 되어 있지 않다.
     * paymentPost가 필요 없는 상태에서 POST가 동작을 한다.
     * log 정리를 먼저 해야한다.
     */

    const defaultPayload = (): FormRequire => {
      const costPrice = data.costPrice * data.count;
      const salePrice = data.salePrice * data.count;
      const profit = salePrice - costPrice;
      return {
        count: data.count,
        item: data.item,
        profit,
        costPrice,
        salePrice,
        type: isTax,
      };
    };

    const cardPayload = (): FormRequire => {
      const costPrice = data.costPrice * data.count;
      const salePrice =
        data.salePrice * data.count - data.salePrice * data.count * 0.1;
      const profit = salePrice - costPrice;
      return {
        count: data.count,
        item: data.item,
        profit,
        costPrice,
        salePrice,
        type: isTax,
      };
    };

    const complexPayload = (): FormRequire => {
      const costPrice = data.costPrice;
      const salePrice =
        Number(data.cashPrice) +
        Number(data.cardPrice) -
        Number(data.cardPrice) * 0.1;
      const profit = salePrice - costPrice;
      return {
        count: data.count,
        item: data.item,
        profit,
        costPrice,
        salePrice,
        type: isTax,
      };
    };

    try {
      //해당 costPrice와 salePrice가 동작해야하는 조건은 무엇인가.
      const payload =
        isPaymentState === "default"
          ? defaultPayload()
          : isPaymentState === "card"
          ? cardPayload()
          : complexPayload();

      /**profit 필드 추가 */
      // const payload = {
      //   count: data.count,
      //   item: data.item,
      //   profit,
      //   costPrice,
      //   salePrice,
      //   type: isTax,
      // };

      const ledgerResult = await postMutate(payload);
      console.log("🎯ledgerResult", ledgerResult.data[0].id);
      const ledgerId = ledgerResult.data[0].id;

      // Payment 요청 실패시 throw Error
      if (!ledgerResult || !ledgerId) {
        throw new Error("다중 결제 등록 실패");
      }

      // 2. Payment 요청 준비
      if (isPaymentState === "complex") {
        const paymentPayload: PaymentRequire[] = [
          {
            ledgerId,
            type: "card",
            price: Number(data.cardPrice),
            profit: Number(data.cardPrice) - Number(data.cardPrice) * 0.1,
          },
          {
            ledgerId,
            type: "cash",
            price: Number(data.cashPrice),
            profit: Number(data.cashPrice),
          },
        ];

        console.log("🎯paymentPayload", paymentPayload);
        const paymentResult = await paymentPostMutate(paymentPayload); //복합 결제가 활성화 되면 적용되어야 한다.
        console.log("🎯paymentResult", paymentResult);
      } //if (isComplexPayment && isTax)

      await getFetchData(); // 일반 결제 get
      await paymentFetchData(); //복합 결제 get

      reset();

      // 스크롤 함수 분리 필요
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight + 100,
            behavior: "smooth",
          });
          console.log("🎯scrollRef.current", scrollRef.current);
        } else {
          console.log("🎯scrollRef.current is null");
        }
      }, 200);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("예외 타입 Error", String(error));
        throw error;
      }
    }
  };
  return {
    isTax,
    setTax,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useInputForm;

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  useForm,
  SubmitHandler,
} from "react-hook-form";
import { FormRequire, PaymentRequire } from "@/shared/types";
import useSecretaryContext from "@/views/secretary/context/useSecretaryContext";

const useInputForm = (): {
  isTax: boolean;
  setTax: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<FormRequire>;
  handleSubmit: UseFormHandleSubmit<FormRequire>;
  errors: FieldErrors<FormRequire>;
  onSubmit: SubmitHandler<FormRequire>;
  isChecked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
} => {
  const [isTax, setTax] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(false);
  const {
    getFetchData,
    paymentFetchData,
    paymentPostMutate,
    postMutate,
    scrollRef,
    isComplexPayment,
  } = useSecretaryContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormRequire>();

  useEffect(() => {
    if (!isComplexPayment) {
      setTax(false);
      setChecked(false);
    } else {
      setTax(true);
      setChecked(true);
    }
  }, [isComplexPayment, setTax, setChecked]);

  const onSubmit: SubmitHandler<FormRequire> = async (data) => {
    try {
      const costPrice = data.costPrice * data.count;
      const salePrice = data.salePrice * data.count;
      let profit = salePrice - costPrice;

      if (isTax) {
        profit = profit - profit * 0.1;
      }

      /**profit 필드 추가 */
      const payload = {
        count: data.count,
        item: data.item,
        profit,
        costPrice,
        salePrice,
        type: isTax,
      };

      const ledgerResult = await postMutate(payload);
      console.log("🎯ledgerResult", ledgerResult.data[0].id);
      const ledgerId = ledgerResult.data[0].id;

      // Payment 요청 실패시 throw Error
      if (!ledgerResult || !ledgerId) {
        throw new Error("다중 결제 등록 실패");
      }

      // 2. Payment 요청 준비
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
      const paymentResult = await paymentPostMutate(paymentPayload);
      console.log("🎯paymentResult", paymentResult);

      await getFetchData();
      await paymentFetchData();

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
    isChecked,
    setChecked,
  };
};

export default useInputForm;

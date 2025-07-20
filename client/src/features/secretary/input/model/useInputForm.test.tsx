import { Dispatch, SetStateAction, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  useForm,
  SubmitHandler,
} from "react-hook-form";
import {
  FormRequire,
  // LedgerDataResponse,
  // LedgerRequire,
  // PaymentDataResponse,
  PaymentRequire,
} from "@/shared/types";
import useSecretaryFetch from "../../model/useSecretaryFetch";

const useInputForm =
  (): // postMutate: (payload: LedgerRequire) => Promise<LedgerDataResponse>,
  // paymentPostMutate: (
  //   payload: PaymentRequire[]
  // ) => Promise<PaymentDataResponse>,
  // fetchData: () => void,
  // paymentFetchData: () => void
  {
    isTax: boolean;
    setTax: Dispatch<SetStateAction<boolean>>;
    register: UseFormRegister<FormRequire>;
    handleSubmit: UseFormHandleSubmit<FormRequire>;
    errors: FieldErrors<FormRequire>;
    onSubmit: SubmitHandler<FormRequire>;
  } => {
    const [isTax, setTax] = useState<boolean>(false);
    const { getFetchData, paymentFetchData, paymentPostMutate, postMutate } =
      useSecretaryFetch();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormRequire>();

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
          // ...data,
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
        // 2. Payment 요청 준비
        if (!ledgerResult || !ledgerId) {
          throw new Error("다중 결제 등록 실패");
        }

        //확인 필요
        const paymentPayload: PaymentRequire[] = [
          {
            ledgerId,
            type: "card",
            price: Number(data.cardPrice),
            profit: 6300,
          },
          {
            ledgerId,
            type: "cash",
            price: Number(data.cashPrice),
            profit: 6300,
          },
        ];
        // if (data.cardPrice) {
        //   paymentPayload.push({
        //     ledgerId: 46,
        //     type: "card",
        //     price: Number(data.cardPrice),
        //     profit: 100,
        //   });
        // }

        // if (data.cashPrice) {
        //   paymentPayload.push({
        //     ledgerId: 46,
        //     type: "cash",
        //     price: Number(data.cashPrice),
        //     profit: 100,
        //   });
        // }
        console.log("🎯paymentPayload", paymentPayload);
        const paymentResult = await paymentPostMutate(paymentPayload);
        console.log("🎯paymentResult", paymentResult);

        await getFetchData();
        await paymentFetchData();
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

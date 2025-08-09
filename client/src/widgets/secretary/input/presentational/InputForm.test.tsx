import InputFormItemTest from "@/features/secretary/input/ui/InputFormItem.test";
// import useFetchAPI from "@/features/secretary/input/model/useFetchAPI";
import useInputFormTest from "@/features/secretary/input/model/useInputForm.test";
// import {
//   LedgerRequire,
//   PaymentRequire,
//   LedgerDataResponse,
//   PaymentDataResponse,
// } from "@/shared/types";
// import { Dispatch, SetStateAction } from "react";

const InputForm = (): React.ReactElement => {
  const { setTax, register, handleSubmit, errors, onSubmit, isTax } =
    useInputFormTest();

  return (
    <InputFormItemTest
      // isHeaderActive={isHeaderActive}
      // setHeaderActive={setHeaderActive}
      // setComplexPayment={setComplexPayment}
      //   handleActive={handleActive}
      // getLoading={getLoading}
      // postLoading={postLoading}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setTax={setTax}
      isTax={isTax}
      // isComplexPayment={isComplexPayment}
    />
  );
};

export default InputForm;

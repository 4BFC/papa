import InputFormItem from "@/features/secretary/input/ui/InuptFromItem";
// import useFetchAPI from "@/features/secretary/input/model/useFetchAPI";
import useInputForm from "@/features/secretary/input/model/useInputForm";

const InputForm = ({
  //   todayUTC,
  isHeaderActive,
  setHeaderActive,
  setComplexPayment,
  handleActive,
  getLoading,
  postLoading,
  isComplexPayment,
  postMutate,
  paymentPostMutate,
  fetchData,
  paymentFetchData,
}: {
  todayUTC: string;
  isHeaderActive: boolean;
  setHeaderActive: (value: boolean) => void;
  setComplexPayment: (value: boolean) => void;
  handleActive: (value: boolean) => void;
  getLoading: boolean;
  postLoading: boolean;
  isComplexPayment: boolean;
  postMutate: (payload: LedgerRequire) => Promise<LedgerDataResponse>;
  paymentPostMutate: (
    payload: PaymentRequire[]
  ) => Promise<PaymentDataResponse>;
  fetchData: () => void;
  paymentFetchData: () => void;
}): React.ReactElement => {
  const { setTax, register, handleSubmit, errors, onSubmit } = useInputForm(
    postMutate,
    paymentPostMutate,
    fetchData,
    paymentFetchData
  );

  return (
    <InputFormItem
      isHeaderActive={isHeaderActive}
      setHeaderActive={setHeaderActive}
      setComplexPayment={setComplexPayment}
      handleActive={handleActive}
      getLoading={getLoading}
      postLoading={postLoading}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setTax={setTax}
      isComplexPayment={isComplexPayment}
    />
  );
};

export default InputForm;

import {
  PaymentType,
  PaymentFlags,
} from "@/shared/types/secretary/paymentType";

const PAYMENT_STATES: Record<PaymentType, PaymentFlags> = {
  card: { isTax: true, isComplexPayment: false },
  complex: { isTax: true, isComplexPayment: true },
  default: { isTax: false, isComplexPayment: false },
};

// 결제 상태에 따라 복합 결제와 카드 결제를 반환하는 코드
export const setPaymentValidation = (type: PaymentType): PaymentFlags => {
  return PAYMENT_STATES[type];
};
export const getPaymentValidation = (
  isTax: boolean,
  isComplexPayment: boolean
): PaymentType => {
  if (!isTax && !isComplexPayment) return "default";
  if (isTax && !isComplexPayment) return "card";
  if (isTax && isComplexPayment) return "complex";
  return "default";
};
// export default { getPaymentValidation, setPaymentValidation };

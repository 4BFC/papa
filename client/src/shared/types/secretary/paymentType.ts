export type PaymentType = "card" | "complex" | "default";

export interface PaymentFlags {
  isTax: boolean;
  isComplexPayment: boolean;
}

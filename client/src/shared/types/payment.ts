export interface PaymentRequire {
  ledgerId: number;
  type: string;
  price: number;
  profit: number;
}

export interface PaymentModel extends PaymentRequire {
  id: number;
  updateAt: string;
  createdAt: string;
}

export interface PaymentDataResponse {
  data: PaymentModel[];
  error: null | string;
}

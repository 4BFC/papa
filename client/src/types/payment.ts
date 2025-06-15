export interface PaymentRequire {
  type: boolean;
  price: number;
  profit: number;
  updateAt: string;
  createdAt: string;
}

export interface PaymentModel extends PaymentRequire {
  id: number;
  ledgerId: number;
}

export interface PaymentDataResponse {
  data: PaymentModel[];
  error: null | string;
}

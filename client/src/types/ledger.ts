export interface LedgerRequire {
  item: string;
  costPrice: number;
  salePrice: number;
  profit: number;
  type: boolean;
  count: number;
}

export interface LedgerModel extends LedgerRequire {
  id: number;
  userId: string;
  updateAt: string;
  createdAt: string;
}

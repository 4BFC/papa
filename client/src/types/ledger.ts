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
  user_id: string;
  update_at: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  taxes: number;
  type: string;
  quantity?: number;
}

export interface Totals {
  taxes: number;
  total: number;
}

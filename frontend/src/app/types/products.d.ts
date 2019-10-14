export interface Products {
  data: {
    id: number;
    name: string;
    price: number;
    category: string;
    taxes: number;
    type: string;
  }[];
}

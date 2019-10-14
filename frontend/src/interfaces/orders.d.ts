import { OrderState } from "../constants";

export interface Orders {
  status: number;
  data: {
    id: number;
    status: OrderState;
    total: number;
    taxes: number;
    created_at: string;
    count: number;
  }[];
}

export interface Order {
  data: {
    items: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
    taxes: number;
    status: OrderState;
  };
}

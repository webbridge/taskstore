import { InsertAnswer } from "./index";

export namespace Orders {
  interface Items {
    id: number;
    status: string;
    total: number;
    taxes: number;
    created_at: string;
    count: number;
  }

  interface OrderProducts {
    items: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
    taxes: number;
    status: string;
  }

  interface Model {
    getOrders: () => Promise<Items[]>;
    getOrderById: (id) => Promise<OrderProducts>;
    addNewOrder: (body) => Promise<InsertAnswer>;
    updateOrder: (status, id) => Promise<InsertAnswer>;
  }
}

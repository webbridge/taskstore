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

export interface Orders {
  status: number;
  data: {
    id: number;
    status: string;
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
    status: string;
  };
}

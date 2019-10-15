export namespace Cart {
  interface Item {
    taxes: number;
    total: number;
  }

  interface ResponseBody {
    id: number;
    quantity: number;
  }

  interface ResponseTotals {
    id: number;
    price: number;
    type_taxes: number;
    category_taxes: number;
  }

  interface Model {
    getTotals: (body: ResponseBody[]) => Promise<Item>;
  }
}

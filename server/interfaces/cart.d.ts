export namespace Cart {
  interface Total {
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
    getTotals: (body: number[]) => Promise<ResponseTotals[]>;
  }
}

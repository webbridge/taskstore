export namespace Cart {
  interface Item {
    taxes: number;
    total: number;
  }

  interface ResponseBody {
    id: number;
    quantity: number;
  }

  interface Model {
    getTotals: (body: ResponseBody[]) => Promise<Item[]>;
  }
}

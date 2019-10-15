export namespace Products {
  interface Item {
    id: number;
    name: string;
    price: number;
    category: string;
    taxes: number;
    type: string;
  }

  interface Model {
    getProducts: () => any;
  }
}

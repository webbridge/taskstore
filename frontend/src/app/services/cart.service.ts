import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CartService {
  constructor() {}

  public showCart = false;
  public items: Product[] = [];

  addToCart(product: Product) {
    if (this.items.filter((item) => product.id === item.id).length > 0) {
      this.items.map((item) => {
        if (item.id === product.id) {
          item.quantity++;
          return item;
        }
      });
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getTotalPrice(): number {
    return (
      this.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + this.getAllTaxes()
    );
  }

  getAllTaxes(): number {
    return (
      Math.round(this.items.reduce((acc, item) => acc + item.taxes * item.quantity, 0) * 20) / 20
    );
  }

  prepareOrder() {
    return {
      items: this.items.map(({ id, quantity }) => ({
        product_id: id,
        quantity
      })),
      total: this.getTotalPrice(),
      taxes: this.getAllTaxes()
    };
  }

  getCartLength() {
    let result = 0;
    this.items.forEach((item) => {
      result = result + item.quantity;
    });
    return result;
  }

  toogleCart() {
    this.showCart = !this.showCart;
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  taxes: number;
  type: string;
  quantity?: number;
}

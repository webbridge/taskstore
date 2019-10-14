import { Injectable } from "@angular/core";
import { Product } from "../interfaces/cart";
import { TaxesService } from "./taxes.service";

@Injectable({ providedIn: "root" })
export class CartService {
  constructor(private taxesService: TaxesService) {}

  public showCart = false;
  public items: Product[] = [];

  addToCart(product: Product) {
    if (this.items.filter(item => product.id === item.id).length > 0) {
      this.items.map(item => {
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
    this.items = this.items.filter(item => item.id !== id);
  }

  getTotalPrice(): number {
    return (
      this.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + this.getAllTaxes()
    );
  }

  getAllTaxes(): number {
    return (
      Math.ceil(this.items.reduce((acc, item) => acc + item.taxes * item.quantity, 0) * 20) / 20
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
    this.items.forEach(item => {
      result = result + item.quantity;
    });
    return result;
  }

  async toogleCart() {
    if (!!this.items.length) {
      this.showCart = !this.showCart;
      if (!!this.showCart) {
        const preparedBody = this.items.map(({ id, quantity }) => ({ id, quantity }));

        this.taxesService.getTaxes(preparedBody).subscribe(data => {
          console.log(data);
        });
      }
    }
  }
}

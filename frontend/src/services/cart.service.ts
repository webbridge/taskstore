import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product, Totals } from "../interfaces/cart";
import { environment } from "../environments/environment";

const { BASE_URL, CART_TOTALS } = environment.API;

@Injectable({ providedIn: "root" })
export class CartService {
  constructor(private http: HttpClient) {}

  public showCart = false;
  public items: Product[] = [];
  public taxes: number = 0;
  public total: number = 0;

  addToCart(product: Product) {
    // Adding items to cart
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

    // Calculating totals & taxes
    this.setTotals();
  }

  getTotals(body): Observable<Totals> {
    return this.http.post<Totals>(`${BASE_URL + CART_TOTALS}`, { items: [...body] });
  }

  setTotals() {
    const preparedBody = this.items.map(({ id, quantity }) => ({ id, quantity }));

    this.getTotals(preparedBody).subscribe(({ taxes, total }) => {
      this.taxes = taxes;
      this.total = total;
    });
  }

  removeFromCart(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    if (!!this.items.length) {
      this.setTotals();
    }
  }

  prepareOrder() {
    return {
      items: this.items.map(({ id, quantity }) => ({
        product_id: id,
        quantity
      })),
      total: this.total,
      taxes: this.taxes
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
    if (!!this.items.length) {
      this.showCart = !this.showCart;
    }
  }

  closeCart() {
    this.showCart = false;
  }

  clearCart() {
    this.closeCart();
    this.items = [];
  }
}

import { Component } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent {
  constructor(public cartService: CartService, private ordersService: OrdersService) {}

  showCart() {
    return !!this.cartService.items.length && this.cartService.showCart;
  }

  buyNow() {
    const order = this.cartService.prepareOrder();
    this.ordersService.sendOrder(order).subscribe((data) => {
      this.cartService.clearCart();
    });
  }

  toogleCart() {
    this.cartService.toogleCart();
  }

  closeCart() {
    this.cartService.closeCart();
  }

  removeFromCart(id) {
    this.cartService.removeFromCart(id);
  }
}

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

  buyNow(order) {
    this.ordersService.sendOrder(order).subscribe((data) => {
      this.cartService.clearCart();
      console.log(data);
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent {
  constructor(public cartService: CartService, private apiService: ApiService) {}

  buyNow(order) {
    this.apiService.sendOrder(order).subscribe((data) => {
      console.log(data);
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  constructor(private apiService: ApiService, public cartService: CartService) {}

  products = [];

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data.data;
    });
  }
}

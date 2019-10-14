import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService, public cartService: CartService) {}

  products = [];

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.data;
    });
  }

  test(ids) {
    console.log(ids);
  }
}

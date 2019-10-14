import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../services/orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}

  private orders = [];

  ngOnInit() {
    this.ordersService.getOrders().subscribe((res) => {
      this.orders = res.data;
    });
  }
}

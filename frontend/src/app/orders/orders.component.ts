import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  private orders = [];

  ngOnInit() {
    this.apiService.getOrders().subscribe((res) => {
      this.orders = res.data;
    });
  }
}

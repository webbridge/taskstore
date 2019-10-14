import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdersService } from "../../services/orders.service";
import { OrderState } from "../../constants";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
  constructor(private router: ActivatedRoute, private ordersService: OrdersService) {
    this.statuses = OrderState;
  }

  orderId = 0;
  total = 0;
  taxes = 0;
  items = [];
  status = "";
  selectedStatus = "";
  statuses;

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.orderId = params.id;
      this.ordersService
        .getOrder(params.id)
        .subscribe(({ data: { total, taxes, items, status } }) => {
          this.total = total;
          this.taxes = taxes;
          this.items = items;
          this.status = status;
          this.selectedStatus = status;
        });
    });
  }

  changeStatus(status: string) {
    this.ordersService.updateOrder(this.orderId, status).subscribe((res) => {
      this.status = this.selectedStatus;
    });
  }
}

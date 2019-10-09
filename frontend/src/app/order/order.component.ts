import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
  constructor(private router: ActivatedRoute, private apiService: ApiService) {}

  orderId = 0;
  total = 0;
  taxes = 0;
  items = [];
  status = "";
  selectedStatus = "";
  statuses = ["pending", "in progress", "delivery", "done"];

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.orderId = params.id;
      this.apiService.getOrder(params.id).subscribe(({ data: { total, taxes, items, status } }) => {
        this.total = total;
        this.taxes = taxes;
        this.items = items;
        this.status = status;
        this.selectedStatus = status;
      });
    });
  }

  changeStatus(status: string) {
    this.apiService.updateOrder(this.orderId, status).subscribe((res) => {
      this.status = this.selectedStatus;
    });
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order, Orders } from "../interfaces/orders";
import { environment } from "../environments/environment";

const { BASE_URL, ORDER, ORDERS } = environment.API;

@Injectable({ providedIn: "root" })
export class OrdersService {
  constructor(private http: HttpClient) {}

  sendOrder(order): Observable<Orders> {
    return this.http.post<Orders>(`${BASE_URL + ORDERS}`, order);
  }

  getOrders(): Observable<Orders> {
    return this.http.get<Orders>(`${BASE_URL + ORDERS}`);
  }

  getOrder(id): Observable<Order> {
    return this.http.get<Order>(`${BASE_URL + ORDER + id}`);
  }

  updateOrder(id, status): Observable<object> {
    return this.http.put<object>(`${BASE_URL + ORDER + id}`, { status });
  }
}

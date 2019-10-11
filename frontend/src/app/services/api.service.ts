import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Products, Order, Orders } from "../types/api";
import { environment } from "../../config";

const { BASE_URL, PRODUCTS, ORDER, ORDERS } = environment.API;

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Products> {
    return this.http.get<Products>(`${BASE_URL + PRODUCTS}`);
  }

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

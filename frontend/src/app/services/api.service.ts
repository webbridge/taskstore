import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  URL = "http://localhost:3000";

  getProducts(): Observable<Products> {
    return this.http.get<Products>(`${this.URL}/products`);
  }

  sendOrder(order): Observable<Orders> {
    return this.http.post<Orders>(`${this.URL}/order/`, order);
  }

  getOrders(): Observable<Orders> {
    return this.http.get<Orders>(`${this.URL}/orders`);
  }

  getOrder(id): Observable<Order> {
    return this.http.get<Order>(`${this.URL}/order/${id}`);
  }

  updateOrder(id, status): Observable<Object> {
    return this.http.put<Object>(`${this.URL}/order/${id}`, { status });
  }
}

interface Products {
  data: {
    id: number;
    name: string;
    price: number;
    category: string;
    taxes: number;
    type: string;
  }[];
}

interface Orders {
  status: number;
  data: {
    id: number;
    status: string;
    total: number;
    taxes: number;
    created_at: string;
    count: number;
  }[];
}

interface Order {
  data: {
    items: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
    taxes: number;
    status: string;
  };
}

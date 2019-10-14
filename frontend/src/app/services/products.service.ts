import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Products } from "../types/api";
import { environment } from "../../config";

const { BASE_URL, PRODUCTS } = environment.API;

@Injectable({ providedIn: "root" })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Products> {
    return this.http.get<Products>(`${BASE_URL + PRODUCTS}`);
  }
}

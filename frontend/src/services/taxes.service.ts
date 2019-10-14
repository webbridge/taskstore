import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { Products } from "../interfaces/products";
import { environment } from "../environments/environment";

const { BASE_URL, TAXES } = environment.API;

@Injectable({ providedIn: "root" })
export class TaxesService {
  constructor(private http: HttpClient) {}

  getTaxes(body) {
    return this.http.post(`${BASE_URL + TAXES}`, { items: [...body] });
  }
}

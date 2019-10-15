import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductsService } from "./products.service";
import { environment } from "../environments/environment";
import { Products } from "../interfaces/products";

const { BASE_URL, PRODUCTS } = environment.API;

describe("ProductsService", () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const mockProducts: Products = {
    data: [
      {
        id: 1,
        name: "Chicken",
        price: 30,
        category: "Meat",
        taxes: 1.5,
        type: "imported"
      },
      {
        id: 2,
        name: "Lego star wars",
        price: 70,
        category: "Toys",
        taxes: 7,
        type: "standard"
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    service = TestBed.get(ProductsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get products from '/products' via GET ", () => {
    service.getProducts().subscribe((products) => {
      expect(products.data.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const request = httpMock.expectOne(BASE_URL + PRODUCTS);
    expect(request.request.method).toBe("GET");
    request.flush(mockProducts);
  });
});

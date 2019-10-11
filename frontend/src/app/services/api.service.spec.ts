import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ApiService } from "./api.service";
import { environment } from "../../config";

const { BASE_URL } = environment.API;

describe("ApiService", () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const mockProducts = [
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
  ];
  const mockOrders = {
    data: [
      {
        id: 1,
        status: "pending",
        total: 100,
        taxes: 10,
        created_at: "16/08/2019",
        count: 2
      },
      {
        id: 2,
        status: "pending",
        total: 178,
        taxes: 8.9,
        created_at: "05/09/2019",
        count: 5
      }
    ],
    status: 200
  };

  const mockOrder = {
    items: [
      {
        id: 1,
        name: "chicken",
        price: 10,
        quantity: 2
      }
    ],
    total: 20,
    taxes: 2,
    status: "pending"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.get(ApiService);
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
      expect(products.data).toEqual(mockProducts);
    });

    const request = httpMock.expectOne(`${BASE_URL}/products`);
    expect(request.request.method).toBe("GET");
    request.flush(mockProducts);
  });

  it("should get orders from '/orders' via GET ", () => {
    service.getOrders().subscribe((orders) => {
      expect(orders.status).toBe(200);
      expect(orders.data.length).toBe(2);
      expect(orders).toEqual(mockOrders);
    });

    const request = httpMock.expectOne(`${BASE_URL}/orders`);
    expect(request.request.method).toBe("GET");
    request.flush(mockOrders);
  });

  it("should get orders from '/order' by 'id' via GET ", () => {
    const id = 1;
    service.getOrder(id).subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });

    const request = httpMock.expectOne(`${BASE_URL}/order/${id}`);
    expect(request.request.method).toBe("GET");
    request.flush(mockOrder);
  });
});

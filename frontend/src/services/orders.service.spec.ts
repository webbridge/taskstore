import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { OrdersService } from "./orders.service";
import { environment } from "../environments/environment";
import { Orders, Order } from "../interfaces/orders";
import { OrderState } from "../constants";

const { BASE_URL, ORDERS } = environment.API;

describe("OrdersService", () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  const mockOrders: Orders = {
    data: [
      {
        id: 1,
        status: OrderState.Pending,
        total: 100,
        taxes: 10,
        created_at: "16/08/2019",
        count: 2
      },
      {
        id: 2,
        status: OrderState.Pending,
        total: 178,
        taxes: 8.9,
        created_at: "05/09/2019",
        count: 5
      }
    ],
    status: 200
  };

  const mockOrder: Order = {
    data: {
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
      status: OrderState.Pending
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService]
    });

    service = TestBed.get(OrdersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get orders from '/orders' via GET ", () => {
    service.getOrders().subscribe((orders) => {
      expect(orders.status).toBe(200);
      expect(orders.data.length).toBe(2);
      expect(orders).toEqual(mockOrders);
    });

    const request = httpMock.expectOne(BASE_URL + ORDERS);
    expect(request.request.method).toBe("GET");
    request.flush(mockOrders);
  });

  it("should get orders from '/order' by 'id' via GET ", () => {
    const id = "26868721";
    service.getOrder(id).subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });

    const request = httpMock.expectOne(BASE_URL + ORDERS + id);
    expect(request.request.method).toBe("GET");
    request.flush(mockOrder);
  });
});

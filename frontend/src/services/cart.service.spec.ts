import { TestBed } from "@angular/core/testing";

import { CartService } from "./cart.service";

describe("CartService", () => {
  let service: CartService;
  const mockItems = [
    {
      id: 1,
      name: "Chicken",
      price: 30,
      category: "Meat",
      taxes: 1.5,
      type: "imported",
      quantity: 2
    },
    {
      id: 2,
      name: "Lego star wars",
      price: 70,
      category: "Toys",
      taxes: 7,
      type: "standard",
      quantity: 3
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CartService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should geting cart length", () => {
    service.items = mockItems;
    expect(service.getCartLength()).toBe(5);
  });

  it("should toogle cart", () => {
    expect(service.showCart).toBeFalsy();
    service.toogleCart();
    expect(service.showCart).toBeTruthy();
    service.toogleCart();
    expect(service.showCart).toBeFalsy();
  });

  it("should remove product from cart", () => {
    service.items = mockItems;
    expect(service.items).toEqual(mockItems);
    service.removeFromCart(1);
    expect(service.items).toEqual([mockItems[1]]);
  });

  it("should add product to cart", () => {
    const newProduct = {
      id: 3,
      name: "Cheese",
      price: 8,
      category: "food",
      taxes: 0.8,
      type: "standard",
      quantity: 1
    };

    service.addToCart(newProduct);
    expect(service.items).toEqual([newProduct]);
  });

  it("should prepare order to request", () => {
    const result = {
      items: [
        {
          product_id: 1,
          quantity: 2
        },
        {
          product_id: 2,
          quantity: 3
        }
      ],
      total: 294,
      taxes: 24
    };

    service.items = mockItems;
    expect(service.items).toEqual(mockItems);
    expect(service.prepareOrder()).toEqual(result);
  });
});

import * as supertest from "supertest";
import { expect } from "chai";
import { stub, restore } from "sinon";
import app from "../app";
import { model } from "../routes/cart";
import { environment } from "../environments/environment";
import { getTotals } from "../services/cart";

const { CART_TOTALS } = environment.API;
const server = supertest(app);

const mockCartBody = [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }];
const mockCartData = [
  { id: 1, price: 20, type_taxes: 5, category_taxes: 10 },
  { id: 2, price: 12, type_taxes: 0, category_taxes: 10 }
];
const mockRequestBody = { items: [{ id: 1, quantity: 1 }, { id: 2, quantity: 2 }] };

describe("CART", () => {
  describe("API", () => {
    beforeEach(() => {
      stub(model, "getTotals").resolves(mockCartData);
    });

    afterEach(() => {
      restore();
    });

    it("Check endpoint: '/cart/total/' POST", (done) => {
      server
        .post(CART_TOTALS)
        .send(mockRequestBody)
        .expect(200)
        .end((err, res) => {
          if (!!err) throw err;
          expect(res.body).has.property("total", 49.4);
          expect(res.body).has.property("taxes", 5.4);
          done();
        });
    });
  });

  describe("SERVICE", () => {
    it("Check method: getTotal()", () => {
      const result = getTotals(mockCartBody, mockCartData);

      expect(result).has.property("taxes", 7.2);
      expect(result).has.property("total", 59.2);
    });
  });
});

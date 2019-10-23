import * as supertest from "supertest";
import { expect } from "chai";
import { stub, restore } from "sinon";
import app from "../app";
import { model } from "../routes/products";
import { environment } from "../environments/environment";
import { Products } from "../interfaces/products";

const { PRODUCTS } = environment.API;

const mockProductsItems: Products.Item[] = [
  {
    id: 1,
    name: "Chicken",
    price: 5,
    category: "other",
    taxes: 0.5,
    type: "standart"
  }
];

describe("PRODUCTS", () => {
  describe("API", () => {
    const server = supertest(app);

    beforeEach(() => {
      stub(model, "getProducts").resolves(mockProductsItems);
    });

    afterEach(() => {
      restore();
    });

    it("Check endpoint: '/products' GET", (done) => {
      server
        .get(PRODUCTS)
        .expect(200)
        .end((err, res) => {
          if (!!err) throw err;
          expect(res.body).has.property("data");
          expect(res.body.data).to.be.a("array");
          expect(res.body.data).to.deep.equal(mockProductsItems);
          done();
        });
    });
  });
});

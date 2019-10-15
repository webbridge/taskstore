import * as supertest from "supertest";
import { expect } from "chai";
import { environment } from "../environments/environment";

const { BASE_URL, CART_TOTALS } = environment.API;
const server = supertest.agent(BASE_URL);

describe("Testing Taxes endpoints", () => {
  it("should be check '/cart/total/' POST", (done) => {
    server
      .post(CART_TOTALS)
      .send({ items: [{ id: 1, quantity: 1 }] })
      .expect(200)
      .end((err, res) => {
        if (!!err) throw err;
        expect(res.body).has.property("data");
        expect(res.body.data).to.be.a("array");
        done();
      });
  });
});

import * as supertest from "supertest";
import { expect } from "chai";
import { environment } from "../environments/environment";

const { BASE_URL, PRODUCTS } = environment.API;
const server = supertest.agent(BASE_URL);

describe("Testing Products endpoints", () => {
  it("should be check '/products' GET", (done) => {
    server
      .get(PRODUCTS)
      .expect(200)
      .end((err, res) => {
        if (!!err) throw err;
        expect(res.body).has.property("data");
        expect(res.body.data).to.be.a("array");
        done();
      });
  });
});

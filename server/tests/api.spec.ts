import * as supertest from "supertest";
import { expect } from "chai";
import { environment } from "../environments/environment";

const { BASE_URL } = environment.API;
const server = supertest.agent(BASE_URL);

describe("Testing API endpoints", () => {
  it("should be check '/orders' GET", (done) => {
    server
      .get("/orders")
      .expect(200)
      .end((err, res) => {
        if (!!err) throw err;
        expect(res.body).has.property("data");
        expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should be check '/order/:id' GET", (done) => {
    server
      .get("/order/1")
      .expect(200)
      .end((err, res) => {
        if (!!err) throw err;
        expect(res.body).has.property("total");
        expect(res.body).has.property("taxes");
        expect(res.body).has.property("items");
        expect(res.body.items).to.be.a("array");
        expect(res.body.status).to.be.a("string");
        done();
      });
  });

  it("should be check '/products' GET", (done) => {
    server
      .get("/products")
      .expect(200)
      .end((err, res) => {
        if (!!err) throw err;
        expect(res.body).to.be.a("array");
        done();
      });
  });
});

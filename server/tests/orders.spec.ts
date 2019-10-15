import * as supertest from "supertest";
import { expect } from "chai";
import { environment } from "../environments/environment";

const { BASE_URL, ORDER, ORDERS } = environment.API;
const server = supertest.agent(BASE_URL);
const id = "62669514";

describe("Testing Orders endpoints", () => {
  it("should be check '/orders' GET", (done) => {
    server
      .get(ORDERS)
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
      .get(ORDER + id)
      .expect(200)
      .end((err, res) => {
        if (!!err) throw err;
        expect(res.body).has.property("data");
        expect(res.body.data).has.property("total");
        expect(res.body.data).has.property("taxes");
        expect(res.body.data).has.property("items");
        expect(res.body.data.items).to.be.a("array");
        expect(res.body.data.status).to.be.a("string");
        done();
      });
  });
});

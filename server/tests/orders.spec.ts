import * as supertest from "supertest";
import { expect } from "chai";
import { stub, restore } from "sinon";
import app from "../app";
import { model } from "../routes/orders";
import { environment } from "../environments/environment";

const { ORDERS } = environment.API;

const mockOrders = [
  {
    id: 1,
    status: "pending",
    total: 126.98,
    taxes: 10,
    created_at: "2019-10-15T05:07:48.000Z",
    count: 3
  },
  {
    id: 2,
    status: "pending",
    total: 17263.05,
    taxes: 2250.8,
    created_at: "2019-10-15T05:08:10.000Z",
    count: 2
  }
];
const mockOrder = {
  items: [
    {
      id: 1,
      name: "16lb bag of Skittles",
      price: 16,
      quantity: 1
    },
    {
      id: 2,
      name: "Walkman",
      price: 99.99,
      quantity: 1
    },
    {
      id: 3,
      name: "bag of microwave Popcorn",
      price: 0.99,
      quantity: 1
    }
  ],
  total: 126.98,
  taxes: 10,
  status: "pending"
};
const mockOrderUpdate = {
  message: "ok",
  fieldCount: 1,
  affectedRows: 1,
  insertId: 1,
  serverStatus: 200,
  warningCount: 0,
  protocol41: false,
  changedRows: 1
};

describe("ORDERS", () => {
  describe("API", () => {
    const server = supertest(app);
    const id = 1;

    beforeEach(() => {
      stub(model, "getOrders").resolves(mockOrders);
      stub(model, "getOrderById").resolves(mockOrder);
      stub(model, "updateOrder").resolves(mockOrderUpdate);
      stub(model, "addNewOrder").resolves(mockOrderUpdate);
    });

    afterEach(() => {
      restore();
    });

    it("Check method: '/orders' GET", (done) => {
      server
        .get(ORDERS)
        .expect(200)
        .end((err, res) => {
          if (!!err) throw err;
          expect(res.body)
            .has.property("data")
            .to.be.a("array");
          expect(res.body.data).to.deep.equal(mockOrders);
          done();
        });
    });

    it("Check method: '/order/:id' GET", (done) => {
      server
        .get(ORDERS + id)
        .expect(200)
        .end((err, res) => {
          if (!!err) throw err;
          expect(res.body)
            .has.property("data")
            .to.be.a("object");
          expect(res.body.data).deep.equal(mockOrder);
          done();
        });
    });

    it("Check method: '/orders/:id' PUT (updating status)", (done) => {
      server
        .put(ORDERS + id)
        .expect(200)
        .end((err, res) => {
          if (!!err) throw err;
          expect(res.body).has.property("message", "ok");
          expect(res.body).has.property("status", 200);
          done();
        });
    });

    it("Check method: '/orders/:id' POST (create new order)", (done) => {
      server
        .post(ORDERS)
        .expect(200)
        .end((err, res) => {
          if (!!err) throw err;
          expect(res.body).has.property("message", "ok");
          expect(res.body).has.property("status", 200);
          done();
        });
    });
  });
});

import * as express from "express";
import { Orders } from "types/orders";
import { ResponseItems, ResponseServer } from "types/index";

class OrderController {
  private model: Orders.Model;
  constructor(model) {
    this.model = model;
  }

  getOrders = async (req: express.Request, res: express.Response, next) => {
    try {
      const orders = await this.model.getOrders();
      const result: ResponseItems<Orders.Items[]> = {
        data: orders
      };
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  getOrderById = async (req: express.Request, res: express.Response, next) => {
    try {
      const { id } = req.params;
      const orders = await this.model.getOrderById(id);
      const result: ResponseItems<Orders.OrderProducts> = {
        data: orders
      };
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  addNewOrder = async (req: express.Request, res: express.Response, next) => {
    try {
      const { message, serverStatus } = await this.model.addNewOrder(req.body);
      const result: ResponseServer = {
        message,
        status: serverStatus
      };
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  updateOrder = async (req: express.Request, res: express.Response, next) => {
    try {
      const {
        body: { status },
        params: { id }
      } = req;

      const { message, serverStatus } = await this.model.updateOrder(status, id);
      const result: ResponseServer = {
        message,
        status: serverStatus
      };
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default OrderController;

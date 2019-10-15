import { Request, Response } from "express";
import { Orders } from "interfaces/orders";
import { ResponseItems, ResponseServer } from "interfaces/index";

class OrderController {
  private model: Orders.Model;
  constructor(model) {
    this.model = model;
  }

  getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.model.getOrders();
      const result: ResponseItems<Orders.Items[]> = {
        data: orders
      };
      res.json(result);
    } catch (err) {
      throw err;
    }
  };

  getOrderById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const orders = await this.model.getOrderById(id);
      const result: ResponseItems<Orders.OrderProducts> = {
        data: orders
      };
      res.json(result);
    } catch (err) {
      throw err;
    }
  };

  addNewOrder = async (req: Request, res: Response) => {
    try {
      await this.model.addNewOrder(req.body);
      const result: ResponseServer = {
        message: "New order was created",
        status: 200
      };
      res.json(result);
    } catch (err) {
      throw err;
    }
  };

  updateOrder = async (req: Request, res: Response) => {
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
      throw err;
    }
  };
}

export default OrderController;

import { Request, Response } from "express";
import { Cart } from "interfaces/cart";

class CartController {
  private model: Cart.Model;
  constructor(model) {
    this.model = model;
  }

  getTotals = async (req: Request, res: Response) => {
    try {
      const result: Cart.Item = await this.model.getTotals(req.body);
      res.json(result);
    } catch (err) {
      throw err;
    }
  };
}

export default CartController;

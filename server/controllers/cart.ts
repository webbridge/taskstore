import { Request, Response } from "express";
import { Cart } from "interfaces/cart";

class CartController {
  private model: Cart.Model;
  constructor(model) {
    this.model = model;
  }

  getTotals = async (req: Request, res: Response) => {
    try {
      const data = await this.model.getTotals(req.body);
      const result: Cart.Item = {
        taxes: data.reduce((acc, item) => acc + item.taxes, 0),
        total: data.reduce((acc, item) => acc + item.total, 0)
      };

      res.json(result);
    } catch (err) {
      throw err;
    }
  };
}

export default CartController;

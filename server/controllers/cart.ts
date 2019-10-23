import { Request, Response } from "express";
import { Cart } from "interfaces/cart";
import { getTotals } from "../services/cart";

class CartController {
  private model: Cart.Model;
  constructor(model) {
    this.model = model;
  }

  getTotals = async (req: Request, res: Response) => {
    const {
      body: { items }
    } = req;

    try {
      const ids = items.map(({ id }) => id);

      const data: Cart.ResponseTotals[] = await this.model.getTotals(ids);
      const result: Cart.Total = getTotals(items, data);

      res.json(result);
    } catch (err) {
      throw err;
    }
  };
}

export default CartController;

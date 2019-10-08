import * as express from "express";
import { Products } from "types/products";
import { ResponseItems } from "types/index";

class ProductsController {
  private model: Products.Model;
  constructor(model) {
    this.model = model;
  }

  getProducts = async (req: express.Request, res: express.Response, next) => {
    try {
      const products = await this.model.getProducts();
      const result: ResponseItems<Products.Item[]> = {
        data: products
      };
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default ProductsController;

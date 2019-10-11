import { Request, Response } from "express";
import { Products } from "types/products";
import { ResponseItems } from "types/index";

class ProductsController {
  private model: Products.Model;
  constructor(model) {
    this.model = model;
  }

  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.model.getProducts();
      const result: ResponseItems<Products.Item[]> = {
        data: products
      };
      res.json(result);
    } catch (err) {
      throw err;
    }
  };
}

export default ProductsController;

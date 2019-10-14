import { Request, Response } from "express";
// import { Products } from "interfaces/products";
// import { ResponseItems } from "interfaces/index";

class TaxesController {
  private model;
  constructor(model) {
    this.model = model;
  }

  getTaxes = async (req: Request, res: Response) => {
    try {
      const taxes = await this.model.getTaxes(req.body);
      const result = {
        data: taxes
      };
      res.json(result);
    } catch (err) {
      throw err;
    }
  };
}

export default TaxesController;

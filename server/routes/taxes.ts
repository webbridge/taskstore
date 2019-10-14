import * as express from "express";
import TaxesController from "../controllers/taxes";
import TaxesModel from "../models/taxes";
// import { environment } from "../environments/environment";

// const { PRODUCTS } = environment.API;
const router = express.Router();
const model = new TaxesModel();
const controller = new TaxesController(model);

router.get("/taxes", controller.getTaxes);

export default router;

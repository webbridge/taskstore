import * as express from "express";
import ProductsController from "../controllers/products";
import ProductsModel from "../models/products";
import { environment } from "../environments/environment";

const { PRODUCTS } = environment.API;
const router = express.Router();
const model = new ProductsModel();
const controller = new ProductsController(model);

router.get(PRODUCTS, controller.getProducts);

export default router;

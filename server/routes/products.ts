import * as express from "express";
import ProductsController from "../controllers/products";
import ProductsModel from "../models/products";
import { environment } from "../config";

const { PRODUCTS } = environment.API;
const router = express.Router();
const model = new ProductsModel();
const controller = new ProductsController(model);

router.get(PRODUCTS, controller.getProducts);

export default router;

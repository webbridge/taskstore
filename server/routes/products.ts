import * as express from "express";
import ProductsController from "../controllers/products";
import ProductsModel from "../models/products";

const router = express.Router();
const model = new ProductsModel();
const controller = new ProductsController(model);

router.get("/products", controller.getProducts);

export default router;

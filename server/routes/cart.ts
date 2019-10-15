import * as express from "express";
import CartController from "../controllers/cart";
import CartModel from "../models/cart";
import { environment } from "../environments/environment";

const { CART_TOTALS } = environment.API;
const router = express.Router();
const model = new CartModel();
const controller = new CartController(model);

router.post(CART_TOTALS, controller.getTotals);

export default router;

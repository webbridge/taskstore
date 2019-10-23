import * as express from "express";
import OrdersController from "../controllers/orders";
import OrdersModel from "../models/orders";
import { environment } from "../environments/environment";

const { ORDERS } = environment.API;
const router = express.Router();
export const model = new OrdersModel();
const controller = new OrdersController(model);

// GET orders
router.get(ORDERS, controller.getOrders);

// GET order
router.get(`${ORDERS}:id`, controller.getOrderById);

// POST order (add new order)
router.post(ORDERS, controller.addNewOrder);

// UPDATE order status
router.put(`${ORDERS}:id`, controller.updateOrder);

export default router;

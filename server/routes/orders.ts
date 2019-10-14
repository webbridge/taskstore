import * as express from "express";
import OrdersController from "../controllers/orders";
import OrdersModel from "../models/orders";
import { environment } from "../environments/environment";

const { ORDER, ORDERS } = environment.API;
const router = express.Router();
const model = new OrdersModel();
const controller = new OrdersController(model);

// GET orders
router.get(ORDERS, controller.getOrders);

// GET order
router.get(`${ORDER}:id`, controller.getOrderById);

// POST order (add new order)
router.post(ORDER, controller.addNewOrder);

// UPDATE order status
router.put(`${ORDER}:id`, controller.updateOrder);

export default router;

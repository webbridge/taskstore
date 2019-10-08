import * as express from "express";
import OrdersController from "../controllers/orders";
import OrdersModel from "../models/orders";

const router = express.Router();
const model = new OrdersModel();
const controller = new OrdersController(model);

// GET orders
router.get("/orders", controller.getOrders);

// GET order
router.get("/order/:id", controller.getOrderById);

// POST order (add new order)
router.post("/order", controller.addNewOrder);

// UPDATE order status
router.put("/order/:id", controller.updateOrder);

export default router;

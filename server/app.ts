import * as express from "express";
import * as cors from "cors";
import products from "./routes/products";
import orders from "./routes/orders";
import cart from "./routes/cart";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(
  cors({
    "Access-Control-Allow-Origin": "*"
  })
);

// Routes
app.use(products);
app.use(orders);
app.use(cart);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

export default app;

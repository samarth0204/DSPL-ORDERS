import express from "express";
import orderRoutes from "./routes/order.route";
import fulfillmentRoutes from "./routes/fulfillment.route";

const app = express();
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/fulfillment", fulfillmentRoutes);

export default app;

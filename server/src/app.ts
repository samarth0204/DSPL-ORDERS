import express from "express";
import orderRoutes from "./routes/order.route";
import fulfillmentRoutes from "./routes/fulfillment.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/orders", orderRoutes);
app.use("/api/fulfillment", fulfillmentRoutes);

export default app;

import express from "express";
import orderRoutes from "./routes/order.route";

const app = express();
app.use(express.json());

app.use("/api/orders", orderRoutes);

export default app;

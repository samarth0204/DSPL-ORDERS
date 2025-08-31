import express from "express";
import orderRoutes from "./routes/order.route";
import fulfillmentRoutes from "./routes/fulfillment.route";
import userRoutes from "./routes/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/orders", orderRoutes);
app.use("/api/fulfillment", fulfillmentRoutes);
app.use("/api/users", userRoutes);

export default app;

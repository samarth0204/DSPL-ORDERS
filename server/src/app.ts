import express from "express";
import orderRoutes from "./routes/order.route";
import fulfillmentRoutes from "./routes/fulfillment.route";
import userRoutes from "./routes/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import notificationRoutes from "./routes/notification.route";
import reportRoutes from "./routes/reports.route";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dspl-orders-1i1.pages.dev",
      "https://order.divydaminispices.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/orders", orderRoutes);
app.use("/api/fulfillment", fulfillmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/reports", reportRoutes);

export default app;

import express from "express";
import orderRoutes from "./routes/order.route";
import fulfillmentRoutes from "./routes/fulfillment.route";
import userRoutes from "./routes/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

app.use("/api/orders", orderRoutes);
app.use("/api/fulfillment", fulfillmentRoutes);
app.use("/api/users", userRoutes);

export default app;

import express from "express";
import {
  addOrder,
  getAllOrders,
  getAllOrdersBySalesman,
} from "../controllers/order.controller";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/salesman", getAllOrdersBySalesman);
router.post("/", addOrder);

export default router;

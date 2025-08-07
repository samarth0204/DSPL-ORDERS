import express from "express";
import {
  addOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getAllOrdersBySalesman,
} from "../controllers/order.controller";

const router = express.Router();

router.get("/all", getAllOrders);
router.get("/", getAllOrdersBySalesman);
router.post("/", addOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", editOrder);

export default router;

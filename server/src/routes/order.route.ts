import express from "express";
import {
  addOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getAllOrdersBySalesman,
} from "../controllers/order.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/all",
  authenticateJWT,
  authorizeRoles(["ADMIN", "FULFILLMENT"]),
  getAllOrders
);
router.get(
  "/",
  authenticateJWT,
  authorizeRoles(["ADMIN", "SALESMAN"]),
  getAllOrdersBySalesman
);
router.post("/", authenticateJWT, authorizeRoles(["SALESMAN"]), addOrder);
router.delete("/:id", authenticateJWT, authorizeRoles(["ADMIN"]), deleteOrder);
router.put("/:id", authenticateJWT, authorizeRoles(["ADMIN"]), editOrder);

export default router;

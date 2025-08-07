import express from "express";
import {
  addFulfillment,
  deleteFulfillment,
  editFulfillment,
  getAllFulfillments,
} from "../controllers/fulfillment.controller";

const router = express.Router();

//this need to have groupBy date and orderId and sort by amount and date and status of paid and pending
router.get("/all", getAllFulfillments);
router.post("/", addFulfillment);
router.put("/:id", editFulfillment);
router.delete("/:id", deleteFulfillment);

export default router;

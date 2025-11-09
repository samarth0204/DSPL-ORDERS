import express from "express";
import {
  getAllReports,
  createReport,
  getDailyReport,
  getReportsByUser,
  editReport,
  deleteReport,
  applyLeave,
} from "../controllers/report.controller";

const router = express.Router();

// Create a new daily report
router.post("/", createReport);

// Get all reports
router.get("/", getAllReports);

// Apply for a leave
router.post("/apply-leave", applyLeave);

// Get daily reports for a specific date (all users)
router.get("/daily/:date", getDailyReport);

// Get all reports for a specific user
router.get("/user/:id", getReportsByUser);

// Edit/update a report by ID
router.put("/:id", editReport);

// Delete a report by ID
router.delete("/:id", deleteReport);

export default router;

import { Request, Response } from "express";
import prisma from "../config/prisma";
import { parseFloatOrNull, parseIntOrNull } from "../utils/parseUtills";

/**
 * Get all daily reports
 */
export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.dailyReport.findMany({
      include: { user: { select: { username: true, contactNumber: true } } },
      orderBy: { date: "desc" },
    });

    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Create a new daily report (MORNING or EVENING)
 */
export const createReport = async (req: Request, res: Response) => {
  try {
    // Accept either dbName or DBName from client to be forgiving
    const {
      userId,
      date,
      reportType,
      hq,
      dbName,
      DBName,
      town,
      beat,
      tc,
      pc,
      ctcWeight,
      ctcValue,
      atcWeight,
      atcValue,
      vapPacket,
      vapValue,
      totalWeight,
      totalValue,
      remarks,
    } = req.body;

    // Basic required validation
    if (
      !userId ||
      !date ||
      !reportType ||
      !hq ||
      !(dbName || DBName) ||
      !town
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields. Required: userId, date, reportType, hq, dbName (or DBName), town",
      });
    }

    const normalizedType = String(reportType).toUpperCase();
    if (normalizedType !== "MORNING" && normalizedType !== "EVENING") {
      return res.status(400).json({
        success: false,
        error: "Invalid reportType. Allowed: MORNING, EVENING",
      });
    }

    // Parse/validate date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid date format" });
    }

    // Normalize DB name key
    const finalDbName = dbName ?? DBName;

    // Parse numeric fields safely (throwing helpful errors if invalid)
    try {
      // ints
      const tcInt = parseIntOrNull(tc, "tc");
      const pcInt = parseIntOrNull(pc, "pc");
      const vapPacketInt = parseIntOrNull(vapPacket, "vapPacket");

      // floats
      const ctcWeightF = parseFloatOrNull(ctcWeight, "ctcWeight");
      const ctcValueF = parseFloatOrNull(ctcValue, "ctcValue");
      const atcWeightF = parseFloatOrNull(atcWeight, "atcWeight");
      const atcValueF = parseFloatOrNull(atcValue, "atcValue");
      const vapValueF = parseFloatOrNull(vapValue, "vapValue");
      const totalWeightF = parseFloatOrNull(totalWeight, "totalWeight");
      const totalValueF = parseFloatOrNull(totalValue, "totalValue");

      // Build base payload
      const baseData: any = {
        userId,
        date: parsedDate,
        reportType: normalizedType,
        hq,
        dbName: finalDbName,
        town,
        beat: beat ?? null,
      };

      if (normalizedType === "EVENING") {
        Object.assign(baseData, {
          tc: tcInt,
          pc: pcInt,
          ctcWeight: ctcWeightF,
          ctcValue: ctcValueF,
          atcWeight: atcWeightF,
          atcValue: atcValueF,
          vapPacket: vapPacketInt,
          vapValue: vapValueF,
          totalWeight: totalWeightF,
          totalValue: totalValueF,
          remarks: remarks ?? null,
        });
      }

      // create
      const newReport = await prisma.dailyReport.create({
        data: baseData,
      });

      return res.status(201).json({
        success: true,
        message: `${normalizedType} report created`,
        data: newReport,
      });
    } catch (parsingError: any) {
      // parseInt/parseFloat helpers throw Errors with friendly messages
      return res.status(400).json({
        success: false,
        error: parsingError.message ?? "Invalid numeric input",
      });
    }
  } catch (error: any) {
    if (error?.code === "P2002") {
      return res.status(409).json({
        success: false,
        error: "Report already exists for this user, date and type.",
      });
    }
    console.error("Error creating report:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

/**
 * Get reports for a specific date (for all users)
 */
export const getDailyReport = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const reportDate = new Date(date);

    // Match by date only (ignore time)
    const reports = await prisma.dailyReport.findMany({
      where: {
        date: {
          gte: new Date(reportDate.setHours(0, 0, 0, 0)),
          lt: new Date(reportDate.setHours(23, 59, 59, 999)),
        },
      },
      include: { user: { select: { username: true } } },
    });

    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching daily report:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Get reports for a specific user (salesman)
 */
export const getReportsByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch all reports for user, ordered by date descending
    const reports = await prisma.dailyReport.findMany({
      where: { userId: id },
      orderBy: { date: "desc" },
    });

    // Group reports by date (and pair MORNING + EVENING)
    const groupedReports: Record<string, { MORNING?: any; EVENING?: any }> = {};

    reports.forEach((report) => {
      const dateKey = report.date.toISOString().split("T")[0]; // 'YYYY-MM-DD'

      if (!groupedReports[dateKey]) {
        groupedReports[dateKey] = {};
      }

      if (report.reportType === "MORNING") {
        groupedReports[dateKey].MORNING = report;
      } else if (report.reportType === "EVENING") {
        groupedReports[dateKey].EVENING = report;
      }
    });

    // Convert to array form (sorted by date)
    const result = Object.entries(groupedReports)
      .map(([date, reports]) => ({
        date,
        MORNING: reports.MORNING || null,
        EVENING: reports.EVENING || null,
      }))
      .sort((a, b) => (a.date < b.date ? 1 : -1)); // latest first

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user reports:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

/**
 * Edit a daily report
 */
export const editReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      userId,
      date,
      reportType,
      hq,
      dbName,
      town,
      beat,
      tc,
      pc,
      ctcWeight,
      ctcValue,
      atcWeight,
      atcValue,
      vapPacket,
      vapValue,
      totalWeight,
      totalValue,
      remarks,
    } = req.body;

    const updatedReport = await prisma.dailyReport.update({
      where: { id },
      data: {
        userId,
        date: new Date(date),
        reportType,
        hq,
        dbName,
        town,
        beat,
        tc,
        pc,
        ctcWeight,
        ctcValue,
        atcWeight,
        atcValue,
        vapPacket,
        vapValue,
        totalWeight,
        totalValue,
        remarks,
      },
    });

    res.status(200).json({ success: true, data: updatedReport });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Delete a daily report
 */
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.dailyReport.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const applyLeave = async (req: Request, res: Response) => {
  try {
    const { userId, date } = req.body;

    if (!userId || !date) {
      return res
        .status(400)
        .json({ success: false, error: "userId and date are required" });
    }

    const parsedDate = new Date(date);

    // Check if already applied
    const existing = await prisma.dailyReport.findMany({
      where: { userId, date: parsedDate },
    });

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        error: "You already have reports or leave applied for this date.",
      });
    }

    // Common null data
    const nullData = {
      remarks: "Leave Applied",
    };

    // Create both MORNING and EVENING reports
    await prisma.dailyReport.createMany({
      data: [
        {
          userId,
          date: parsedDate,
          reportType: "MORNING",
          ...nullData,
        },
        {
          userId,
          date: parsedDate,
          reportType: "EVENING",
          ...nullData,
        },
      ],
    } as any);

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
    });
  } catch (error) {
    console.error("Error applying leave:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

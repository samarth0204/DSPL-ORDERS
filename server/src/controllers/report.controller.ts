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

// 🧩 Utility: Convert any date string → start & end of day (UTC)
const getDateRangeUTC = (dateString: string) => {
  const d = new Date(dateString);
  const startOfDay = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0)
  );
  const endOfDay = new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );
  return { startOfDay, endOfDay };
};

export const createReport = async (req: Request, res: Response) => {
  try {
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

    if (!userId || !date || !reportType || !hq || !dbName || !town) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields. Required: userId, date, reportType, hq, dbName, town",
      });
    }

    const normalizedType = String(reportType).toUpperCase();
    if (normalizedType !== "MORNING" && normalizedType !== "EVENING") {
      return res.status(400).json({
        success: false,
        error: "Invalid reportType. Allowed: MORNING, EVENING",
      });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid date format" });
    }

    // ✅ Check for duplicates before creation
    const { startOfDay, endOfDay } = getDateRangeUTC(date);
    const existingReport = await prisma.dailyReport.findFirst({
      where: {
        userId,
        reportType: normalizedType,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingReport) {
      return res.status(409).json({
        success: false,
        error: "Leave applied!",
      });
    }

    // Parse numbers safely
    const tcInt = parseIntOrNull(tc, "tc");
    const pcInt = parseIntOrNull(pc, "pc");
    const vapPacketInt = parseIntOrNull(vapPacket, "vapPacket");

    const ctcWeightF = parseFloatOrNull(ctcWeight, "ctcWeight");
    const ctcValueF = parseFloatOrNull(ctcValue, "ctcValue");
    const atcWeightF = parseFloatOrNull(atcWeight, "atcWeight");
    const atcValueF = parseFloatOrNull(atcValue, "atcValue");
    const vapValueF = parseFloatOrNull(vapValue, "vapValue");
    const totalWeightF = parseFloatOrNull(totalWeight, "totalWeight");
    const totalValueF = parseFloatOrNull(totalValue, "totalValue");

    const baseData: any = {
      userId,
      date: parsedDate,
      reportType: normalizedType,
      hq,
      dbName,
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

    const newReport = await prisma.dailyReport.create({
      data: baseData,
    });

    return res.status(201).json({
      success: true,
      message: `${normalizedType} report created successfully.`,
      data: newReport,
    });
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
    const { startOfDay, endOfDay } = getDateRangeUTC(date);
    const reports = await prisma.dailyReport.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
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
    const existing = await prisma.dailyReport.findMany({
      where: {
        userId,
        date,
      },
    });

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        error: "You already have reports or leave applied for this date.",
      });
    }

    await prisma.dailyReport.createMany({
      data: [
        {
          userId,
          date,
          reportType: "MORNING",
          remarks: "Leave Applied",
        },
        {
          userId,
          date,
          reportType: "EVENING",
          remarks: "Leave Applied",
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

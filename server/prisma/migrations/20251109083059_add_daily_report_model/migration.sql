-- CreateEnum
CREATE TYPE "public"."ReportType" AS ENUM ('MORNING', 'EVENING');

-- CreateTable
CREATE TABLE "public"."DailyReport" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reportType" "public"."ReportType" NOT NULL,
    "hq" TEXT NOT NULL,
    "dbName" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "beat" TEXT,
    "tc" INTEGER,
    "pc" INTEGER,
    "ctcWeight" DOUBLE PRECISION,
    "ctcValue" DOUBLE PRECISION,
    "atcWeight" DOUBLE PRECISION,
    "atcValue" DOUBLE PRECISION,
    "vapPacket" TEXT,
    "vapValue" DOUBLE PRECISION,
    "totalWeight" DOUBLE PRECISION,
    "totalValue" DOUBLE PRECISION,
    "remarks" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyReport_userId_date_reportType_key" ON "public"."DailyReport"("userId", "date", "reportType");

-- AddForeignKey
ALTER TABLE "public"."DailyReport" ADD CONSTRAINT "DailyReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

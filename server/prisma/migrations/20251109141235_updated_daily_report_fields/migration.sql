/*
  Warnings:

  - You are about to alter the column `ctcWeight` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `ctcValue` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `atcWeight` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `atcValue` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - The `vapPacket` column on the `DailyReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `vapValue` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalWeight` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalValue` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."DailyReport" ALTER COLUMN "ctcWeight" SET DATA TYPE INTEGER,
ALTER COLUMN "ctcValue" SET DATA TYPE INTEGER,
ALTER COLUMN "atcWeight" SET DATA TYPE INTEGER,
ALTER COLUMN "atcValue" SET DATA TYPE INTEGER,
DROP COLUMN "vapPacket",
ADD COLUMN     "vapPacket" INTEGER,
ALTER COLUMN "vapValue" SET DATA TYPE INTEGER,
ALTER COLUMN "totalWeight" SET DATA TYPE INTEGER,
ALTER COLUMN "totalValue" SET DATA TYPE INTEGER;

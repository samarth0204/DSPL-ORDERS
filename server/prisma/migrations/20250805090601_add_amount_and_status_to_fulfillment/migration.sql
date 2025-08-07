/*
  Warnings:

  - Added the required column `amount` to the `Fulfillment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."FulfillmentStatus" AS ENUM ('PAID', 'PENDING');

-- AlterTable
ALTER TABLE "public"."Fulfillment" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "public"."FulfillmentStatus" NOT NULL DEFAULT 'PENDING';

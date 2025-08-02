/*
  Warnings:

  - You are about to drop the column `salesManName` on the `Order` table. All the data in the column will be lost.
  - Added the required column `salesmanId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'SALESMAN');

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "salesManName",
ADD COLUMN     "salesmanId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

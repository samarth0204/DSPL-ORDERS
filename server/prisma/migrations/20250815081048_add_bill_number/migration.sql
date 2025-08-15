/*
  Warnings:

  - You are about to drop the column `name` on the `FulfilledProduct` table. All the data in the column will be lost.
  - You are about to drop the column `orderBy` on the `FulfilledProduct` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `FulfilledProduct` table. All the data in the column will be lost.
  - Added the required column `productId` to the `FulfilledProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billNumber` to the `Fulfillment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Fulfillment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."FulfilledProduct" DROP COLUMN "name",
DROP COLUMN "orderBy",
DROP COLUMN "size",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Fulfillment" ADD COLUMN     "billNumber" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."FulfilledProduct" ADD CONSTRAINT "FulfilledProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "public"."FulfilledProduct" DROP CONSTRAINT "FulfilledProduct_fulfillmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FulfilledProduct" DROP CONSTRAINT "FulfilledProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Fulfillment" DROP CONSTRAINT "Fulfillment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_orderId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fulfillment" ADD CONSTRAINT "Fulfillment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FulfilledProduct" ADD CONSTRAINT "FulfilledProduct_fulfillmentId_fkey" FOREIGN KEY ("fulfillmentId") REFERENCES "public"."Fulfillment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FulfilledProduct" ADD CONSTRAINT "FulfilledProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

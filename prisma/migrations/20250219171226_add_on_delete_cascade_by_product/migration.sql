-- DropForeignKey
ALTER TABLE "product_taxes" DROP CONSTRAINT "product_taxes_productId_fkey";

-- AddForeignKey
ALTER TABLE "product_taxes" ADD CONSTRAINT "product_taxes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

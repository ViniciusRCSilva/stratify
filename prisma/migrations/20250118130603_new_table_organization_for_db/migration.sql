/*
  Warnings:

  - The values [PENDING] on the enum `ORDER_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `updatedAt` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `inventories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitCost` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ORDER_STATUS_new" AS ENUM ('PENDING_PAYMENT', 'WAITING_CONFIRMATION', 'CONFIRMED', 'CANCELLED', 'COMPLETED');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "ORDER_STATUS_new" USING ("status"::text::"ORDER_STATUS_new");
ALTER TYPE "ORDER_STATUS" RENAME TO "ORDER_STATUS_old";
ALTER TYPE "ORDER_STATUS_new" RENAME TO "ORDER_STATUS";
DROP TYPE "ORDER_STATUS_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_productId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_clientId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_clientId_fkey";

-- DropIndex
DROP INDEX "products_category_idx";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "clientId",
DROP COLUMN "createdAt",
DROP COLUMN "discount",
DROP COLUMN "dueDate",
DROP COLUMN "status",
DROP COLUMN "tax",
DROP COLUMN "updatedAt",
ALTER COLUMN "paymentMethod" DROP DEFAULT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "updatedAt",
ADD COLUMN     "paymentMethod" "PAYMENT_METHOD" NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "createdAt",
DROP COLUMN "status",
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unitCost" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "inventories";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "INVOICE_STATUS";

-- DropEnum
DROP TYPE "PRODUCT_STATUS";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" "PLAN" NOT NULL DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_orderId_key" ON "invoices"("orderId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

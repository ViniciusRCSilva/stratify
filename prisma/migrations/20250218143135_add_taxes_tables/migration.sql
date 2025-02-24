-- CreateTable
CREATE TABLE "Tax" (
    "id" TEXT NOT NULL,
    "csll" DOUBLE PRECISION NOT NULL,
    "irrf" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_taxes" (
    "id" TEXT NOT NULL,
    "icms" DOUBLE PRECISION NOT NULL,
    "ipi" DOUBLE PRECISION NOT NULL,
    "pis" DOUBLE PRECISION NOT NULL,
    "cofins" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product_taxes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_taxes_productId_key" ON "product_taxes"("productId");

-- AddForeignKey
ALTER TABLE "product_taxes" ADD CONSTRAINT "product_taxes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

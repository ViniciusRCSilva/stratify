import { Prisma, PRODUCT_STATUS } from "@prisma/client";
import { db } from "../_lib/prisma";
import { getInventoryByProductId } from "./inventory";

/* Cria um produto */
export const createProduct = async (data: Prisma.ProductCreateInput) => {
    return db.product.create({ data: data });
};

/* Retorna todos os produtos */
export const getAllProducts = async () => {
    return db.product.findMany();
};

/* Retorna um produto pelo ID */
export const getProductById = async (id: string) => {
    return db.product.findUnique({
        where: { id },
        include: {
            inventory: true
        }
    });
};

/* Atualiza um produto pelo ID */
export const updateProduct = async (
    id: string,
    data: Prisma.ProductUpdateInput,
) => {
    return db.product.update({ where: { id }, data: data });
};

/* Deleta um produto pelo ID */
export const deleteProduct = async (id: string) => {
    /* Quando o produto for deletado, deleta-se seu inventário automaticamente (onDelete: Cascade) */
    return db.product.delete({ where: { id } });
};

/* Atualiza o status de um produto com base em sua quantidade em estoque */
export const updateProductStatusBasedOnStock = async (productId: string) => {
    const inventory = await getInventoryByProductId(productId);

    if (!inventory) return;

    /* Define o status do produto com base na quantidade em estoque */
    const status = inventory.stockQuantity > 0 ? PRODUCT_STATUS.IN_STOCK : PRODUCT_STATUS.OUT_OF_STOCK;

    return db.product.update({
        where: { id: productId },
        data: { status }
    });
};

/* Retorna todos os produtos com suas vendas */
export const getProductsWithSales = async () => {
    const products = await db.product.findMany({
        include: {
            orderItems: true,
            inventory: {
                select: {
                    stockQuantity: true
                }
            }
        }
    });

    return products.map(product => ({
        id: product.id,
        productName: product.name,
        price: product.unitPrice,
        totalSales: product.orderItems.reduce((total, item) => total + item.quantity, 0),
        stock: product.inventory[0]?.stockQuantity ?? 0,
        status: product.status === PRODUCT_STATUS.IN_STOCK ? "inStock" : "outOfStock"
    }));
}
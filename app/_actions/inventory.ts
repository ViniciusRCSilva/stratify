import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

/* Cria um inventário */
export const createInventory = async (data: Prisma.InventoryCreateInput) => {
    return db.inventory.create({ data: data });
};

/* Retorna todo o inventário */
export const getAllInventory = async () => {
    const inventory = await db.inventory.findMany(
        {
            include: {
                product: true,
            }
        }
    );

    const alertStock = (stockQuantity: number) => {
        if (stockQuantity === 0) return "destructive";
        if (stockQuantity <= 30) return "warning";
        return "success";
    }

    return inventory.map(inventory => ({
        id: inventory.id,
        productName: inventory.product.name,
        category: inventory.product.category,
        unitCost: inventory.unitCost,
        stockQuantity: inventory.stockQuantity,
        stockStatus: alertStock(inventory.stockQuantity),
        lastRestockedAt: inventory.lastRestockedAt,
        location: inventory.location,
    }));
};

/* Retorna o inventário de um produto */
export const getInventoryByProductId = async (productId: string) => {
    return db.inventory.findFirst({ where: { productId } });
};

/* Atualiza o inventário de um produto */
export const updateInventory = async (inventoryId: string, data: Prisma.InventoryUpdateInput) => {
    return db.inventory.update({ where: { id: inventoryId }, data: data });
};
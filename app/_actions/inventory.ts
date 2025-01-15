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

    const alertStock = await db.inventory.findMany({
        where: {
            stockQuantity: {
                lte: 30
            }
        }
    });

    return inventory.map(inventory => ({
        id: inventory.id,
        productName: inventory.product.name,
        unitCost: inventory.unitCost,
        stockQuantity: inventory.stockQuantity,
        alertStock: alertStock.find(alert => alert.id === inventory.id) ? true : false,
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
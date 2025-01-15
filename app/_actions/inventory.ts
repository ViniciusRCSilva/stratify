import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

/* Cria um inventário */
export const createInventory = async (data: Prisma.InventoryCreateInput) => {
    return db.inventory.create({ data: data });
};

/* Retorna todo o inventário */
export const getAllInventory = async () => {
    return db.inventory.findMany();
};

/* Retorna o inventário de um produto */
export const getInventoryByProductId = async (productId: string) => {
    return db.inventory.findFirst({ where: { productId } });
};

/* Atualiza o inventário de um produto */
export const updateInventory = async (inventoryId: string, data: Prisma.InventoryUpdateInput) => {
    return db.inventory.update({ where: { id: inventoryId }, data: data });
};
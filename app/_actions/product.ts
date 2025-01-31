import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

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
    });
};

/* Retorna todos os produtos com suas vendas */
export const getProductsWithOrders = async () => {
    const products = await db.product.findMany({
        include: {
            orderItem: {
                include: {
                    order: true
                }
            }
        },
    });

    const productsWithOrders = products.map((product) => {
        const ordersQuantity = product.orderItem.length;

        let stockStatus: "destructive" | "warning" | "success";
        if (product.stock === 0) {
            stockStatus = "destructive";
        } else if (product.stock <= 30) {
            stockStatus = "warning";
        } else {
            stockStatus = "success";
        }

        return {
            ...product,
            ordersQuantity,
            stockStatus
        };
    });

    return productsWithOrders;
};

export const getProductStockValue = async () => {
    const products = await getAllProducts();

    const totalStockValue = products.reduce((acc, product) => acc + (product.unitCost * product.stock), 0);

    return totalStockValue;
}

export const getLenghthOfProducts = async () => {
    const products = await getAllProducts();
    return products.length;
}

export const getLastRestockDate = async () => {
    const products = await getAllProducts();
    return products.sort((a, b) => b.stock - a.stock)[0].updatedAt;
}

export const getLowStockProducts = async () => {
    const products = await getAllProducts();
    return products.filter(product => product.stock <= 30).length;
}

/* Atualiza um produto pelo ID */
export const updateProduct = async (
    id: string,
    data: Prisma.ProductUpdateInput,
) => {
    return db.product.update({ where: { id }, data: data });
};

/* Deleta um produto pelo ID */
export const deleteProduct = async (id: string) => {
    return db.product.delete({ where: { id } });
};
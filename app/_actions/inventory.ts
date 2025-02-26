"use server";

import { db } from "@/app/_lib/prisma"

export async function getStockByLocation(userId: string) {
    const stockByLocation = await db.product.groupBy({
        by: ['location'],
        _sum: {
            stock: true
        },
        where: {
            userId
        }
    })

    return stockByLocation.map(item => ({
        location: item.location,
        totalStock: item._sum.stock || 0
    }))
}

export async function getCostByCategory(userId: string) {
    const costByCategory = await db.product.groupBy({
        by: ['category'],
        _sum: {
            stock: true,
            unitCost: true
        },
        where: {
            userId
        }
    })

    return costByCategory.map(item => ({
        category: item.category,
        totalCost: (item._sum.unitCost || 0) * (item._sum.stock || 0),
    }))
}

export async function getLowStockProducts(userId: string, threshold: number = 30) {
    const products = await db.product.findMany({
        where: {
            userId,
            stock: {
                lte: threshold
            }
        },
        orderBy: {
            stock: 'asc'
        },
        select: {
            name: true,
            stock: true
        }
    })

    return products
}

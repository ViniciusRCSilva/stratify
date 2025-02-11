'use server';

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

/* Cria uma fatura de um pedido */
export const createInvoice = async (data: Prisma.InvoiceCreateInput) => {
    return db.invoice.create({ data });
};

/* Busca todas as faturas */
export const getAllInvoices = async (userId?: string) => {
    return db.invoice.findMany({
        where: {
            userId
        }
    });
};

/* Busca uma fatura pelo ID */
export const getInvoiceById = async (invoiceId: string, userId?: string) => {
    return db.invoice.findUnique({ where: { id: invoiceId, userId } });
};

/* Busca as faturas com pedidos */
export const getInvoicesWithOrders = async (userId?: string) => {
    return db.invoice.findMany({
        where: {
            userId
        },
        include: {
            order: {
                include: {
                    orderItems: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        }
    });
};

/* Busca as vendas de hoje */
export const getTodaySales = async (userId?: string) => {
    return db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
            },
            userId
        },
    });
};

/* Busca o total de vendas de hoje */
export const getTotalTodaySales = async (userId?: string) => {
    const todaySales = await getTodaySales(userId);
    const todayTotal = todaySales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);

    return todayTotal;
};

/* Busca o percentual de crescimento de vendas de hoje em relação ao dia anterior */
export const getTodayPercentageComparison = async (userId?: string) => {
    const lastDaySales = await db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            },
            userId
        }
    });
    const todayTotal = await getTotalTodaySales(userId);

    if (todayTotal === 0) {
        return 0;
    }

    const lastDayTotal = lastDaySales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
    const percentage = ((todayTotal - lastDayTotal) / lastDayTotal) * 100;

    return percentage.toFixed(2);
};

/* Busca o lucro de hoje */
export const getTodayProfit = async (userId?: string) => {
    const todayInvoices = await getTodaySales(userId);
    let totalProfit = 0;

    for (const invoice of todayInvoices) {
        const order = await db.order.findUnique({
            where: { id: invoice.orderId, userId },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (order) {
            /* Calcula o lucro de cada item no pedido */
            const orderProfit = order.orderItems.reduce((profit, item) => {
                const unitPriceWithDiscount = (item.product.unitPrice - (item.product.unitPrice * (item.product.discount / 100)));
                const itemProfit = (item.product.unitCost - unitPriceWithDiscount) * item.quantity;
                return profit + itemProfit;
            }, 0);

            totalProfit += orderProfit;
        }
    }

    return totalProfit;
};

/* Busca o lucro de ontem */
export const getYesterdayProfit = async (userId?: string) => {
    const yesterdayInvoices = await db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            },
            userId
        },
    });
    let totalProfit = 0;

    for (const invoice of yesterdayInvoices) {
        const order = await db.order.findUnique({
            where: { id: invoice.orderId },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (order) {
            /* Calcula o lucro de cada item no pedido */
            const orderProfit = order.orderItems.reduce((profit, item) => {
                const unitPriceWithDiscount = (item.product.unitPrice - (item.product.unitPrice * (item.product.discount / 100)));
                const itemProfit = (item.product.unitCost - unitPriceWithDiscount) * item.quantity;
                return profit + itemProfit;
            }, 0);

            totalProfit += orderProfit;
        }
    }

    return totalProfit;
};

/* Busca a porcentagem de crescimento de lucro de hoje em relação ao dia anterior */
export const getTodayProfitPercentageComparison = async (userId?: string) => {
    const todayProfit = await getTodayProfit(userId);

    if (todayProfit === 0) {
        return 0;
    }

    const yesterdayProfit = await getYesterdayProfit(userId);
    const percentage = ((todayProfit - yesterdayProfit) / yesterdayProfit) * 100;

    return percentage.toFixed(2);
};

/* Busca as vendas do mês atual */
export const getCurrentMonthSales = async (userId?: string) => {
    return db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
            },
            userId
        },
    });
};

/* Busca o total de vendas do mês atual */
export const getTotalCurrentMonthSales = async (userId?: string) => {
    const currentMonthSales = await getCurrentMonthSales(userId);
    const currentMonthTotal = currentMonthSales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);

    return currentMonthTotal;
};

/* Busca o percentual de crescimento do mês atual em relação ao mês anterior */
export const getMonthPercentageComparison = async (userId?: string) => {
    const currentMonthTotal = await getTotalCurrentMonthSales(userId);

    if (currentMonthTotal === 0) {
        return 0;
    }

    const lastMonthSales = await db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
            userId
        },
    });

    const lastMonthTotal = lastMonthSales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
    const percentage = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    return percentage.toFixed(2);
};
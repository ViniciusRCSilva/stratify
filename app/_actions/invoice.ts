import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

/* Cria uma fatura de um pedido */
export const createInvoice = async (data: Prisma.InvoiceCreateInput) => {
    return db.invoice.create({ data });
};

/* Busca todas as faturas */
export const getAllInvoices = async () => {
    return db.invoice.findMany();
};

/* Busca uma fatura pelo ID */
export const getInvoiceById = async (invoiceId: string) => {
    return db.invoice.findUnique({ where: { id: invoiceId } });
};

/* Busca as vendas de hoje */
export const getTodaySales = async () => {
    return db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
            },
        },
    });
};

/* Busca o total de vendas de hoje */
export const getTotalTodaySales = async () => {
    const todaySales = await getTodaySales();
    const todayTotal = todaySales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);

    return todayTotal;
};

/* Busca o percentual de crescimento de vendas de hoje em relação ao dia anterior */
export const getTodayPercentageComparison = async () => {
    const lastDaySales = await db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            },
        },
    });
    const todayTotal = await getTotalTodaySales();

    if (todayTotal === 0) {
        return 0;
    }

    const lastDayTotal = lastDaySales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
    const percentage = ((todayTotal - lastDayTotal) / lastDayTotal) * 100;

    return percentage.toFixed(2);
};

/* Busca o lucro de hoje */
export const getTodayProfit = async () => {
    const todayInvoices = await getTodaySales();
    let totalProfit = 0;

    for (const invoice of todayInvoices) {
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

/* Busca o lucro de ontem */
export const getYesterdayProfit = async () => {
    const yesterdayInvoices = await db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            },
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
export const getTodayProfitPercentageComparison = async () => {
    const todayProfit = await getTodayProfit();

    if (todayProfit === 0) {
        return 0;
    }

    const yesterdayProfit = await getYesterdayProfit();
    const percentage = ((todayProfit - yesterdayProfit) / yesterdayProfit) * 100;

    return percentage.toFixed(2);
};

/* Busca as vendas do mês atual */
export const getCurrentMonthSales = async () => {
    return db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
            },
        },
    });
};

/* Busca o total de vendas do mês atual */
export const getTotalCurrentMonthSales = async () => {
    const currentMonthSales = await getCurrentMonthSales();
    const currentMonthTotal = currentMonthSales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);

    return currentMonthTotal;
};

/* Busca o percentual de crescimento do mês atual em relação ao mês anterior */
export const getMonthPercentageComparison = async () => {
    const currentMonthTotal = await getTotalCurrentMonthSales();

    if (currentMonthTotal === 0) {
        return 0;
    }

    const lastMonthSales = await db.invoice.findMany({
        where: {
            issueDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
        },
    });

    const lastMonthTotal = lastMonthSales.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
    const percentage = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    return percentage.toFixed(2);
};
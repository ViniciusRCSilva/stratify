import {
    getMonthPercentageComparison,
    getTodayPercentageComparison,
    getTodayProfit,
    getTodayProfitPercentageComparison,
    getTotalCurrentMonthSales,
    getTotalTodaySales,
} from "../_actions/invoice";

import {
    getLenghthOfProducts,
    getProductStockValue,
    getLastRestockDate,
    getLowStockProducts,
} from "../_actions/product";

async function getData(userId?: string) {
    const [todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage, lengthOfProducts, totalInventoryValue, lastRestockDate, lowStockProducts] = await Promise.all([
        getTotalTodaySales(userId),
        getTodayPercentageComparison(userId),
        getTodayProfit(userId),
        getTodayProfitPercentageComparison(userId),
        getTotalCurrentMonthSales(userId),
        getMonthPercentageComparison(userId),
        getLenghthOfProducts(userId),
        getProductStockValue(userId),
        getLastRestockDate(userId),
        getLowStockProducts(userId),
    ]);

    return { todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage, lengthOfProducts, totalInventoryValue, lastRestockDate, lowStockProducts };
};

export async function cardData(userId?: string) {
    if (!userId) return [];

    const { todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage } = await getData(userId);

    return [
        {
            title: "Vendas hoje",
            value: !todayTotalSales ? 0 : todayTotalSales,
            percentage: Number(todayTotalSalesPercentage)
        },
        {
            title: "Lucro hoje",
            value: !todayProfit ? 0 : todayProfit,
            percentage: Number(todayProfitPercentage)
        },
        {
            title: "Crescimento Mensal",
            value: monthlySales,
            percentage: Number(monthlySalesPercentage)
        }
    ];
}

export async function InventoryCardData(userId?: string) {
    if (!userId) return [];

    const { lengthOfProducts, totalInventoryValue, lastRestockDate, lowStockProducts } = await getData(userId);

    return [
        {
            title: "Custo total do inventário",
            value: !totalInventoryValue ? 0 : totalInventoryValue,
            isMoney: true,
            showPercentage: false
        },
        {
            title: "Quantidade de produtos",
            value: !lengthOfProducts ? 0 : lengthOfProducts,
            isMoney: false,
            showPercentage: false
        },
        {
            title: "Quantidade de produtos com estoque baixo",
            value: !lowStockProducts ? 0 : lowStockProducts,
            isMoney: false,
            showPercentage: false
        },
        {
            title: "Último reabastecimento",
            value: !lastRestockDate ? "Nenhum restoque realizado" : lastRestockDate.toLocaleDateString(),
            isMoney: false,
            showPercentage: false
        },
    ];
}
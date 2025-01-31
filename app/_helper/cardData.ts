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

async function getData() {
    const [todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage, lengthOfProducts, totalInventoryValue, lastRestockDate, lowStockProducts] = await Promise.all([
        getTotalTodaySales(),
        getTodayPercentageComparison(),
        getTodayProfit(),
        getTodayProfitPercentageComparison(),
        getTotalCurrentMonthSales(),
        getMonthPercentageComparison(),
        getLenghthOfProducts(),
        getProductStockValue(),
        getLastRestockDate(),
        getLowStockProducts(),
    ]);

    return { todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage, lengthOfProducts, totalInventoryValue, lastRestockDate, lowStockProducts };
};

export async function cardData() {
    const { todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage } = await getData();

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

export async function InventoryCardData() {
    const { lengthOfProducts, totalInventoryValue, lastRestockDate, lowStockProducts } = await getData();

    return [
        {
            title: "Custo total do inventário",
            value: totalInventoryValue,
            isMoney: true,
            showPercentage: false
        },
        {
            title: "Quantidade de produtos",
            value: lengthOfProducts,
            isMoney: false,
            showPercentage: false
        },
        {
            title: "Quantidade de produtos com estoque baixo",
            value: lowStockProducts,
            isMoney: false,
            showPercentage: false
        },
        {
            title: "Último reabastecimento",
            value: lastRestockDate.toLocaleDateString(),
            isMoney: false,
            showPercentage: false
        },
    ];
}
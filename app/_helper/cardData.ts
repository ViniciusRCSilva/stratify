import {
    getMonthPercentageComparison,
    getTodayPercentageComparison,
    getTodayProfit,
    getTodayProfitPercentageComparison,
    getTotalCurrentMonthSales,
    getTotalTodaySales
} from "../_actions/invoice";

async function getData() {
    const [todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage] = await Promise.all([
        getTotalTodaySales(),
        getTodayPercentageComparison(),
        getTodayProfit(),
        getTodayProfitPercentageComparison(),
        getTotalCurrentMonthSales(),
        getMonthPercentageComparison()
    ]);

    return { todayTotalSales, todayTotalSalesPercentage, todayProfit, todayProfitPercentage, monthlySales, monthlySalesPercentage };
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
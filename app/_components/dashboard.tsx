import { AreaChartComponent } from "./areaChart";
import { BarChartComponent } from "./barChart";
import { DataTableSales } from "./dataTableSales";
import { StatisticCard } from "./statisticCard";
import { columns, ProductSales } from "./columns/productSales";
import { Separator } from "./ui/separator";
import { AlertStockCard } from "./alertStockCard";
import dashboardData from "../_data/dashboard.json";

interface ChartData {
    date: string;
    sales: number;
    profit: number;
}

async function getProductsData(): Promise<ProductSales[]> {
    const products = dashboardData.products;
    return products.map(product => ({
        ...product,
        status: product.status === "outOfStock" ? "outOfStock" : "inStock"
    })) as ProductSales[];
}

function calculateCardData(orders: ChartData[]) {
    const lastSale = orders[orders.length - 1];
    const yesterday = orders[orders.length - 2];

    const currentDate = new Date().toISOString().split('T')[0];

    // Calculate sales data
    const salesPercentage = lastSale.date === currentDate ? ((lastSale.sales - yesterday.sales) / yesterday.sales) * 100 : -100;

    // Calculate profit data
    const profitPercentage = lastSale.date === currentDate ? ((lastSale.profit - yesterday.profit) / yesterday.profit) * 100 : -100;

    // Calculate monthly growth
    const currentMonth = currentDate.substring(0, 7); // Gets YYYY-MM
    const currentMonthSales = orders
        .filter(data => data.date.startsWith(currentMonth))
        .reduce((sum, data) => sum + data.sales, 0);

    const currentYear = parseInt(currentMonth.substring(0, 4));
    const currentMonthNum = parseInt(currentMonth.substring(5, 7));
    const lastMonthYear = currentMonthNum === 1 ? currentYear - 1 : currentYear;
    const lastMonthNum = currentMonthNum === 1 ? 12 : currentMonthNum - 1;
    const lastMonth = `${lastMonthYear}-${String(lastMonthNum).padStart(2, '0')}`;
    
    const lastMonthSales = orders
        .filter(data => data.date.startsWith(lastMonth))
        .reduce((sum, data) => sum + data.sales, 0);

    const monthlyGrowthPercentage = lastMonthSales === 0
        ? currentMonthSales > 0 ? 100 : 0
        : ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100;

    return [
        {
            title: "Vendas hoje",
            value: lastSale.date === currentDate ? lastSale.sales : 0,
            percentage: Number(salesPercentage)
        },
        {
            title: "Lucro hoje",
            value: lastSale.date === currentDate ? lastSale.profit : 0,
            percentage: Number(profitPercentage)
        },
        {
            title: "Crescimento Mensal",
            value: currentMonthSales,
            percentage: Number(monthlyGrowthPercentage)
        }
    ];
}

export default async function Dashboard() {
    const data = await getProductsData();
    const cards = calculateCardData(dashboardData.orders);

    return (
        <>
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <StatisticCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        percentage={card.percentage}
                    />
                ))}
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-4">
                <AreaChartComponent />
                <BarChartComponent />
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-4">
                <div className="flex flex-col gap-4">
                    <Separator />
                    <div className="flex flex-col">
                        <h1 className="text-2xl">Produtos mais vendidos</h1>
                        <p className="text-muted-foreground">Principais produtos mais vendidos</p>
                    </div>
                    <DataTableSales columns={columns} data={data.sort((a, b) => b.totalSales - a.totalSales).slice(0, 7)} />
                </div>
                <AlertStockCard lowStock={data.sort((a, b) => a.stock - b.stock).filter((product) => product.stock <= 10).slice(0, 5)} />
            </div>
        </>
    );
}

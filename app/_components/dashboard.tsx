/* import { AreaChartComponent } from "./areaChart";
import { BarChartComponent } from "./barChart";
import { DataTableSales } from "./dataTableSales";
import { columns } from "./columns/productSales";
import { AlertStockCard } from "./alertStockCard";
import { getProductsWithSales } from "../_actions/product"; */
import { StatisticCard } from "./statisticCard";
import { Separator } from "./ui/separator";
import { cardData } from "../_helper/cardData";

/* async function getDashboardData() {
    const [products] = await Promise.all([
        getProductsWithSales(),
    ]);
    return { products };
} */

export default async function Dashboard() {
    /* const { products } = await getDashboardData(); */
    const cards = await cardData();

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
                {/* <AreaChartComponent data={orders} />
                <BarChartComponent data={orders} /> */}
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-4">
                <div className="flex flex-col gap-4">
                    <Separator />
                    <div className="flex flex-col">
                        <h1 className="text-2xl">Produtos mais vendidos</h1>
                        <p className="text-muted-foreground">Principais produtos mais vendidos</p>
                    </div>
                    {/* <DataTableSales columns={columns} data={products.sort((a, b) => b.totalSales - a.totalSales).slice(0, 5)} /> */}
                </div>
                {/* <AlertStockCard lowStock={products.sort((a, b) => a.stock - b.stock).filter((product) => product.stock <= 30).slice(0, 5)} /> */}
            </div>
        </>
    );
}

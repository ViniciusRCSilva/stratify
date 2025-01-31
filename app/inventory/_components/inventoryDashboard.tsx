import { StatisticCard } from "@/app/_components/statisticCard";
import { InventoryCardData } from "@/app/_helper/cardData";
import { BarChartInventoryStockByLocation } from "./barChart";
import { PizzaChartTotalCostByCategory } from "./pizzaChart";
import { LineChartLowStockProducts } from "./lineChart";

export const InventoryDashboard = async () => {
    const cardData = await InventoryCardData();

    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((card, index) => (
                    <StatisticCard
                        key={index}
                        title={card.title}
                        value={card.value}
                        showPercentage={card.showPercentage}
                        isMoney={card.isMoney}
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <BarChartInventoryStockByLocation />
                <PizzaChartTotalCostByCategory />
                <LineChartLowStockProducts />
            </div>
        </>
    )
}
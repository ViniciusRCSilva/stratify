import { AreaChartComponent } from "./areaChart";
import { BarChartComponent } from "./barChart";
import { DataTableSales } from "./dataTableSales";
import { columns } from "./_columns/productSales";
import { AlertStockCard } from "./alertStockCard";
import { getProductsWithOrders } from "../_actions/product";
import { StatisticCard } from "./statisticCard";
import { Separator } from "./ui/separator";
import { cardData } from "../_helper/cardData";
import { getInvoicesWithOrders } from "../_actions/invoice";

export default async function Dashboard() {
    const cards = await cardData();
    const products = await getProductsWithOrders();
    const invoices = await getInvoicesWithOrders();

    const dataTableSales = products.map((product) => ({
        ...product,
        ordersQuantity: product.ordersQuantity,
    }));

    const lowStock = products.map((product) => ({
        productName: product.name,
        stock: product.stock,
    }));

    const dataChartInvoices = invoices.map((invoice) => ({
        date: invoice.issueDate.toISOString().split('T')[0],
        sales: invoice.totalAmount,
        profit: invoice.order.orderItems.reduce((acc, item) => {
            const unitPriceWithDiscount = (item.product.unitPrice - (item.product.unitPrice * (item.product.discount / 100)));
            const itemProfit = (unitPriceWithDiscount - item.product.unitCost) * item.quantity;
            return acc + itemProfit;
        }, 0),
    }));

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
                <AreaChartComponent data={dataChartInvoices} />
                <BarChartComponent data={dataChartInvoices} />
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-4">
                <div className="flex flex-col gap-4">
                    <Separator />
                    <div className="flex flex-col">
                        <h1 className="text-2xl">Produtos mais vendidos</h1>
                        <p className="text-muted-foreground">Principais produtos mais vendidos</p>
                    </div>
                    <DataTableSales columns={columns} data={dataTableSales.sort((a, b) => b.ordersQuantity - a.ordersQuantity).slice(0, 5)} />
                </div>
                <AlertStockCard lowStock={lowStock.sort((a, b) => a.stock - b.stock).filter((product) => product.stock <= 30).slice(0, 5)} />
            </div>
        </>
    );
}

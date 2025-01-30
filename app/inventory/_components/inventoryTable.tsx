import { DataTableInventory } from "@/app/_components/dataTableInventory";
import { columns, Inventory as InventoryType } from "@/app/_components/_columns/inventory";
import { getAllProducts } from "@/app/_actions/product";

export const InventoryTable = async () => {
    const products = await getAllProducts();

    const data: InventoryType[] = products.map((product) => ({
        ...product,
        stockStatus: product.stock === 0
            ? "destructive"
            : product.stock <= 30
                ? "warning"
                : "success"
    }));


    return (
        <DataTableInventory columns={columns} data={data} />
    );
}
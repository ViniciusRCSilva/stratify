import { DataTableInventory } from "./dataTableInventory";
import { columns, Inventory as InventoryType } from "./_columns/inventory";
import { getAllProducts } from "../_actions/product";

export const Inventory = async () => {
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
};
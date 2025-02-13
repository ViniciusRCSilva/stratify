import { DataTableInventory } from "@/app/_components/dataTableInventory";
import { columns } from "@/app/_components/_columns/inventory";
import { getAllProducts } from "@/app/_actions/product";
import { Inventory } from "@/app/_types/inventory";
import { User } from "@/app/_types/user";
import { AddProductButton } from "./addProductButton";

export const InventoryTable = async ({ id }: User) => {
    const products = (await getAllProducts(id)).reverse();

    const data: Inventory[] = products.map((product) => ({
        ...product,
        stockStatus: product.stock === 0
            ? "destructive"
            : product.stock <= 30
                ? "warning"
                : "success"
    }));

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end">
                <AddProductButton id={id} />
            </div>
            <DataTableInventory columns={columns} data={data} />
        </div>
    );
}
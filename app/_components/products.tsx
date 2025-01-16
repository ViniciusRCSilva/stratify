import { columns } from "./columns/products";
import { DataTableProducts } from "./dataTableProducts";
import { getProductsForTable } from "../_actions/product";

async function getData() {
    return getProductsForTable();
}

export const Products = async () => {
    const data = await getData();

    return (
        <DataTableProducts columns={columns} data={data} />
    );
};
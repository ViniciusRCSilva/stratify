import { columns, Product as ProductType } from "./columns/products";
import { DataTableProducts } from "./dataTableProducts";
import { getProductsWithOrders } from "../_actions/product";

export const Products = async () => {
    const products = await getProductsWithOrders();

    const data: ProductType[] = products.map((product) => ({
        ...product,
        ordersQuantity: product.ordersQuantity,
        stockStatus: product.stock === 0
            ? "destructive"
            : product.stock <= 30
                ? "warning"
                : "success"
    }));

    return (
        <DataTableProducts columns={columns} data={data} />
    );
};
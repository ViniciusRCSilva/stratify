import { columns, Product as ProductType } from "@/app/_components/_columns/products";
import { DataTableProducts } from "@/app/_components/dataTableProducts";
import { getProductsWithOrders } from "@/app/_actions/product";

export const ProductsTable = async () => {
    const products = await getProductsWithOrders();

    const data: ProductType[] = products.map((product) => ({
        ...product,
        ordersQuantity: product.ordersQuantity,
    }));

    return (
        <DataTableProducts columns={columns} data={data} />
    );
}
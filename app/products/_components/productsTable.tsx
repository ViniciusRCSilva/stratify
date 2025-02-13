import { columns, Product as ProductType } from "@/app/_components/_columns/products";
import { DataTableProducts } from "@/app/_components/dataTableProducts";
import { getProductsWithOrders } from "@/app/_actions/product";
import { User } from "@/app/_types/user";

export const ProductsTable = async ({ id }: User) => {
    const products = await getProductsWithOrders(id);

    const data: ProductType[] = products.map((product) => ({
        ...product,
        ordersQuantity: product.ordersQuantity,
    }));

    return (
        <DataTableProducts columns={columns} data={data} />
    );
}
import { columns, Orders as OrderType } from "./columns/orders";
import { DataTableOrders } from "./dataTableOrders";
import { getAllOrders } from "../_actions/order";
import { getClientById } from "../_actions/client";

export const Orders = async () => {
    const orders = await getAllOrders();

    const data: OrderType[] = await Promise.all(orders.map(async (order) => {
        const client = await getClientById(order.clientId);
        if (!client) throw new Error(`Client not found for order ${order.id}`);

        return {
            ...order,
            client,
            productsQuantity: order.orderItems.length,
            orderItems: order.orderItems,
        };
    }));

    return (
        <DataTableOrders columns={columns} data={data} />
    );
};
import { columns, Orders as OrderType } from "@/app/_components/_columns/orders";
import { DataTableOrders } from "@/app/_components/dataTableOrders";
import { getAllOrders } from "@/app/_actions/order";
import { getClientById } from "@/app/_actions/client";

export const OrdersTable = async () => {
    const orders = await getAllOrders();

    const data: OrderType[] = await Promise.all(orders.map(async (order) => {
        const client = await getClientById(order.clientId);
        if (!client) throw new Error(`Client not found for order ${order.id}`);

        return {
            ...order,
            client,
            orderItems: order.orderItems,
        };
    }));

    return (
        <DataTableOrders columns={columns} data={data} />
    );
}
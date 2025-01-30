import { ToggleDashboardTable } from "../_components/toggleDashboardTable";
import { OrdersTable } from "./_components/ordersTable";

export default async function Orders() {
    return (
        <ToggleDashboardTable
            dashboard={<p>Dashboard</p>}
            table={<OrdersTable />}
        />
    )
}
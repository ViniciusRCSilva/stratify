import { ToggleDashboardTable } from "../_components/toggleDashboardTable";
import { ProductsTable } from "./_components/productsTable";

export default function Products() {
    return (
        <ToggleDashboardTable
            dashboard={<p>Dashboard</p>}
            table={<ProductsTable />}
        />
    );
}
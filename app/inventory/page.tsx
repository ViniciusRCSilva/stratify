import { ToggleDashboardTable } from "@/app/_components/toggleDashboardTable";
import { InventoryTable } from "@/app/inventory/_components/inventoryTable";

export default function Inventory() {
    return (
        <ToggleDashboardTable
            dashboard={<p>Dashboard</p>}
            table={<InventoryTable />}
        />
    );
}
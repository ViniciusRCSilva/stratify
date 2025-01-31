import { ToggleDashboardTable } from "@/app/_components/toggleDashboardTable";
import { InventoryTable } from "./_components/inventoryTable";
import { InventoryDashboard } from "./_components/inventoryDashboard";

export default function Inventory() {
    return (
        <ToggleDashboardTable
            dashboard={<InventoryDashboard />}
            table={<InventoryTable />}
        />
    );
}
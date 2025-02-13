import { ToggleDashboardTable } from "@/app/_components/toggleDashboardTable";
import { InventoryTable } from "./_components/inventoryTable";
import { InventoryDashboard } from "./_components/inventoryDashboard";
import { getCurrentUser } from "@/app/_utils/authServer";
import { redirect } from "next/navigation";

export default async function Inventory() {
    const userId = await getCurrentUser();
    if (!userId) redirect("/login");

    return (
        <ToggleDashboardTable
            dashboard={<InventoryDashboard id={userId} />}
            table={<InventoryTable id={userId} />}
        />
    );
}
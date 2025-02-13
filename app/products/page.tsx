import { ToggleDashboardTable } from "../_components/toggleDashboardTable";
import { ProductsTable } from "./_components/productsTable";
import { getCurrentUser } from "@/app/_utils/authServer";
import { redirect } from "next/navigation";

export default async function Products() {
    const userId = await getCurrentUser();

    if (!userId) redirect("/login");

    return (
        <ToggleDashboardTable
            dashboard={<p>Dashboard</p>}
            table={<ProductsTable id={userId} />}
        />
    );
}
import { DataTableInventory } from "./dataTableInventory";
import { columns } from "./columns/inventory";
import { getAllInventory } from "../_actions/inventory";

async function getData() {
    return getAllInventory();
}

export const Inventory = async () => {
    const data = await getData();

    return (
        <DataTableInventory columns={columns} data={data} />
    );
};
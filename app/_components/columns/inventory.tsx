"use client"

import { ColumnDef } from "@tanstack/react-table"
import { getProductsWithSales } from "@/app/_actions/product"
import { CellId } from "./_components/cellId"
import { Badge } from "../ui/badge"

/* Interface para representar os dados do inventário */
export type Inventory = {
    id: string,
    productName: string,
    unitCost: number,
    stockQuantity: number,
    alertStock: boolean,
    lastRestockedAt: Date,
    location: string,
}

export const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <CellId row={row} />
        },
    },
    {
        accessorKey: "productName",
        header: "Nome do produto",
        cell: ({ row }) => {
            return <div className="max-w-[200px] truncate" title={row.getValue("productName")}>{row.getValue("productName")}</div>
        },
    },
    {
        accessorKey: "unitCost",
        header: "Custo unitário",
        cell: ({ row }) => {
            const unitCost = parseFloat(row.getValue("unitCost"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(unitCost)
            return <span className="font-[family-name:var(--font-manrope)]">{formatted}</span>
        },
    },
    {
        accessorKey: "location",
        header: "Localização",
        cell: ({ row }) => {
            return row.getValue("location")
        },
    },
    {
        accessorKey: "stockQuantity",
        header: "Quantidade em estoque",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{row.getValue("stockQuantity")}</span>
        },
    },
    {
        accessorKey: "alertStock",
        header: "Alerta de estoque",
        cell: ({ row }) => {
            return <Badge variant={row.getValue("alertStock") ? "destructive" : "success"}>
                {row.getValue("alertStock") ? "Reabastecer" : "Em estoque"}
            </Badge>
        },
    },
    {
        accessorKey: "lastRestockedAt",
        header: "Último reabastecimento",
        cell: ({ row }) => {
            const lastRestockedAt = new Date(row.getValue("lastRestockedAt"))
            const formatted = lastRestockedAt.toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            })
            return <span className="font-[family-name:var(--font-manrope)]">{formatted}</span>
        },
    },
]

export async function DataTableSales() {
    const data = await getProductsWithSales();
    return data;
}
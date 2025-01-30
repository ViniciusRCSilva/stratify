"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellId } from "./_components/cellId"
import { moneyFormat } from "@/app/_helper/moneyFormat";

export interface Product {
    id: string;
    name: string;
    category: string;
    unitPrice: number;
    ordersQuantity: number;
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <CellId row={row} />
        },
    },
    {
        accessorKey: "name",
        header: "Nome do produto",
        cell: ({ row }) => {
            return <div className="max-w-[200px] truncate" title={row.getValue("name")}>{row.getValue("name")}</div>
        },
    },
    {
        accessorKey: "category",
        header: "Categoria",
        cell: ({ row }) => {
            return row.getValue("category")
        },
    },
    {
        accessorKey: "unitPrice",
        header: "Preço unitário",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{moneyFormat(row.getValue("unitPrice"))}</span>
        },
    },
    {
        accessorKey: "ordersQuantity",
        header: "Quantidade de pedidos",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{row.getValue("ordersQuantity")}</span>
        },
    },
]
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"
import { CellId } from "./_components/cellId"
import { moneyFormat } from "@/app/_helper/moneyFormat"

/* Interface para representar os dados dos produtos */
export type Product = {
    id: string;
    name: string;
    category: string;
    unitPrice: number;
    ordersQuantity: number;
    stock: number;
    stockStatus: "destructive" | "warning" | "success";
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
        accessorKey: "unitPrice",
        header: "Preço",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{moneyFormat(row.getValue("unitPrice"))}</span>
        },
    },
    {
        accessorKey: "ordersQuantity",
        header: "Vendas",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{row.getValue("ordersQuantity")}</span>
        },
    },
    {
        accessorKey: "stock",
        header: "Estoque",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{row.getValue("stock")}</span>
        },
    },
    {
        accessorKey: "stockStatus",
        header: "Status de estoque",
        cell: ({ row }) => {
            return (
                <Badge variant={row.getValue("stockStatus")}>
                    {
                        row.getValue("stockStatus") === "destructive" ? (
                            "Sem estoque"
                        ) : row.getValue("stockStatus") === "warning" ? (
                            "Estoque baixo"
                        ) : (
                            "Em estoque"
                        )
                    }
                </Badge>
            )
        },
    },
]
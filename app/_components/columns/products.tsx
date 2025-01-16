"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellId } from "./_components/cellId"
import { Badge } from "../ui/badge";

export interface Product {
    id: string;
    name: string;
    category: string;
    unitPrice: number;
    ordersQuantity: number;
    stockStatus: string;
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
            const unitPrice = parseFloat(row.getValue("unitPrice"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(unitPrice)
            return <span className="font-[family-name:var(--font-manrope)]">{formatted}</span>
        },
    },
    {
        accessorKey: "ordersQuantity",
        header: "Quantidade de pedidos",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{row.getValue("ordersQuantity")}</span>
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
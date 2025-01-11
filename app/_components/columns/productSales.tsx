"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductSales = {
    id: string
    productName: string
    price: number
    totalSales: number
    stock: number
    status: "inStock" | "outOfStock"
}

export const columns: ColumnDef<ProductSales>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <div className="font-medium">#{row.getValue("id")}</div>
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
        accessorKey: "price",
        header: "Preço",
        cell: ({ row }) => {
            const price = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(row.getValue("price"));
            return <div className="font-medium font-[family-name:var(--font-manrope)]">{price}</div>
        },
    },
    {
        accessorKey: "totalSales",
        header: "Vendas",
        cell: ({ row }) => {
            return <div className="font-medium font-[family-name:var(--font-manrope)]">{row.getValue("totalSales")}</div>
        },
    },
    {
        accessorKey: "stock",
        header: "Estoque",
        cell: ({ row }) => {
            return <div className="font-medium font-[family-name:var(--font-manrope)]">{row.getValue("stock")}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return row.getValue("status") === "inStock" ? (
                <Badge variant="success">Em estoque</Badge>
            ) : (
                <Badge variant="destructive">Sem estoque</Badge>
            )
        },
    },
]
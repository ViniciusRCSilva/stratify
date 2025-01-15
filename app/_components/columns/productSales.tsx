"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"
import { getProductsWithSales } from "@/app/_actions/product"

// This type is used to define the shape of our data.
export type Product = {
    id: string;
    productName: string;
    price: number;
    totalSales: number;
    stock: number;
    status: string;
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <div className="w-20 truncate font-medium">#{row.getValue("id")}</div>
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
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(price)
            return formatted
        },
    },
    {
        accessorKey: "totalSales",
        header: "Vendas",
        cell: ({ row }) => {
            return row.getValue("totalSales")
        },
    },
    {
        accessorKey: "stock",
        header: "Estoque",
        cell: ({ row }) => {
            return row.getValue("stock")
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as "inStock" | "outOfStock"
            return (
                <Badge variant={status === "inStock" ? "success" : "destructive"}>
                    {status === "inStock" ? "Em estoque" : "Sem estoque"}
                </Badge>
            )
        },
    },
]

export async function DataTableSales() {
    const data = await getProductsWithSales();
    return data;
}
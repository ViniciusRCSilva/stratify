"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellId } from "./_components/cellId"
import { Badge } from "../ui/badge"
import { moneyFormat } from "@/app/_helper/moneyFormat";

export interface Inventory {
    id: string;
    name: string;
    category: string;
    unitPrice: number;
    discount: number;
    unitCost: number;
    stock: number;
    location: string;
    updatedAt: Date;
    stockStatus: "destructive" | "warning" | "success";
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
        accessorKey: "unitCost",
        header: "Custo unitário",
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{moneyFormat(row.getValue("unitCost"))}</span>
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
        accessorKey: "stock",
        header: "Quantidade em estoque",
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
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Último reabastecimento",
        cell: ({ row }) => {
            const lastRestockedAt = new Date(row.getValue("updatedAt"))
            const formatted = lastRestockedAt.toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            })
            return <span className="font-[family-name:var(--font-manrope)]">{formatted}</span>
        },
    },
]
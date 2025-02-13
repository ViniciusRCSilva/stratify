"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellId } from "./_components/cellId"
import { Badge } from "../ui/badge"
import { moneyFormat } from "@/app/_helper/moneyFormat";
import { Inventory } from "@/app/_types/inventory";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown, EditIcon, TrashIcon } from "lucide-react";
import { EditProductDialog } from "@/app/inventory/_components/editProductDialog";
import { DeleteProductDialog } from "@/app/inventory/_components/deleteProductDialog";

export const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <CellId row={row} />
        },
        filterFn: (row, id, value) => {
            return Boolean(row.getValue(id)?.toString().toLowerCase().includes(value.toLowerCase()))
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Nome do produto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="max-w-[200px] truncate" title={row.getValue("name")}>{row.getValue("name")}</div>
        },
        filterFn: (row, id, value) => {
            return Boolean(row.getValue(id)?.toString().toLowerCase().includes(value.toLowerCase()))
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="max-w-[200px] truncate" title={row.getValue("category")}>{row.getValue("category")}</div>
        },
        filterFn: (row, id, value) => {
            return Boolean(row.getValue(id)?.toString().toLowerCase().includes(value.toLowerCase()))
        }
    },
    {
        accessorKey: "unitCost",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Custo unitário
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{moneyFormat(row.getValue("unitCost"))}</span>
        },
    },
    {
        accessorKey: "location",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Localização
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.getValue("location")
        },
        filterFn: (row, id, value) => {
            return Boolean(row.getValue(id)?.toString().toLowerCase().includes(value.toLowerCase()))
        }
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Estoque
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <span className="font-[family-name:var(--font-manrope)]">{row.getValue("stock")} <span className="font-[family-name:var(--font-josefin-sans)]">un.</span></span>
        },
    },
    {
        accessorKey: "stockStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        filterFn: (row, id, value) => {
            return Boolean(row.getValue(id)?.toString().toLowerCase().includes(value.toLowerCase()))
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Último reabastecimento
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
    {
        id: "actions",
        cell: function ActionCell({ row: { original: product } }) {
            const [isEditing, setIsEditing] = useState(false);
            const [isDeleting, setIsDeleting] = useState(false);

            return (
                <div className="flex justify-end gap-2">
                    <Button variant="warning" size="icon" onClick={() => setIsEditing(true)}>
                        <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => setIsDeleting(true)}>
                        <TrashIcon className="h-4 w-4" />
                    </Button>

                    <EditProductDialog
                        open={isEditing}
                        onOpenChange={setIsEditing}
                        product={product}
                    />

                    <DeleteProductDialog
                        open={isDeleting}
                        onOpenChange={setIsDeleting}
                        productId={product.id}
                        productName={product.name}
                        userId={product.userId}
                    />
                </div>
            );
        },
    },
]
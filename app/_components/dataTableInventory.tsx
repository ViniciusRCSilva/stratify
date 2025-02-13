"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_components/ui/select"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/_components/ui/accordion"


import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { Card } from "@/app/_components/ui/card"
import { X } from "lucide-react"
import { useState } from "react"
import { Inventory } from "@/app/_types/inventory"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTableInventory({
    columns,
    data,
}: DataTableProps<Inventory, string | number | Date | boolean>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])

    const clearFilters = () => {
        setColumnFilters([])
    }

    const hasActiveFilters = columnFilters.length > 0

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            sorting,
        },
    })

    // Get unique values for select filters
    const uniqueCategories = Array.from(new Set(data.map((item: Inventory) => item.category)))
    const uniqueLocations = Array.from(new Set(data.map((item: Inventory) => item.location)))

    return (
        <div className="flex flex-col gap-4">
            <Card className="p-6">
                <Accordion type="single" collapsible>
                    <AccordionItem className="border-none" value="item-1">
                        <div className="flex items-center justify-between">
                            <AccordionTrigger>
                                <h2 className="text-lg font-semibold">Filtros</h2>
                            </AccordionTrigger>
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 text-destructive"
                                >
                                    <X className="h-4 w-4" />
                                    Limpar filtros
                                </Button>
                            )}
                        </div>
                        <AccordionContent>
                            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-muted-foreground">Nome do produto</label>
                                    <Input
                                        placeholder="Buscar por nome..."
                                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                        onChange={(event) =>
                                            table.getColumn("name")?.setFilterValue(event.target.value)
                                        }
                                        className="max-w-full bg-background"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-muted-foreground">ID do Produto</label>
                                    <Input
                                        placeholder="Buscar por ID..."
                                        value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                                        onChange={(event) =>
                                            table.getColumn("id")?.setFilterValue(event.target.value)
                                        }
                                        className="max-w-full bg-background"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                                    <Select
                                        value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
                                        onValueChange={(value) =>
                                            table.getColumn("category")?.setFilterValue(value)
                                        }
                                    >
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Selecionar categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as categorias</SelectItem>
                                            {uniqueCategories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-muted-foreground">Localização</label>
                                    <Select
                                        value={(table.getColumn("location")?.getFilterValue() as string) ?? "all"}
                                        onValueChange={(value) =>
                                            table.getColumn("location")?.setFilterValue(value)
                                        }
                                    >
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Selecionar localização" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as localizações</SelectItem>
                                            {uniqueLocations.map((location) => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-muted-foreground">Status do Estoque</label>
                                    <Select
                                        value={(table.getColumn("stockStatus")?.getFilterValue() as string) ?? "all"}
                                        onValueChange={(value) =>
                                            table.getColumn("stockStatus")?.setFilterValue(value)
                                        }
                                    >
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Selecionar status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos os status</SelectItem>
                                            <SelectItem value="out">Fora de estoque</SelectItem>
                                            <SelectItem value="low">Estoque baixo</SelectItem>
                                            <SelectItem value="in">Em estoque</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </Card>

            <div className="rounded-md border bg-card overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="whitespace-nowrap">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sem resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltipContent,
} from "@/app/_components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_components/ui/select"
import dashboardData from "../_data/dashboard.json"
import { useState } from "react"

type ChartData = {
    date: string
    sales: number
    profit: number
}

type TimeFilter = "daily" | "weekly" | "monthly" | "yearly"

const chartConfig = {
    sales: {
        label: "Vendas",
        color: "hsl(var(--chart-1))",
    },
    profit: {
        label: "Lucro",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export const TimeFilterLabel = {
    daily: "diários",
    weekly: "semanais",
    monthly: "mensais",
    yearly: "anuais",
}

export function AreaChartComponent() {
    const [selectedPeriod, setSelectedPeriod] = useState<TimeFilter>("daily")

    const aggregateData = (data: ChartData[], period: TimeFilter): ChartData[] => {
        if (period === "daily") return data

        // Get min and max years from the data
        const years = data.map(item => parseInt(item.date.split("-")[0]))
        const minYear = Math.min(...years)
        const maxYear = Math.max(...years)

        const aggregated = new Map<string, { sales: number; profit: number; count: number }>()

        data.forEach((item) => {
            const date = new Date(item.date)
            const year = date.getFullYear()

            // Skip if year is outside our data range
            if (year < minYear || year > maxYear) return

            let key = ""

            switch (period) {
                case "weekly":
                    // Get the Monday of the week
                    const day = date.getDay()
                    const diff = date.getDate() - day + (day === 0 ? -6 : 1)
                    const monday = new Date(date.setDate(diff))
                    key = monday.toISOString().split("T")[0]
                    break
                case "monthly":
                    key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`
                    break
                case "yearly":
                    key = `${date.getFullYear()}-01-01`
                    break
            }

            if (!aggregated.has(key)) {
                aggregated.set(key, { sales: 0, profit: 0, count: 0 })
            }

            const current = aggregated.get(key)!
            current.sales += item.sales
            current.profit += item.profit
            current.count++
        })

        return Array.from(aggregated.entries()).map(([date, values]) => ({
            date,
            sales: Math.round(values.sales / values.count),
            profit: Math.round(values.profit / values.count),
        })).sort((a, b) => a.date.localeCompare(b.date))
    }

    const chartData = aggregateData(dashboardData.orders, selectedPeriod)

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Vendas e Lucro</CardTitle>
                    <CardDescription>
                        Mostrando as vendas e lucro {TimeFilterLabel[selectedPeriod]}
                    </CardDescription>
                </div>
                <Select
                    value={selectedPeriod}
                    onValueChange={(value) => setSelectedPeriod(value as TimeFilter)}
                >
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Últimos 3 meses" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="daily" className="rounded-lg">
                            Diário
                        </SelectItem>
                        <SelectItem value="weekly" className="rounded-lg">
                            Semanal
                        </SelectItem>
                        <SelectItem value="monthly" className="rounded-lg">
                            Mensal
                        </SelectItem>
                        <SelectItem value="yearly" className="rounded-lg">
                            Anual
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-[4/3] sm:aspect-auto h-[250px] sm:h-[300px] w-full overflow-x-auto overflow-y-hidden"
                >
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="fillsales" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-sales)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-sales)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillprofit" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-profit)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-profit)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            height={60}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("pt-BR", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            width={80}
                            tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR', {
                                notation: "compact",
                                maximumFractionDigits: 1
                            })}`}
                        />
                        <Tooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("pt-BR", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="profit"
                            type="natural"
                            fill="url(#fillprofit)"
                            stroke="var(--color-profit)"
                            stackId="a"
                        />
                        <Area
                            dataKey="sales"
                            type="natural"
                            fill="url(#fillsales)"
                            stroke="var(--color-sales)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

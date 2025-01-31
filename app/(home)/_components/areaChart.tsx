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
import { useState } from "react"

type ChartData = {
    date: string
    sales: number
    profit: number
}

interface AreaChartProps {
    data: ChartData[]
}

type TimeFilter = "7days" | "30days" | "3months"

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
    "7days": "últimos 7 dias",
    "30days": "últimos 30 dias",
    "3months": "últimos 3 meses",
}

export function AreaChartComponent({ data }: AreaChartProps) {
    const [selectedPeriod, setSelectedPeriod] = useState<TimeFilter>("30days")

    const aggregateData = (data: ChartData[], period: TimeFilter): ChartData[] => {
        const now = new Date()
        let startDate: Date

        switch (period) {
            case "7days":
                startDate = new Date(now)
                startDate.setDate(now.getDate() - 7)
                break
            case "30days":
                startDate = new Date(now)
                startDate.setDate(now.getDate() - 30)
                break
            case "3months":
                startDate = new Date(now)
                startDate.setMonth(now.getMonth() - 3)
                break
        }

        // Filter data within the selected time range
        const filteredData = data.filter(item => {
            const itemDate = new Date(item.date)
            return itemDate >= startDate && itemDate <= now
        })

        // Sort by date
        return filteredData.sort((a, b) => a.date.localeCompare(b.date))
    }

    const chartData = aggregateData(data, selectedPeriod)

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Vendas e Lucro</CardTitle>
                    <CardDescription>
                        Mostrando as vendas e lucro dos {TimeFilterLabel[selectedPeriod]}
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
                        <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="7days" className="rounded-lg">
                            Últimos 7 dias
                        </SelectItem>
                        <SelectItem value="30days" className="rounded-lg">
                            Últimos 30 dias
                        </SelectItem>
                        <SelectItem value="3months" className="rounded-lg">
                            Últimos 3 meses
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

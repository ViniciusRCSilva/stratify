"use client"

import { Pie, PieChart } from "recharts"
import { useEffect, useState, useMemo } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/app/_components/ui/chart"
import { getTotalCostByCategory } from "@/app/_actions/inventory"
import { moneyFormat } from "@/app/_helper/moneyFormat"

interface CategoryData {
    category: string
    totalCost: number
    fill: string
}

export function PizzaChartTotalCostByCategory({ userId }: { userId: string }) {
    const [chartData, setChartData] = useState<CategoryData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const colors = useMemo(() => [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
        "hsl(var(--chart-6))",
        "hsl(var(--chart-7))",
        "hsl(var(--chart-8))",
    ], [])

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getTotalCostByCategory(userId)
                const dataWithFill = data.map((item, index) => ({
                    ...item,
                    fill: colors[index % colors.length]
                }))
                setChartData(dataWithFill)
            } catch (error) {
                console.error("Erro ao carregar dados de custo:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [userId, colors])

    const chartConfig = {
        totalCost: {
            label: "Custo Total",
            color: "hsl(var(--chart-1))"
        },
        ...Object.fromEntries(
            chartData.map((item, index) => [
                item.category,
                {
                    label: item.category,
                    color: colors[index % colors.length]
                }
            ])
        )
    } satisfies ChartConfig

    if (isLoading) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Custo total por categoria</CardTitle>
                    <CardDescription>Carregando...</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    const totalCost = chartData.reduce((sum, item) => sum + item.totalCost, 0)

    const chartDataWithFill = chartData.map((item, index) => ({
        ...item,
        fill: colors[index % colors.length]
    }))

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Custo total por categoria</CardTitle>
                <CardDescription>Custo total: {moneyFormat(totalCost)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] px-0"
                >
                    <PieChart>
                        <ChartTooltip
                            content={({ payload }) => {
                                if (!payload?.[0]?.payload) return null
                                const { category, totalCost } = payload[0].payload
                                return (
                                    <div className="rounded-lg bg-background p-2 shadow-md">
                                        <div className="font-medium">{category}</div>
                                        <div>{moneyFormat(totalCost)}</div>
                                    </div>
                                )
                            }}
                        />
                        <Pie
                            data={chartDataWithFill}
                            dataKey="totalCost"
                            nameKey="category"
                            labelLine={false}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            fill="fill"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex flex-wrap gap-2">
                    {chartDataWithFill.map((item, index) => (
                        <div key={item.category} className="flex items-center gap-1">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <span className="text-xs">{item.category}</span>
                        </div>
                    ))}
                </div>
                <div className="leading-none text-muted-foreground">
                    Distribuição do custo total do inventário por categoria
                </div>
            </CardFooter>
        </Card>
    )
}

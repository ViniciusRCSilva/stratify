"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/app/_components/ui/chart"
import { getStockByLocation } from "@/app/_actions/inventory"
import { Loader2 } from "lucide-react"

interface LocationData {
    location: string
    totalStock: number
}

export function BarChartInventoryStockByLocation({ userId }: { userId: string }) {
    const [chartData, setChartData] = useState<LocationData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getStockByLocation(userId)
                setChartData(data)
            } catch (error) {
                console.error("Erro ao carregar dados de estoque:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [userId])

    const chartConfig = {
        totalStock: {
            label: "Total em Estoque",
            color: "hsl(var(--chart-1))"
        },
        ...Object.fromEntries(
            chartData.map((item, index) => [
                item.location,
                {
                    label: item.location,
                    color: `hsl(var(--chart-${(index % 8) + 1}))`
                }
            ])
        )
    } satisfies ChartConfig

    if (isLoading) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="pb-0">
                    <CardTitle>Estoque por localização</CardTitle>
                    <CardDescription>
                        <div className="flex items-center gap-2 my-10">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Carregando...
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-0">
                <CardTitle>Estoque por localização</CardTitle>
                <CardDescription>Quantidade de itens em sua respectiva localização</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-[4/3]"
                >
                    <BarChart
                        data={chartData}
                        margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                    >
                        <ChartTooltip
                            content={({ payload }) => {
                                if (!payload?.[0]?.payload) return null
                                const { location, totalStock } = payload[0].payload
                                return (
                                    <div className="rounded-lg bg-background p-2 shadow-md">
                                        <div className="font-medium">{location}</div>
                                        <div>Estoque: {totalStock}</div>
                                    </div>
                                )
                            }}
                        />
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="location"
                            tickMargin={8}
                            interval={0}
                            textAnchor="middle"
                            height={40}
                        />
                        <YAxis
                            type="number"
                            allowDecimals={false}
                            label={{ value: 'Quantidade', angle: -90, position: 'insideLeft', offset: 10 }}
                        />
                        <Bar
                            dataKey="totalStock"
                            radius={[4, 4, 0, 0]}
                        >
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`hsl(var(--chart-${(index % 8) + 1}))`}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

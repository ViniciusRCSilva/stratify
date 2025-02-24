"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

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
    ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { getStockByLocation } from "@/app/_actions/inventory"

interface StockData {
    location: string
    stock: number
}

export function BarChartInventoryStockByLocation({ userId }: { userId: string }) {
    const [chartData, setChartData] = useState<StockData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getStockByLocation(userId)
                setChartData(data)
            } catch (error) {
                console.error("Erro ao carregar dados do estoque:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [userId])

    const chartConfig = {
        stock: {
            label: "Quantidade",
            color: "hsl(var(--chart-1))"
        },
        ...Object.fromEntries(
            chartData.map(item => [
                item.location,
                {
                    label: item.location,
                    color: "hsl(var(--chart-1))"
                }
            ])
        )
    } satisfies ChartConfig

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Estoque por local</CardTitle>
                    <CardDescription>Carregando...</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Estoque por local</CardTitle>
                <CardDescription>Quantidade de itens por localização</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="location"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <XAxis dataKey="stock" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="stock" layout="vertical" radius={5} fill="hsl(var(--chart-1))" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Mostrando a quantidade total de itens em cada localização
                </div>
            </CardFooter>
        </Card>
    )
}

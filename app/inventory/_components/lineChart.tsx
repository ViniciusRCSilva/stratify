"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
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
} from "@/app/_components/ui/chart"
import { getLowStockProducts } from "@/app/_actions/inventory"

interface LowStockProduct {
    name: string
    stock: number
}

export function LineChartLowStockProducts({ userId }: { userId: string }) {
    const [chartData, setChartData] = useState<LowStockProduct[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getLowStockProducts(userId)
                setChartData(data)
            } catch (error) {
                console.error("Erro ao carregar dados de produtos:", error)
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
        }
    } satisfies ChartConfig

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Produtos com estoque baixo</CardTitle>
                    <CardDescription>Carregando...</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Produtos com estoque baixo</CardTitle>
                <CardDescription>Produtos com menos de 10 unidades em estoque</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ payload }) => {
                                if (!payload?.[0]?.payload) return null
                                const { name, stock } = payload[0].payload
                                return (
                                    <div className="rounded-lg bg-background p-2 shadow-md">
                                        <div className="font-medium">{name}</div>
                                        <div>Estoque: {stock}</div>
                                    </div>
                                )
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="stock"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            dot={{
                                fill: "hsl(var(--chart-1))",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                dataKey="stock"
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Produtos que precisam de reposição em breve
                </div>
            </CardFooter>
        </Card>
    )
}

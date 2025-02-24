"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { getLowStockProducts } from "@/app/_actions/inventory"

interface ProductData {
    name: string
    stock: number
}

export function BarChartLowStockProducts({ userId }: { userId: string }) {
    const [chartData, setChartData] = useState<ProductData[]>([])
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
            label: "Estoque",
            color: "hsl(var(--chart-1))"
        }
    } satisfies ChartConfig

    if (isLoading) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="pb-0">
                    <CardTitle>Produtos com baixo estoque</CardTitle>
                    <CardDescription>Carregando...</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-0">
                <CardTitle>Produtos com baixo estoque</CardTitle>
                <CardDescription>Produtos com menos de 30 unidades em estoque</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-[4/3]"
                >
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ left: -20 }}
                    >
                        <ChartTooltip
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
                        <CartesianGrid horizontal={false} />
                        <XAxis type="number" />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={110}
                        />
                        <Bar
                            dataKey="stock"
                            fill="hsl(var(--chart-1))"
                            radius={[0, 4, 4, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

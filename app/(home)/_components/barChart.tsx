"use client"

import { TrendingUp, TrendingDown, Trash } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { useState } from "react"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_components/ui/select"
import { Button } from "@/app/_components/ui/button"

interface ChartData {
    date: string
    sales: number
    profit: number
}

interface BarChartProps {
    data: ChartData[]
}

const months = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro"
} as const

const sortedMonths = Object.entries(months).sort((a, b) => a[0].localeCompare(b[0]))

const getAvailableYears = (data: ChartData[]) => {
    const years = new Set<string>()
    data.forEach(item => {
        const year = item.date.split("-")[0]
        years.add(year)
    })
    return Array.from(years).sort()
}

const chartConfig = {
    sales: {
        label: "Vendas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function BarChartComponent({ data }: BarChartProps) {
    const availableYears = getAvailableYears(data)
    const [selectedYear, setSelectedYear] = useState(availableYears[availableYears.length - 1] || new Date().getFullYear().toString())
    const [startMonth, setStartMonth] = useState<string>("01")
    const [endMonth, setEndMonth] = useState<string>("12")

    const calculateTotalSales = (year: string, startMonth: string, endMonth: string) => {
        return data.reduce((total, item) => {
            const [itemYear, itemMonth] = item.date.split("-")
            if (itemYear === year && itemMonth >= startMonth && itemMonth <= endMonth) {
                return total + item.sales
            }
            return total
        }, 0)
    }

    const calculateTrending = () => {
        const currentTotal = calculateTotalSales(selectedYear, startMonth, endMonth)

        // Calculate same period in previous year
        const previousYear = String(Number(selectedYear) - 1)
        const previousTotal = calculateTotalSales(previousYear, startMonth, endMonth)

        if (previousTotal === 0) return { percentage: 0, trending: 'up' }

        const percentage = ((currentTotal - previousTotal) / previousTotal) * 100
        return {
            percentage: Math.abs(Number(percentage.toFixed(1))),
            trending: percentage >= 0 ? 'up' : 'down'
        }
    }

    const filteredChartData = data.reduce((acc, item) => {
        const [year, month] = item.date.split("-")

        if (year === selectedYear && month >= startMonth && month <= endMonth) {
            const monthName = months[month as keyof typeof months]
            const existingMonth = acc.find(x => x.month === monthName)

            if (existingMonth) {
                existingMonth.sales += item.sales
            } else {
                acc.push({
                    month: monthName,
                    sales: item.sales
                })
            }
        }

        return acc
    }, [] as Array<{ month: string; sales: number }>)

    const handleStartMonthChange = (value: string) => {
        setStartMonth(value)
        // Reset end month if it's less than or equal to the new start month
        if (value >= endMonth) {
            const nextMonth = Object.keys(months).find(month => month > value) || "12"
            setEndMonth(nextMonth)
        }
    }

    const handleEndMonthChange = (value: string) => {
        if (value > startMonth) {
            setEndMonth(value)
        }
    }

    const resetFilters = () => {
        setSelectedYear(availableYears[availableYears.length - 1])
        setStartMonth("01")
        setEndMonth("12")
    }

    const { percentage, trending } = calculateTrending()

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Sumário de vendas
                    <Button variant="link" onClick={resetFilters}>
                        <Trash size={16} />
                        Limpar filtros
                    </Button>
                </CardTitle>
                <CardDescription className="flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                        <div className="flex flex-col w-full lg:w-auto">
                            <p className="text-muted-foreground text-sm">Ano</p>
                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                <SelectTrigger className="w-full lg:w-[145px]">
                                    <SelectValue placeholder="Selecione o ano" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableYears.map(year => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col w-full lg:w-auto">
                            <p className="text-muted-foreground text-sm">Mês inicial</p>
                            <Select value={startMonth} onValueChange={handleStartMonthChange}>
                                <SelectTrigger className="w-full lg:w-[145px]">
                                    <SelectValue placeholder="Mês inicial" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortedMonths.map(([value, label]) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col w-full lg:w-auto">
                            <p className="text-muted-foreground text-sm">Mês final</p>
                            <Select value={endMonth} onValueChange={handleEndMonthChange}>
                                <SelectTrigger className="w-full lg:w-[145px]">
                                    <SelectValue placeholder="Mês final" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortedMonths
                                        .filter(([month]) => month > startMonth)
                                        .map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        data={filteredChartData}
                        margin={{
                            top: 20,
                            right: 10,
                            left: 10,
                            bottom: 0,
                        }}
                        width={350}
                        height={400}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {percentage === 0 ? (
                        "Sem dados do período anterior para comparação"
                    ) : (
                        <>
                            {trending === 'up' ? (
                                <>A tendência subiu {percentage}% em relação ao ano de {Number(selectedYear) - 1} <TrendingUp className="h-4 w-4 text-success" /></>
                            ) : (
                                <>A tendência caiu {percentage}% em relação ao ano de {Number(selectedYear) - 1} <TrendingDown className="h-4 w-4 text-red-500" /></>
                            )}
                        </>
                    )}
                </div>
                <div className="leading-none text-muted-foreground">
                    {`Mostrando dados de vendas de ${months[startMonth as keyof typeof months]} até ${months[endMonth as keyof typeof months]} de ${selectedYear}`}
                </div>
            </CardFooter>
        </Card>
    )
}

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { moneyFormat } from "../_helper/moneyFormat";

interface StatisticCardProps {
    title: string;
    value: number;
    percentage: number;
}

export function StatisticCard({ title, value, percentage }: StatisticCardProps) {
    const isPositive = percentage > 0;

    return (
        <Card className="h-fit">
            <CardHeader className="p-4 lg:p-6">
                <CardTitle className="font-normal text-sm lg:text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center p-4 lg:p-6">
                <div className="flex flex-col gap-1 lg:gap-2">
                    <p className="font-[family-name:var(--font-manrope)] text-xl lg:text-2xl font-bold">{moneyFormat(value)}</p>
                    <p className="flex flex-col lg:flex-row lg:items-center gap-1 text-xs lg:text-sm text-muted-foreground">
                        <span className={`font-[family-name:var(--font-manrope)] flex items-center gap-1 ${isPositive ? `text-success` : `text-destructive`}`}>
                            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {percentage}%
                        </span>
                        <span className="lg:ml-1">{title === "Crescimento Mensal" ? "em relação ao mês anterior" : "em relação a ontem"}</span>
                    </p>
                </div>
                {isPositive ? (
                    <Image src="/positive_graph.svg" alt="Graph" width={80} height={80} className="opacity-80 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]" />
                ) : (
                    <Image src="/negative_graph.svg" alt="Graph" width={80} height={80} className="opacity-80 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]" />
                )}
            </CardContent>
        </Card>
    )
}
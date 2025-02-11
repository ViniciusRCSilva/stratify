import { Badge } from "../../_components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../_components/ui/card";
import { Separator } from "../../_components/ui/separator";

export type LowStock = {
    productName: string;
    stock: number;
}

interface AlertStockCardProps {
    lowStock: LowStock[];
}

export function AlertStockCard({ lowStock }: AlertStockCardProps) {
    return (
        <Card>
            <CardHeader className="p-4 lg:p-6">
                <CardTitle className="text-base lg:text-2xl">Alertas de estoque</CardTitle>
                <p className="text-sm lg:text-base text-muted-foreground">Principais produtos com estoque baixo</p>
            </CardHeader>
            <CardContent>
                {lowStock.length === 0 && (
                    <div className="bg-background p-4 rounded-md flex items-center justify-center">
                        <p className="text-sm">Nenhum produto com estoque baixo</p>
                    </div>
                )}
                <ul className="space-y-2">
                    {lowStock.map((item, index) => (
                        <li key={index}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                                <div className="flex flex-col">
                                    <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                                        {item.productName}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                        Quantidade restante: <span className="font-[family-name:var(--font-manrope)] font-semibold">{item.stock}</span> {item.stock === 1 ? "unidade" : "unidades"}
                                    </p>
                                </div>
                                <Badge variant="destructive" className="self-start sm:self-center">
                                    Reabastecer
                                </Badge>
                            </div>
                            {index < lowStock.length - 1 && <Separator className="mt-2" />}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
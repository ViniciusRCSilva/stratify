import { Product } from "@prisma/client"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/app/_components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProduct } from "@/app/_actions/product"
import { toast } from "@/app/_hooks/use-toast"
import { Input } from "@/app/_components/ui/input"
import { CircleHelp, Copy, Edit, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/app/_components/ui/button"
import { cn } from "@/app/_lib/utils"

interface EditProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: Product
}

const formSchema = z.object({
    name: z.string().min(1, "Nome do produto obrigatório"),
    category: z.string().min(1, "Categoria do produto obrigatório"),
    cost: z.string().min(1, "Custo do produto obrigatório"),
    profitRate: z.string().min(1, "Taxa de lucro obrigatória"),
    price: z.string().min(1, "Preço do produto obrigatório"),
    location: z.string().min(1, "Localização do produto obrigatório"),
    quantity: z.string().min(1, "Quantidade do produto obrigatório"),
})

export const EditProductDialog = ({ open, onOpenChange, product }: EditProductDialogProps) => {
    const [loading, setLoading] = useState(false)
    const [priceRecomended, setPriceRecomended] = useState(0)
    const [profit, setProfit] = useState(30)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product.name,
            category: product.category,
            cost: product.unitCost.toString(),
            profitRate: (((product.unitPrice - product.unitCost) / product.unitCost) * 100).toString(),
            price: product.unitPrice.toString(),
            location: product.location,
            quantity: product.stock.toString(),
        },
    })

    // Reset form values when product changes
    useEffect(() => {
        form.reset({
            name: product.name,
            category: product.category,
            cost: product.unitCost.toString(),
            profitRate: (((product.unitPrice - product.unitCost) / product.unitCost) * 100).toString(),
            price: product.unitPrice.toString(),
            location: product.location,
            quantity: product.stock.toString(),
        })
    }, [product, form])

    const cost = form.watch("cost")
    const profitRate = form.watch("profitRate")

    useEffect(() => {
        const profitMultiplier = 1 + (Number(profitRate) / 100)
        setPriceRecomended(Number(cost) * profitMultiplier)
        setProfit(Number(profitRate))
    }, [cost, profitRate])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            await updateProduct(product.id, {
                name: values.name,
                category: values.category,
                unitCost: Number(values.cost),
                unitPrice: Number(values.price),
                location: values.location,
                stock: Number(values.quantity),
            })
            toast({
                variant: "warning",
                description: (
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-warning" />
                        <span>Produto editado com sucesso.</span>
                    </div>
                ),
                className: "border-2 border-warning/20 bg-warning/10",
                duration: 5000,
            })
            form.reset()
            onOpenChange(false)
        } catch (error) {
            console.error("Registration failed:", error);
            toast({
                variant: "destructive",
                description: (
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive" />
                        <span>Erro ao editar o produto. Tente novamente.</span>
                    </div>
                ),
                className: "border-2 border-destructive/20 bg-destructive/10",
                duration: 5000,
            })
        } finally {
            setLoading(false)
            form.reset()
            onOpenChange(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(priceRecomended.toFixed(2))
        toast({
            variant: "success",
            description: (
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Preço copiado!</span>
                </div>
            ),
            className: "border-2 border-green-500/20 bg-green-500/10",
            duration: 5000,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn(
                "font-[family-name:var(--font-josefin-sans)]",
                loading && "opacity-80"
            )}>
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-2 text-warning">
                        <Edit className="h-6 w-6" />
                        <DialogTitle className="text-xl">Editar Produto</DialogTitle>
                    </div>
                    <DialogDescription className="text-base">
                        Editando o produto <span className="font-semibold text-foreground">{product.name}</span>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome do Produto</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nome do produto" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categoria</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Categoria do produto" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="cost"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center gap-2">
                                                <FormLabel className="text-sm">Custo Unitário (R$)</FormLabel>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger className="cursor-help">
                                                            <CircleHelp className="h-4 w-4 text-muted-foreground" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="w-60">Valor pago por unidade do produto. Esse custo pode influenciar o preço de venda e a margem de lucro.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="profitRate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center gap-2">
                                                <FormLabel className="text-sm">Taxa de Lucro (%)</FormLabel>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger className="cursor-help">
                                                            <CircleHelp className="h-4 w-4 text-muted-foreground" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="w-60">Percentual de lucro sobre o custo do produto. Isso afetará o preço de venda recomendado.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <FormControl>
                                                <Input type="number" step="1" placeholder="30" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex flex-col gap-1">
                                            <FormLabel>Preço de Venda (R$)</FormLabel>
                                            <div className="flex flex-col lg:grid lg:grid-cols-[4fr_1fr] gap-2">
                                                <div className="flex items-center text-muted-foreground text-sm bg-muted/50 p-2 rounded-md">
                                                    <div>
                                                        Com <span className="font-medium text-foreground">{profit}%</span> de lucro,
                                                        o preço será <span className="font-medium text-foreground">R$ {priceRecomended.toFixed(2)}</span>,
                                                        gerando <span className="font-medium text-foreground">R$ {(priceRecomended - Number(cost)).toFixed(2)}</span> de lucro.
                                                    </div>
                                                </div>
                                                <Button type="button" className="flex items-center gap-2" variant="outline" onClick={handleCopy}>
                                                    <p className="text-sm">Copiar preço</p>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Localização</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Informe onde o produto está armazenado..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantidade</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="0" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={loading}
                                className="sm:w-32"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="warning"
                                disabled={loading}
                                className={cn(
                                    "sm:w-32",
                                    loading && "opacity-80"
                                )}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Salvando...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Edit className="h-4 w-4" />
                                        Salvar
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
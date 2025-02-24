"use client"

import { Button } from "@/app/_components/ui/button";
import { ArrowLeft, Banknote, CircleHelp, Loader2, Plus } from "lucide-react";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
    DialogTrigger,
    DialogFooter,
} from "@/app/_components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/app/_components/ui/tabs"

import { useEffect, useState } from "react";
import { toast } from "@/app/_hooks/use-toast";
import { createProduct } from "@/app/_actions/product";
import { Input } from "@/app/_components/ui/input";
import { User } from "@/app/_types/user";
import { cn } from "@/app/_lib/utils"

const formSchema = z.object({
    name: z.string().min(1, "Nome do produto obrigatório"),
    category: z.string().min(1, "Categoria do produto obrigatório"),
    cost: z.string().min(1, "Custo do produto obrigatório"),
    profitRate: z.string().min(1, "Taxa de lucro obrigatória"),
    simpleTax: z.string().optional(),
    icms: z.string().optional(),
    ipi: z.string().optional(),
    pis: z.string().optional(),
    cofins: z.string().optional(),
    price: z.string().min(1, "Preço do produto obrigatório"),
    location: z.string().min(1, "Localização do produto obrigatório"),
    quantity: z.string().min(1, "Quantidade do produto obrigatório"),
})

export const AddProductButton = ({ id }: User) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [priceRecomended, setPriceRecomended] = useState(0)
    const [profit, setProfit] = useState(30)
    const [profitValue, setProfitValue] = useState(0)
    const [icms, setIcms] = useState(0)
    const [ipi, setIpi] = useState(0)
    const [pis, setPis] = useState(0)
    const [cofins, setCofins] = useState(0)
    const [taxValue, setTaxValue] = useState(0)
    const [selectedTaxType, setSelectedTaxType] = useState("simple")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            cost: "",
            profitRate: "30",
            simpleTax: "0",
            icms: "0",
            ipi: "0",
            pis: "0",
            cofins: "0",
            price: "",
            location: "",
            quantity: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            await createProduct({
                user: {
                    connect: {
                        id: id
                    }
                },
                name: values.name,
                category: values.category,
                unitCost: Number(values.cost),
                unitPrice: Number(values.price),
                location: values.location,
                stock: Number(values.quantity),
                productTax: {
                    create: {
                        simpleTax: selectedTaxType === "simple" ? Number(values.simpleTax) : null,
                        icms: selectedTaxType === "detailed" ? Number(values.icms) : null,
                        ipi: selectedTaxType === "detailed" ? Number(values.ipi) : null,
                        pis: selectedTaxType === "detailed" ? Number(values.pis) : null,
                        cofins: selectedTaxType === "detailed" ? Number(values.cofins) : null,
                    }
                }
            })

            toast({
                variant: "success",
                description: (
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Produto adicionado com sucesso.</span>
                    </div>
                ),
                className: "border-2 border-green-500/20 bg-green-500/10",
                duration: 5000,
            })
            form.reset()
            setOpen(false)
        } catch (error) {
            console.error("Registration failed:", error);
            toast({
                variant: "destructive",
                description: (
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive" />
                        <span>Erro ao adicionar o produto. Tente novamente.</span>
                    </div>
                ),
                className: "border-2 border-destructive/20 bg-destructive/10",
                duration: 5000,
            })
        } finally {
            setLoading(false)
        }
    }

    const cost = form.watch("cost")
    const profitRate = form.watch("profitRate")
    const tax = form.watch("simpleTax")

    useEffect(() => {
        let taxMultiplier = 1;
        let totalTaxPercentage = 0;

        if (selectedTaxType === "simple") {
            totalTaxPercentage = Number(tax);
        } else {
            totalTaxPercentage = (icms + ipi + pis + cofins);
        }

        taxMultiplier = 1 + (totalTaxPercentage / 100);

        const priceBeforeTax = Number(cost) * (1 + Number(profitRate) / 100);

        const finalPrice = priceBeforeTax * taxMultiplier;

        const profitValue = priceBeforeTax - Number(cost);

        setTaxValue(totalTaxPercentage);
        setPriceRecomended(finalPrice);
        setProfit(Number(profitRate));
        setProfitValue(profitValue);
    }, [cost, profitRate, tax, icms, ipi, pis, cofins, selectedTaxType]);


    const handleInsertPriceInInput = () => {
        form.setValue("price", priceRecomended.toFixed(2))
        toast({
            variant: "default",
            description: (
                <div className="flex items-center gap-2">
                    <Banknote className="h-6 w-6 text-success" />
                    <span>Preço recomendado inserido no campo!</span>
                </div>
            ),
            duration: 5000,
        })
    }

    const cancel = () => {
        form.reset()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
                form.reset()
            }
            setOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo produto
                </Button>
            </DialogTrigger>
            <DialogContent className={cn(
                "font-[family-name:var(--font-josefin-sans)]",
                loading && "opacity-80"
            )}>
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                        <Plus className="h-6 w-6" />
                        <DialogTitle className="text-xl">Novo Produto</DialogTitle>
                    </div>
                    <DialogDescription className="text-base">
                        Adicione um novo produto ao seu inventário
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

                            <FormItem>
                                <FormLabel>Imposto (%)</FormLabel>
                                <Tabs defaultValue="simple" onValueChange={(value) => setSelectedTaxType(value)}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="simple">Imposto Simples</TabsTrigger>
                                        <TabsTrigger value="detailed">Impostos Detalhados</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="simple" className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="simpleTax"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center gap-2">
                                                        <FormLabel className="text-sm">Imposto Simples (%)</FormLabel>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger className="cursor-help">
                                                                    <CircleHelp className="h-4 w-4 text-muted-foreground" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p className="w-60">Percentual de imposto simples sobre o produto.</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            placeholder="0.00"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </TabsContent>
                                    <TabsContent value="detailed" className="space-y-4">
                                        <div className="grid gap-4 sm:grid-cols-4">
                                            <FormField
                                                control={form.control}
                                                name="icms"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex items-center gap-2">
                                                            <FormLabel className="text-sm">ICMS (%)</FormLabel>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger className="cursor-help">
                                                                        <CircleHelp className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="w-60">Imposto sobre Circulação de Mercadorias e Serviços</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                step="0.01"
                                                                placeholder="0.00"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setIcms(Number(e.target.value));
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="ipi"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex items-center gap-2">
                                                            <FormLabel className="text-sm">IPI (%)</FormLabel>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger className="cursor-help">
                                                                        <CircleHelp className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="w-60">Imposto sobre Produtos Industrializados</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                step="0.01"
                                                                placeholder="0.00"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setIpi(Number(e.target.value));
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="pis"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex items-center gap-2">
                                                            <FormLabel className="text-sm">PIS (%)</FormLabel>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger className="cursor-help">
                                                                        <CircleHelp className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="w-60">Programa de Integração Social</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                step="0.01"
                                                                placeholder="0.00"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setPis(Number(e.target.value));
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="cofins"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex items-center gap-2">
                                                            <FormLabel className="text-sm">COFINS (%)</FormLabel>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger className="cursor-help">
                                                                        <CircleHelp className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="w-60">Contribuição para o Financiamento da Seguridade Social</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                step="0.01"
                                                                placeholder="0.00"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setCofins(Number(e.target.value));
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex flex-col gap-1">
                                            <FormLabel>Preço de Venda (R$)</FormLabel>
                                            <div className="flex items-center text-muted-foreground text-sm bg-muted/50 p-2 rounded-md">
                                                <div>
                                                    Preço sugerido: <span className='font-medium text-foreground'>R$ {priceRecomended.toFixed(2)}</span> com <span className='font-medium text-foreground'>{taxValue}%</span> de impostos e <span className='font-medium text-foreground'>{profit}%</span> de margem de lucro. Lucro final: <span className='font-medium text-foreground'>R$ {profitValue.toFixed(2)}</span>.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:grid lg:grid-cols-[4fr_1fr] gap-2">
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                            </FormControl>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button type="button" className="flex items-center gap-2" variant="outline" onClick={handleInsertPriceInInput}>
                                                            <ArrowLeft className="h-4 w-4" />
                                                            <p className="text-sm">Inserir preço</p>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="w-60">Inserir preço sugerido no campo</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                        </div>
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

                        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={cancel}
                                disabled={loading}
                                className="sm:w-32"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
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
                                        <Plus className="h-4 w-4" />
                                        Adicionar
                                    </span>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
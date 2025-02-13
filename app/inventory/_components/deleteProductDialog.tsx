"use client"

import { deleteProduct } from "@/app/_actions/product"
import { Button } from "@/app/_components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/app/_components/ui/dialog"
import { toast } from "@/app/_hooks/use-toast"
import { AlertTriangle, Loader2, Trash } from "lucide-react"
import { useState } from "react"
import { cn } from "@/app/_lib/utils"

interface DeleteProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    productId: string
    productName: string
    userId: string
}

export const DeleteProductDialog = ({
    open,
    onOpenChange,
    productId,
    productName,
    userId
}: DeleteProductDialogProps) => {
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            await deleteProduct(productId, userId)
            toast({
                variant: "destructive",
                description: (
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive" />
                        <span>Produto deletado com sucesso.</span>
                    </div>
                ),
                className: "border-2 border-destructive/20 bg-destructive/10",
                duration: 5000,
            })
        } catch (error) {
            console.error("Registration failed:", error);
            toast({
                variant: "destructive",
                description: (
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive" />
                        <span>Erro ao deletar o produto. Tente novamente.</span>
                    </div>
                ),
                className: "border-2 border-destructive/20 bg-destructive/10",
                duration: 5000,
            })
        } finally {
            setLoading(false)
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn(
                "font-[family-name:var(--font-josefin-sans)]",
                loading && "opacity-80"
            )}>
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-6 w-6" />
                        <DialogTitle className="text-xl">Deletar Produto</DialogTitle>
                    </div>
                    <DialogDescription className="text-base">
                        Tem certeza que deseja deletar o produto <span className="font-semibold text-foreground">{productName}</span>?
                    </DialogDescription>
                </DialogHeader>

                <div className="my-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="text-destructive text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Aviso: Esta ação não pode ser desfeita
                    </p>
                    <p className="mt-2 text-muted-foreground text-sm">
                        Ao deletar o produto, todos os dados relacionados a ele serão perdidos permanentemente.
                    </p>
                </div>

                <DialogFooter className="flex sm:justify-end gap-2 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                        className="flex-1 sm:flex-none"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={loading}
                        className={cn(
                            "flex-1 sm:flex-none",
                            "transition-all duration-300",
                            loading && "bg-destructive/80"
                        )}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deletando...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Trash className="h-4 w-4" />
                                Deletar produto
                            </span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
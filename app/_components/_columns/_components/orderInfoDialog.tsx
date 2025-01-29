import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip"
import { Button } from "../../ui/button";
import { Check, ChevronRight, Eye } from "lucide-react";
import { moneyFormat } from "@/app/_helper/moneyFormat";
import { Separator } from "../../ui/separator";
import { ORDER_STATUS, PAYMENT_METHOD } from "@prisma/client";
import { paymentMethodLabel } from "@/app/_helper/paymentMethodLabel";
import { orderStatusLabel } from "@/app/_helper/orderStatusLabel";
import { Badge } from "../../ui/badge";
import { useMemo } from "react";

interface OrderInfoProps {
    orderId: string;
    status: ORDER_STATUS;
    paymentMethod: PAYMENT_METHOD;
    totalAmount: number;
    createdAt: Date;
    orderItems: {
        productId: string
        quantity: number
        product: {
            id: string;
            name: string;
            unitPrice: number;
            discount: number;
        }
    }[]
    client: {
        name: string;
        email: string;
        phone: string | null;
    }
}

export const OrderInfoDialog = ({ orderId, client, orderItems, totalAmount, status, paymentMethod, createdAt }: OrderInfoProps) => {
    const badgeColor = useMemo(() => {
        if (status === ORDER_STATUS.PENDING_PAYMENT || status === ORDER_STATUS.WAITING_CONFIRMATION) {
            return "warning" as const;
        } else if (status === ORDER_STATUS.CONFIRMED) {
            return "success" as const;
        } else if (status === ORDER_STATUS.COMPLETED) {
            return "default" as const;
        } else if (status === ORDER_STATUS.CANCELLED) {
            return "destructive" as const;
        }
        return "default" as const;
    }, [status]);

    const actionsButton = useMemo(() => {
        if (status === ORDER_STATUS.PENDING_PAYMENT || status === ORDER_STATUS.WAITING_CONFIRMATION) {
            return (
                <Button
                    variant="outline"
                    className={`${ORDER_STATUS.PENDING_PAYMENT && "disabled:opacity-20"}`}
                    disabled={status === ORDER_STATUS.PENDING_PAYMENT}
                >
                    Confirmar pedido <ChevronRight size={16} />
                </Button>
            )
        } else if (status === ORDER_STATUS.CONFIRMED) {
            return (
                <Button>Marcar como concluído <Check size={16} /></Button>
            )
        }
    }, [status])

    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Eye size={16} /></Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Exibir detalhes</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="font-[family-name:var(--font-josefin-sans)]">
                <DialogHeader>
                    <DialogTitle>
                        Pedido #{orderId}
                    </DialogTitle>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 text-sm text-muted-foreground">
                            <div className="flex flex-col p-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-base">Informações do pedido:</p>
                                    <Separator />
                                    <div className="flex flex-col gap-1">
                                        <p>Data do pedido: <span className="font-[family-name:var(--font-manrope)]">{createdAt.toLocaleDateString("pt-BR")}</span></p>
                                        <span>Status do pedido: <Badge variant={badgeColor}>{orderStatusLabel(status)}</Badge></span>
                                        <p>Forma de pagamento: {paymentMethodLabel(paymentMethod)}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-base">Informações do cliente:</p>
                                    <Separator />
                                    <div className="flex flex-col gap-1">
                                        <p>Nome: {client.name}</p>
                                        <p>Email: {client.email}</p>
                                        <p>Telefone: {client.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 p-2">
                                <p className="text-base">Lista de produtos:</p>
                                <Separator />
                                {orderItems.map((orderItem) => (
                                    <div className="flex flex-col bg-card p-4 rounded-md gap-2" key={orderItem.product.id}>
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col text-start">
                                                <p>{orderItem.product.name}</p>
                                                <p>Quantidade: {orderItem.quantity}</p>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <p>Preço: {moneyFormat(orderItem.product.unitPrice)}</p>
                                                <p>Desconto: {orderItem.product.discount}%</p>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <p>Subtotal:</p>
                                            <p>{moneyFormat(orderItem.quantity * (orderItem.product.unitPrice - (orderItem.product.unitPrice * (orderItem.product.discount / 100))))}</p>
                                        </div>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <p>Total:</p>
                                    <p>{moneyFormat(totalAmount)}</p>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <DialogClose asChild>
                                <Button variant="link">Fechar</Button>
                            </DialogClose>
                            {actionsButton}
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
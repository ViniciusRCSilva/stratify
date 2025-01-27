"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellId } from "./_components/cellId"
import { Badge } from "../ui/badge";
import { ORDER_STATUS, PAYMENT_METHOD } from "@prisma/client";
import { moneyFormat } from "@/app/_helper/moneyFormat";
import { paymentMethodLabel } from "@/app/_helper/paymentMethodLabel";
import { orderStatusLabel } from "@/app/_helper/orderStatusLabel"; // Added import statement
import { OrderInfoDialog } from "./_components/orderInfoDialog";

export interface Orders {
    id: string;
    totalAmount: number;
    paymentMethod: PAYMENT_METHOD;
    clientId: string;
    status: ORDER_STATUS;
    createdAt: Date;
    productsQuantity: number;
    orderItems: {
        id: string;
        productId: string;
        quantity: number;
        product: {
            id: string;
            name: string;
            unitPrice: number;
            discount: number;
        }
    }[]
    client: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
    };
}

export const columns: ColumnDef<Orders>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <CellId row={row} />
        },
    },
    {
        accessorKey: "client",
        header: "Cliente",
        cell: ({ row }) => {
            const client = row.getValue("client") as Orders["client"];
            return client.name;
        },
    },
    {
        accessorKey: "productsQuantity",
        header: "Quantidade de produtos",
        cell: ({ row }) => {
            return (
                <span className="font-[family-name:var(--font-manrope)]">
                    {row.getValue("productsQuantity")}
                    <span className="font-[family-name:var(--font-josefin-sans)]">{row.getValue("productsQuantity") === 1 ? " produto" : " produtos"}</span>
                </span>)
        },
    },
    {
        accessorKey: "totalAmount",
        header: "Valor total do pedido",
        cell: ({ row }) => {
            return <div className="font-[family-name:var(--font-manrope)]" title={row.getValue("totalAmount")}>{moneyFormat(row.getValue("totalAmount"))}</div>
        },
    },
    {
        accessorKey: "paymentMethod",
        header: "Forma de pagamento",
        cell: ({ row }) => {
            return (
                paymentMethodLabel(row.getValue("paymentMethod"))
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status do pedido",
        cell: ({ row }) => {
            const status = row.getValue("status") as ORDER_STATUS;
            return (
                status === ORDER_STATUS.PENDING_PAYMENT || status === ORDER_STATUS.WAITING_CONFIRMATION ? (
                    <Badge variant="warning">
                        {orderStatusLabel(status)}
                    </Badge>
                ) : status === ORDER_STATUS.CANCELLED ? (
                    <Badge variant="destructive">
                        {orderStatusLabel(status)}
                    </Badge>
                ) : status === ORDER_STATUS.CONFIRMED ? (
                    <Badge variant="success">
                        {orderStatusLabel(status)}
                    </Badge>
                ) : (
                    <Badge variant="default">
                        {orderStatusLabel(status)}
                    </Badge>
                )
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Data do pedido",
        cell: ({ row }) => {
            return (
                <span className="font-[family-name:var(--font-manrope)]">{new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR")}</span>
            )
        },
    },
    {
        id: "products",
        header: "Produtos",
        cell: ({ row }) => {
            const client = row.getValue("client") as Orders["client"];
            const orderItems = row.original.orderItems;
            return (
                <OrderInfoDialog
                    orderId={row.getValue("id")}
                    client={client}
                    orderItems={orderItems}
                    totalAmount={row.getValue("totalAmount")}
                    status={row.getValue("status")}
                    paymentMethod={row.getValue("paymentMethod")}
                    createdAt={row.getValue("createdAt")}
                />
            )
        },
    },
]
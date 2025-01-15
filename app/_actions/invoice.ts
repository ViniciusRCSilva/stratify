import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import { getOrderById } from "./order";

/* Cria uma fatura de um pedido */
export const createInvoice = async (orderId: string, data: Prisma.InvoiceCreateInput) => {
    /* Busca o pedido para calcular o subtotal */
    const order = await getOrderById(orderId);

    /* Verifica se o pedido existe */
    if (!order) {
        return;
    }

    /* Calcula o subtotal */
    const subtotal = order.products.reduce((acc, item) => {
        return acc + (item.quantity * item.product.unitPrice);
    }, 0);

    /* Define o percentual de imposto e o desconto */
    const taxPercentage = data.tax || 0;
    const discountAmount = data.discount || 0;

    /* Calcula o valor do imposto e o total com imposto e desconto */
    const taxAmount = (subtotal * taxPercentage) / 100;
    const totalAmount = subtotal + taxAmount - discountAmount;

    /* Cria a fatura */
    return db.invoice.create({
        data: {
            ...data,
            totalAmount: totalAmount
        }
    });
};

/* Busca todas as faturas */
export const getAllInvoices = async () => {
    return db.invoice.findMany();
};

/* Busca uma fatura pelo ID */
export const getInvoiceById = async (invoiceId: string) => {
    return db.invoice.findUnique({ where: { id: invoiceId } });
};
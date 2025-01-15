import { Prisma, ORDER_STATUS, INVOICE_STATUS } from "@prisma/client";
import { db } from "../_lib/prisma";

/* Cria um pedido */
export const createOrder = async (data: Prisma.OrderCreateInput) => {
    return db.order.create({ data: data });
};

/* Busca todos os pedidos */
export const getAllOrders = async () => {
    return db.order.findMany({
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    });
};

/* Busca um pedido pelo ID */
export const getOrderById = async (orderId: string) => {
    return db.order.findUnique({
        where: { id: orderId },
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    });
};

/* Atualiza um pedido */
export const updateOrder = async (orderId: string, data: Prisma.OrderUpdateInput) => {
    const invoiceIdInOrder = await db.invoice.findFirst({ where: { orderId: orderId } });

    if (data.status === ORDER_STATUS.PENDING) {
        /* Quando o pedido for pendente, atualiza-se a fatura automaticamente */
        if (invoiceIdInOrder) {
            await db.invoice.update({
                where: { id: invoiceIdInOrder.id },
                data: { status: INVOICE_STATUS.PENDING }
            });
        }
    }

    if (data.status === ORDER_STATUS.COMPLETED) {
        /* Quando o pedido for concluido, atualiza-se a fatura automaticamente */
        if (invoiceIdInOrder) {
            await db.invoice.update({
                where: { id: invoiceIdInOrder.id },
                data: { status: INVOICE_STATUS.PAID }
            });
        }
    }

    if (data.status === ORDER_STATUS.CANCELLED) {
        /* Quando o pedido for cancelado, deleta-se a fatura automaticamente */
        if (invoiceIdInOrder) {
            await db.invoice.delete({ where: { id: invoiceIdInOrder.id } });
        }
    }

    return db.order.update({ where: { id: orderId }, data: data });
};

/* Deleta um pedido */
export const deleteOrder = async (orderId: string) => {
    /* Quando o pedido for deletado, deleta-se a fatura automaticamente */
    return db.order.delete({ where: { id: orderId } });
};
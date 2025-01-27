import { Prisma, ORDER_STATUS, PAYMENT_METHOD } from "@prisma/client";
import { db } from "../_lib/prisma";
import { createInvoice } from "./invoice";
import { updateProduct } from "./product";

/* Cria um pedido */
export const createOrder = async (data: Prisma.OrderCreateInput) => {
    return db.order.create({ data: data });
};

/* Busca todos os pedidos */
export const getAllOrders = async () => {
    return db.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
    });
};

export const getOrdersThereIsCompleted = async () => {
    return db.order.findMany({
        where: {
            status: ORDER_STATUS.COMPLETED
        },
        include: {
            orderItems: {
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
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });
};

/* Atualiza o status do pedido */
export const updateOrderStatus = async (orderId: string, status: ORDER_STATUS, paymentMethod: PAYMENT_METHOD) => {
    const order = await db.order.update({
        where: { id: orderId },
        data: { status },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    /* Atualiza o estoque do produto quando o pedido for confirmado */
    if (order.status === ORDER_STATUS.CONFIRMED) {
        const currentStock = order.orderItems[0].product.stock;
        const orderItemsQuantity = order.orderItems[0].quantity;

        const newStock = currentStock - orderItemsQuantity;
        await updateProduct(order.orderItems[0].product.id, { stock: newStock })
    }

    /* Calcula o total do pedido */
    const totalAmount = order.orderItems.reduce((acc, item) => {
        return acc + (item.product.unitPrice * item.quantity);
    }, 0);

    /* Cria uma fatura quando o pedido for concluido */
    if (order.status === ORDER_STATUS.COMPLETED) {
        await createInvoice({
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            order: {
                connect: {
                    id: orderId
                }
            }
        });
    }

    /* Retorna o pedido atualizado */
    return order;
};

/* Deleta um pedido */
export const deleteOrder = async (orderId: string) => {
    /* Quando o pedido for deletado, deleta-se a fatura automaticamente */
    return db.order.delete({ where: { id: orderId } });
};
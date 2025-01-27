import { ORDER_STATUS } from "@prisma/client";

export const orderStatusLabel = (status: ORDER_STATUS) => {
    switch (status) {
        case ORDER_STATUS.PENDING_PAYMENT:
            return "Aguardando pagamento";
        case ORDER_STATUS.WAITING_CONFIRMATION:
            return "Esperando confirmação";
        case ORDER_STATUS.CONFIRMED:
            return "Confirmado";
        case ORDER_STATUS.COMPLETED:
            return "Concluído";
        case ORDER_STATUS.CANCELLED:
            return "Cancelado";
        default:
            return "Desconhecido";
    }
}
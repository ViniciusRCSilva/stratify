export const paymentMethodLabel = (paymentMethod: string) => {
    if (paymentMethod === "CREDIT_CARD") {
        return "Cartão de crédito"
    } else if (paymentMethod === "DEBIT_CARD") {
        return "Cartão de débito"
    } else if (paymentMethod === "CASH") {
        return "Dinheiro"
    } else if (paymentMethod === "PIX") {
        return "Pix"
    }
}
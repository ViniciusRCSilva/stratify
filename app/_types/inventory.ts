export interface Inventory {
    id: string;
    name: string;
    category: string;
    unitPrice: number;
    discount: number;
    unitCost: number;
    stock: number;
    location: string;
    updatedAt: Date;
    stockStatus: "destructive" | "warning" | "success";
    userId: string;
    productTax: {
        id: string;
        simpleTax: number | null;
        icms: number | null;
        ipi: number | null;
        pis: number | null;
        cofins: number | null;
        productId: string;
    } | null;
}

export interface InventoryForCard extends Inventory {
    stockValue: number;
    lastRestockDate: Date;
}
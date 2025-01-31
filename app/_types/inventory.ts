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
}

export interface InventoryForCard extends Inventory {
    stockValue: number;
    lastRestockDate: Date;
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient, PRODUCT_STATUS, ORDER_STATUS, INVOICE_STATUS, PAYMENT_METHOD } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando a inserção de dados...');

    // Clientes
    const clients = await prisma.client.createMany({
        data: [
            { name: 'João Silva', email: 'joao.silva@example.com', phone: '123456789' },
            { name: 'Maria Oliveira', email: 'maria.oliveira@example.com', phone: '987654321' },
            { name: 'Carlos Almeida', email: 'carlos.almeida@example.com', phone: '564738291' },
            { name: 'Ana Souza', email: 'ana.souza@example.com', phone: null },
            { name: 'Fernanda Lima', email: 'fernanda.lima@example.com', phone: '888888888' },
            { name: 'Bruno Costa', email: 'bruno.costa@example.com', phone: '777777777' },
            { name: 'Laura Nunes', email: 'laura.nunes@example.com', phone: '666666666' },
            { name: 'Ricardo Torres', email: 'ricardo.torres@example.com', phone: '555555555' },
        ],
    });

    console.log(`${clients.count} clientes criados.`);

    // Produtos
    const products = await prisma.product.createMany({
        data: [
            { name: 'Teclado Mecânico RGB', category: 'Eletrônicos', unitPrice: 350.0 },
            { name: 'Mouse Gamer', category: 'Eletrônicos', unitPrice: 120.0 },
            { name: 'Monitor Ultrawide', category: 'Eletrônicos', unitPrice: 1500.0 },
            { name: 'Cadeira Ergonomica', category: 'Móveis', unitPrice: 850.0 },
            { name: 'Mesa para Escritório', category: 'Móveis', unitPrice: 650.0 },
            { name: 'Notebook 16GB RAM', category: 'Eletrônicos', unitPrice: 4500.0 },
            { name: 'Headset Wireless', category: 'Eletrônicos', unitPrice: 299.99 },
            { name: 'Webcam HD', category: 'Eletrônicos', unitPrice: 199.99 },
            { name: 'SSD 1TB', category: 'Eletrônicos', unitPrice: 450.0 },
            { name: 'Mousepad XL', category: 'Acessórios', unitPrice: 89.99 },
            { name: 'Suporte para Monitor', category: 'Acessórios', unitPrice: 150.0 },
            { name: 'Hub USB', category: 'Eletrônicos', unitPrice: 120.0 },
            { name: 'Gabinete Gamer', category: 'Eletrônicos', unitPrice: 399.99 },
            { name: 'Fonte 750W', category: 'Eletrônicos', unitPrice: 550.0 },
            { name: 'Placa de Vídeo RTX 3060', category: 'Eletrônicos', unitPrice: 2499.99 },
            { name: 'Processador Ryzen 7', category: 'Eletrônicos', unitPrice: 1899.99 },
            { name: 'Memória RAM 32GB', category: 'Eletrônicos', unitPrice: 599.99 },
            { name: 'Water Cooler 240mm', category: 'Eletrônicos', unitPrice: 449.99 },
            { name: 'SSD M.2 2TB', category: 'Eletrônicos', unitPrice: 899.99 },
            { name: 'Placa Mãe B550', category: 'Eletrônicos', unitPrice: 799.99 },
        ],
    });

    console.log(`${products.count} produtos criados.`);

    // Inventário
    const inventoryData = [
        { name: 'Teclado Mecânico RGB', unitCost: 200.0, stockQuantity: 100, location: 'Depósito Central' },
        { name: 'Mouse Gamer', unitCost: 70.0, stockQuantity: 150, location: 'Depósito Central' },
        { name: 'Monitor Ultrawide', unitCost: 1000.0, stockQuantity: 30, location: 'Depósito Oeste' },
        { name: 'Cadeira Ergonomica', unitCost: 500.0, stockQuantity: 40, location: 'Depósito Sul' },
        { name: 'Mesa para Escritório', unitCost: 300.0, stockQuantity: 0, location: 'Depósito Sul' },
        { name: 'Notebook 16GB RAM', unitCost: 2500.0, stockQuantity: 25, location: 'Depósito Norte' },
        { name: 'Headset Wireless', unitCost: 180.0, stockQuantity: 75, location: 'Depósito Central' },
        { name: 'Webcam HD', unitCost: 120.0, stockQuantity: 60, location: 'Depósito Oeste' },
        { name: 'SSD 1TB', unitCost: 300.0, stockQuantity: 45, location: 'Depósito Norte' },
        { name: 'Mousepad XL', unitCost: 45.0, stockQuantity: 200, location: 'Depósito Central' },
        { name: 'Suporte para Monitor', unitCost: 80.0, stockQuantity: 50, location: 'Depósito Sul' },
        { name: 'Hub USB', unitCost: 70.0, stockQuantity: 90, location: 'Depósito Central' },
        { name: 'Gabinete Gamer', unitCost: 250.0, stockQuantity: 35, location: 'Depósito Oeste' },
        { name: 'Fonte 750W', unitCost: 350.0, stockQuantity: 40, location: 'Depósito Norte' },
        { name: 'Placa de Vídeo RTX 3060', unitCost: 1800.0, stockQuantity: 20, location: 'Depósito Norte' },
        { name: 'Processador Ryzen 7', unitCost: 1200.0, stockQuantity: 30, location: 'Depósito Norte' },
        { name: 'Memória RAM 32GB', unitCost: 400.0, stockQuantity: 50, location: 'Depósito Central' },
        { name: 'Water Cooler 240mm', unitCost: 300.0, stockQuantity: 25, location: 'Depósito Oeste' },
        { name: 'SSD M.2 2TB', unitCost: 600.0, stockQuantity: 35, location: 'Depósito Norte' },
        { name: 'Placa Mãe B550', unitCost: 500.0, stockQuantity: 40, location: 'Depósito Norte' },
    ];

    for (const data of inventoryData) {
        const product = await prisma.product.findFirst({ where: { name: data.name } });

        if (product) {
            await prisma.inventory.create({
                data: {
                    productId: product.id,
                    unitCost: data.unitCost,
                    stockQuantity: data.stockQuantity,
                    location: data.location,
                },
            });

            // Atualizar o status do produto com base na quantidade em estoque
            const status =
                data.stockQuantity === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.IN_STOCK;

            await prisma.product.update({
                where: { id: product.id },
                data: { status },
            });
        }
    }

    console.log(`Inventário configurado com base nos produtos.`);

    // Pedidos e Itens
    const ordersData = [
        // 2023 Orders
        {
            clientEmail: 'joao.silva@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Teclado Mecânico RGB', quantity: 2 },
                { name: 'Mouse Gamer', quantity: 1 },
            ],
            createdAt: new Date('2023-03-15T10:30:00-03:00'),
        },
        {
            clientEmail: 'maria.oliveira@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [{ name: 'Monitor Ultrawide', quantity: 1 }],
            createdAt: new Date('2023-04-20T14:15:00-03:00'),
        },
        {
            clientEmail: 'carlos.almeida@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Placa de Vídeo RTX 3060', quantity: 1 },
                { name: 'Fonte 750W', quantity: 1 },
            ],
            createdAt: new Date('2023-06-10T09:45:00-03:00'),
        },
        {
            clientEmail: 'ana.souza@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Processador Ryzen 7', quantity: 1 },
                { name: 'Placa Mãe B550', quantity: 1 },
                { name: 'Memória RAM 32GB', quantity: 2 },
            ],
            createdAt: new Date('2023-08-25T16:20:00-03:00'),
        },
        // 2024 Orders
        {
            clientEmail: 'fernanda.lima@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Notebook 16GB RAM', quantity: 1 },
                { name: 'Mousepad XL', quantity: 1 },
                { name: 'Hub USB', quantity: 1 },
            ],
            createdAt: new Date('2024-02-15T11:30:00-03:00'),
        },
        {
            clientEmail: 'bruno.costa@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Water Cooler 240mm', quantity: 1 },
                { name: 'Gabinete Gamer', quantity: 1 },
            ],
            createdAt: new Date('2024-05-05T13:45:00-03:00'),
        },
        {
            clientEmail: 'laura.nunes@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'SSD M.2 2TB', quantity: 1 },
                { name: 'Memória RAM 32GB', quantity: 1 },
            ],
            createdAt: new Date('2024-07-20T10:15:00-03:00'),
        },
        {
            clientEmail: 'ricardo.torres@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Cadeira Ergonomica', quantity: 1 },
                { name: 'Mesa para Escritório', quantity: 1 },
                { name: 'Suporte para Monitor', quantity: 2 },
            ],
            createdAt: new Date('2024-09-30T15:20:00-03:00'),
        },
        // 2025 Current Orders
        {
            clientEmail: 'joao.silva@example.com',
            status: ORDER_STATUS.PENDING,
            items: [
                { name: 'Placa de Vídeo RTX 3060', quantity: 1 },
                { name: 'Water Cooler 240mm', quantity: 1 },
            ],
            createdAt: new Date('2025-01-10T09:30:00-03:00'),
        },
        {
            clientEmail: 'maria.oliveira@example.com',
            status: ORDER_STATUS.PENDING,
            items: [
                { name: 'Headset Wireless', quantity: 1 },
                { name: 'Webcam HD', quantity: 1 },
            ],
            createdAt: new Date('2025-01-15T14:45:00-03:00'),
        },
        {
            clientEmail: 'carlos.almeida@example.com',
            status: ORDER_STATUS.CANCELLED,
            items: [{ name: 'Notebook 16GB RAM', quantity: 1 }],
            createdAt: new Date('2025-01-16T17:04:06-03:00'),
        },
    ];

    const orders = [];
    for (const orderData of ordersData) {
        const client = await prisma.client.findFirst({ where: { email: orderData.clientEmail } });

        if (!client) {
            console.error(`Client with email ${orderData.clientEmail} not found`);
            continue;
        }

        // Resolve product IDs first
        const orderItems = await Promise.all(
            orderData.items.map(async (item) => {
                const product = await prisma.product.findFirst({ where: { name: item.name } });
                return {
                    product: {
                        connect: { id: product?.id }
                    },
                    quantity: item.quantity,
                };
            })
        );

        const createdOrder = await prisma.order.create({
            data: {
                clientId: client.id,
                status: orderData.status,
                createdAt: orderData.createdAt,
                products: {
                    create: orderItems,
                },
            },
        });

        orders.push(createdOrder);
    }

    console.log(`${orders.length} pedidos criados.`);

    // Faturas
    const invoices = await prisma.invoice.createMany({
        data: [
            // 2023 Invoices
            {
                clientId: orders[0].clientId,
                orderId: orders[0].id,
                totalAmount: 820.0,
                status: INVOICE_STATUS.PAID,
                discount: 0,
                tax: 70.0,
                issueDate: new Date('2023-03-15T10:30:00-03:00'),
                dueDate: new Date('2023-04-14T10:30:00-03:00'),
                paymentMethod: PAYMENT_METHOD.PIX,
            },
            {
                clientId: orders[1].clientId,
                orderId: orders[1].id,
                totalAmount: 1500.0,
                status: INVOICE_STATUS.PAID,
                discount: 0,
                tax: 100.0,
                issueDate: new Date('2023-04-20T14:15:00-03:00'),
                dueDate: new Date('2023-05-20T14:15:00-03:00'),
                paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
            },
            {
                clientId: orders[2].clientId,
                orderId: orders[2].id,
                totalAmount: 3049.98,
                status: INVOICE_STATUS.PAID,
                discount: 100.0,
                tax: 250.0,
                issueDate: new Date('2023-06-10T09:45:00-03:00'),
                dueDate: new Date('2023-07-10T09:45:00-03:00'),
                paymentMethod: PAYMENT_METHOD.BANK_TRANSFER,
            },
            {
                clientId: orders[3].clientId,
                orderId: orders[3].id,
                totalAmount: 3999.96,
                status: INVOICE_STATUS.PAID,
                discount: 200.0,
                tax: 300.0,
                issueDate: new Date('2023-08-25T16:20:00-03:00'),
                dueDate: new Date('2023-09-24T16:20:00-03:00'),
                paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
            },
            // 2024 Invoices
            {
                clientId: orders[4].clientId,
                orderId: orders[4].id,
                totalAmount: 4709.98,
                status: INVOICE_STATUS.PAID,
                discount: 150.0,
                tax: 350.0,
                issueDate: new Date('2024-02-15T11:30:00-03:00'),
                dueDate: new Date('2024-03-16T11:30:00-03:00'),
                paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
            },
            {
                clientId: orders[5].clientId,
                orderId: orders[5].id,
                totalAmount: 849.98,
                status: INVOICE_STATUS.PAID,
                discount: 50.0,
                tax: 80.0,
                issueDate: new Date('2024-05-05T13:45:00-03:00'),
                dueDate: new Date('2024-06-04T13:45:00-03:00'),
                paymentMethod: PAYMENT_METHOD.PIX,
            },
            {
                clientId: orders[6].clientId,
                orderId: orders[6].id,
                totalAmount: 1499.98,
                status: INVOICE_STATUS.PAID,
                discount: 100.0,
                tax: 120.0,
                issueDate: new Date('2024-07-20T10:15:00-03:00'),
                dueDate: new Date('2024-08-19T10:15:00-03:00'),
                paymentMethod: PAYMENT_METHOD.BANK_TRANSFER,
            },
            {
                clientId: orders[7].clientId,
                orderId: orders[7].id,
                totalAmount: 1800.0,
                status: INVOICE_STATUS.PAID,
                discount: 80.0,
                tax: 150.0,
                issueDate: new Date('2024-09-30T15:20:00-03:00'),
                dueDate: new Date('2024-10-30T15:20:00-03:00'),
                paymentMethod: PAYMENT_METHOD.BOLETO,
            },
            // 2025 Invoices
            {
                clientId: orders[8].clientId,
                orderId: orders[8].id,
                totalAmount: 2949.98,
                status: INVOICE_STATUS.PENDING,
                discount: 150.0,
                tax: 250.0,
                issueDate: new Date('2025-01-10T09:30:00-03:00'),
                dueDate: new Date('2025-02-09T09:30:00-03:00'),
                paymentMethod: PAYMENT_METHOD.PIX,
            },
            {
                clientId: orders[9].clientId,
                orderId: orders[9].id,
                totalAmount: 499.98,
                status: INVOICE_STATUS.PENDING,
                discount: 50.0,
                tax: 45.0,
                issueDate: new Date('2025-01-15T14:45:00-03:00'),
                dueDate: new Date('2025-02-14T14:45:00-03:00'),
                paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
            },
            {
                clientId: orders[10].clientId,
                orderId: orders[10].id,
                totalAmount: 4500.0,
                status: INVOICE_STATUS.CANCELLED,
                discount: 0,
                tax: 0,
                issueDate: new Date('2025-01-16T16:59:10-03:00'),
                dueDate: new Date('2025-02-15T16:59:10-03:00'),
                paymentMethod: PAYMENT_METHOD.BANK_TRANSFER,
            },
        ],
    });

    console.log(`${invoices.count} faturas criadas.`);
    console.log('Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

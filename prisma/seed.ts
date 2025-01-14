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
        {
            clientEmail: 'joao.silva@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Teclado Mecânico RGB', quantity: 2 },
                { name: 'Mouse Gamer', quantity: 1 },
            ],
        },
        {
            clientEmail: 'maria.oliveira@example.com',
            status: ORDER_STATUS.PENDING,
            items: [{ name: 'Monitor Ultrawide', quantity: 1 }],
        },
        {
            clientEmail: 'carlos.almeida@example.com',
            status: ORDER_STATUS.COMPLETED,
            items: [
                { name: 'Notebook 16GB RAM', quantity: 1 },
                { name: 'Mouse Gamer', quantity: 2 },
            ],
        },
        {
            clientEmail: 'fernanda.lima@example.com',
            status: ORDER_STATUS.PENDING,
            items: [
                { name: 'Cadeira Ergonomica', quantity: 1 },
                { name: 'Mesa para Escritório', quantity: 1 },
            ],
        },
        {
            clientEmail: 'bruno.costa@example.com',
            status: ORDER_STATUS.CANCELLED,
            items: [{ name: 'Monitor Ultrawide', quantity: 2 }],
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
            {
                clientId: orders[0].clientId,
                orderId: orders[0].id,
                totalAmount: 820.0,
                status: INVOICE_STATUS.PAID,
                discount: 0,
                tax: 70.0,
                issueDate: new Date(),
                dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                paymentMethod: PAYMENT_METHOD.PIX,
            },
            {
                clientId: orders[1].clientId,
                orderId: orders[1].id,
                totalAmount: 1500.0,
                status: INVOICE_STATUS.PENDING,
                discount: 0,
                tax: 100.0,
                issueDate: new Date(),
                dueDate: new Date(new Date().setDate(new Date().getDate() + 15)),
                paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
            },
            {
                clientId: orders[2].clientId,
                orderId: orders[2].id,
                totalAmount: 4600.0,
                status: INVOICE_STATUS.PAID,
                discount: 200.0,
                tax: 300.0,
                issueDate: new Date(),
                dueDate: new Date(new Date().setDate(new Date().getDate() + 25)),
                paymentMethod: PAYMENT_METHOD.CASH,
            },
            {
                clientId: orders[3].clientId,
                orderId: orders[3].id,
                totalAmount: 1500.0,
                status: INVOICE_STATUS.PENDING,
                discount: 0,
                tax: 50.0,
                issueDate: new Date(),
                dueDate: new Date(new Date().setDate(new Date().getDate() + 20)),
                paymentMethod: PAYMENT_METHOD.DEBIT_CARD,
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

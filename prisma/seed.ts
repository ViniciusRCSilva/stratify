import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database with realistic business data...');

    // Criar Produtos
    const products = await prisma.product.createMany({
        data: [
            { name: 'Notebook Dell Inspiron', category: 'Eletrônicos', unitPrice: 3500.0, unitCost: 2800.0, stock: 20, location: 'Armazém A' },
            { name: 'Smartphone Samsung Galaxy', category: 'Eletrônicos', unitPrice: 2500.0, unitCost: 1800.0, stock: 50, location: 'Armazém B' },
            { name: 'Cadeira Ergonômica', category: 'Móveis', unitPrice: 750.0, unitCost: 500.0, stock: 30, location: 'Armazém C' },
            { name: 'Mesa de Escritório', category: 'Móveis', unitPrice: 1200.0, unitCost: 850.0, stock: 15, location: 'Armazém C' },
            { name: 'Impressora HP LaserJet', category: 'Eletrônicos', unitPrice: 2000.0, unitCost: 1500.0, stock: 10, location: 'Armazém A' },
            { name: 'Monitor LG Ultrawide', category: 'Eletrônicos', unitPrice: 1300.0, unitCost: 1000.0, stock: 25, location: 'Armazém B' },
            { name: 'Estante de Livros', category: 'Móveis', unitPrice: 500.0, unitCost: 300.0, stock: 40, location: 'Armazém D' },
            { name: 'Luminária de Mesa', category: 'Móveis', unitPrice: 150.0, unitCost: 90.0, stock: 100, location: 'Armazém D' },
            { name: 'Tablet Apple iPad', category: 'Eletrônicos', unitPrice: 3200.0, unitCost: 2600.0, stock: 18, location: 'Armazém A' },
            { name: 'Teclado Mecânico Logitech', category: 'Periféricos', unitPrice: 800.0, unitCost: 600.0, stock: 50, location: 'Armazém B' },
            { name: 'Mouse Sem Fio Logitech', category: 'Periféricos', unitPrice: 200.0, unitCost: 150.0, stock: 80, location: 'Armazém B' },
            { name: 'Câmera de Segurança Intelbras', category: 'Segurança', unitPrice: 900.0, unitCost: 700.0, stock: 20, location: 'Armazém A' },
            { name: 'Ar Condicionado LG 12.000 BTUs', category: 'Eletrodomésticos', unitPrice: 2200.0, unitCost: 1800.0, stock: 10, location: 'Armazém C' },
            { name: 'Fone de Ouvido Bluetooth JBL', category: 'Eletrônicos', unitPrice: 450.0, unitCost: 300.0, stock: 60, location: 'Armazém B' },
            { name: 'Cafeteira Expresso Nespresso', category: 'Eletrodomésticos', unitPrice: 700.0, unitCost: 500.0, stock: 25, location: 'Armazém C' },
            { name: 'Headset Gamer HyperX', category: 'Periféricos', unitPrice: 950.0, unitCost: 700.0, stock: 30, location: 'Armazém B' },
            { name: 'Projetor Epson XGA', category: 'Eletrônicos', unitPrice: 2800.0, unitCost: 2200.0, stock: 12, location: 'Armazém A' },
            { name: 'Geladeira Consul Frost Free', category: 'Eletrodomésticos', unitPrice: 3100.0, unitCost: 2500.0, stock: 8, location: 'Armazém C' },
            { name: 'Fogão 4 Bocas Brastemp', category: 'Eletrodomésticos', unitPrice: 1500.0, unitCost: 1200.0, stock: 15, location: 'Armazém C' },
            { name: 'Smart TV Samsung 50"', category: 'Eletrônicos', unitPrice: 3500.0, unitCost: 2800.0, stock: 10, location: 'Armazém A' },
            { name: 'Ventilador de Mesa Mondial', category: 'Eletrodomésticos', unitPrice: 200.0, unitCost: 150.0, stock: 70, location: 'Armazém D' },
            { name: 'Batedeira Planetária Arno', category: 'Eletrodomésticos', unitPrice: 400.0, unitCost: 300.0, stock: 30, location: 'Armazém C' },
            { name: 'Liquidificador Philips', category: 'Eletrodomésticos', unitPrice: 300.0, unitCost: 200.0, stock: 35, location: 'Armazém D' },
            { name: 'Smartwatch Xiaomi Mi Band', category: 'Eletrônicos', unitPrice: 350.0, unitCost: 250.0, stock: 40, location: 'Armazém B' },
            { name: 'Caixa de Som JBL Flip', category: 'Eletrônicos', unitPrice: 650.0, unitCost: 500.0, stock: 25, location: 'Armazém B' },
            { name: 'Roteador TP-Link Archer', category: 'Eletrônicos', unitPrice: 450.0, unitCost: 350.0, stock: 40, location: 'Armazém A' },
            { name: 'Smartphone Motorola Edge', category: 'Eletrônicos', unitPrice: 2800.0, unitCost: 2200.0, stock: 30, location: 'Armazém B' },
            { name: 'Lava-Louças Electrolux', category: 'Eletrodomésticos', unitPrice: 2800.0, unitCost: 2200.0, stock: 15, location: 'Armazém C' },
            { name: 'Notebook Apple MacBook Air', category: 'Eletrônicos', unitPrice: 8500.0, unitCost: 7000.0, stock: 5, location: 'Armazém A' },
        ],
    });
    console.log(`Criados ${products.count} produtos.`);

    // Criar Clientes
    const clients = await prisma.client.createMany({
        data: [
            { name: 'Alice Johnson', email: 'alice.johnson@email.com', phone: '1234567890' },
            { name: 'Bob Smith', email: 'bob.smith@email.com', phone: '0987654321' },
            { name: 'Charlie Brown', email: 'charlie.brown@email.com', phone: '1122334455' },
            { name: 'Diana Prince', email: 'diana.prince@email.com', phone: '2233445566' },
            { name: 'Ethan Hunt', email: 'ethan.hunt@email.com', phone: '3344556677' },
        ],
    });
    console.log(`Criados ${clients.count} clientes.`);

    // Buscar Produtos e Clientes
    const allProducts = await prisma.product.findMany();
    const [
        notebook, smartphone, cadeira, mesa, impressora, monitor, estante, luminaria,
        tablet, teclado, mouse, camera, arCondicionado, fone, headset,
        projetor, geladeira, fogao
    ] = allProducts;
    const [alice, bob, charlie, diana, ethan] = await prisma.client.findMany();

    // Criar Pedidos
    const order1 = await prisma.order.create({
        data: {
            clientId: alice.id,
            status: 'CONFIRMED',
            paymentMethod: 'CREDIT_CARD',
            totalAmount: 4450.0,
            orderItems: {
                create: [
                    { productId: notebook.id, quantity: 1 },
                    { productId: cadeira.id, quantity: 1 },
                    { productId: luminaria.id, quantity: 2 },
                ],
            },
            createdAt: new Date(2025, 0, 24), // January 24, 2025
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const order2 = await prisma.order.create({
        data: {
            clientId: bob.id,
            status: 'PENDING_PAYMENT',
            paymentMethod: 'PIX',
            totalAmount: 2550.0,
            orderItems: {
                create: [
                    { productId: smartphone.id, quantity: 1 },
                    { productId: luminaria.id, quantity: 3 },
                ],
            },
            createdAt: new Date(2025, 0, 23), // January 23, 2025
        },
    });

    const order3 = await prisma.order.create({
        data: {
            clientId: charlie.id,
            status: 'CONFIRMED',
            paymentMethod: 'DEBIT_CARD',
            totalAmount: 2950.0,
            orderItems: {
                create: [
                    { productId: estante.id, quantity: 2 },
                    { productId: mesa.id, quantity: 1 },
                    { productId: luminaria.id, quantity: 1 },
                ],
            },
            createdAt: new Date(2025, 0, 22), // January 22, 2025
        },
    });

    const order4 = await prisma.order.create({
        data: {
            clientId: diana.id,
            status: 'CONFIRMED',
            paymentMethod: 'CASH',
            totalAmount: 6000.0,
            orderItems: {
                create: [
                    { productId: monitor.id, quantity: 2 },
                    { productId: impressora.id, quantity: 1 },
                ],
            },
            createdAt: new Date(2025, 0, 20), // January 20, 2025
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const order5 = await prisma.order.create({
        data: {
            clientId: ethan.id,
            status: 'WAITING_CONFIRMATION',
            paymentMethod: 'CREDIT_CARD',
            totalAmount: 3500.0,
            orderItems: {
                create: [{ productId: notebook.id, quantity: 1 }],
            },
            createdAt: new Date(2025, 0, 19), // January 19, 2025
        },
    });

    // Additional orders with different dates
    const order6 = await prisma.order.create({
        data: {
            clientId: alice.id,
            status: 'CONFIRMED',
            paymentMethod: 'CREDIT_CARD',
            totalAmount: 5400.0,
            orderItems: {
                create: [
                    { productId: tablet.id, quantity: 1 },
                    { productId: teclado.id, quantity: 2 },
                ],
            },
            createdAt: new Date(2025, 0, 15), // January 15, 2025
        },
    });

    const order7 = await prisma.order.create({
        data: {
            clientId: bob.id,
            status: 'CONFIRMED',
            paymentMethod: 'PIX',
            totalAmount: 3850.0,
            orderItems: {
                create: [
                    { productId: camera.id, quantity: 2 },
                    { productId: mouse.id, quantity: 5 },
                ],
            },
            createdAt: new Date(2025, 0, 10), // January 10, 2025
        },
    });

    const order8 = await prisma.order.create({
        data: {
            clientId: charlie.id,
            status: 'CONFIRMED',
            paymentMethod: 'DEBIT_CARD',
            totalAmount: 4100.0,
            orderItems: {
                create: [
                    { productId: arCondicionado.id, quantity: 1 },
                    { productId: fone.id, quantity: 3 },
                ],
            },
            createdAt: new Date(2024, 11, 28), // December 28, 2024
        },
    });

    const order9 = await prisma.order.create({
        data: {
            clientId: diana.id,
            status: 'CONFIRMED',
            paymentMethod: 'CREDIT_CARD',
            totalAmount: 7200.0,
            orderItems: {
                create: [
                    { productId: projetor.id, quantity: 2 },
                    { productId: headset.id, quantity: 2 },
                ],
            },
            createdAt: new Date(2024, 11, 20), // December 20, 2024
        },
    });

    const order10 = await prisma.order.create({
        data: {
            clientId: ethan.id,
            status: 'CONFIRMED',
            paymentMethod: 'PIX',
            totalAmount: 8300.0,
            orderItems: {
                create: [
                    { productId: geladeira.id, quantity: 2 },
                    { productId: fogao.id, quantity: 1 },
                ],
            },
            createdAt: new Date(2024, 11, 15), // December 15, 2024
        },
    });

    console.log('Criados 10 pedidos.');

    // Criar Faturas para Pedidos Confirmados
    const invoices = await prisma.invoice.createMany({
        data: [
            {
                orderId: order1.id,
                totalAmount: order1.totalAmount,
                paymentMethod: order1.paymentMethod,
                issueDate: order1.createdAt,
            },
            {
                orderId: order3.id,
                totalAmount: order3.totalAmount,
                paymentMethod: order3.paymentMethod,
                issueDate: order3.createdAt,
            },
            {
                orderId: order4.id,
                totalAmount: order4.totalAmount,
                paymentMethod: order4.paymentMethod,
                issueDate: order4.createdAt,
            },
            {
                orderId: order6.id,
                totalAmount: order6.totalAmount,
                paymentMethod: order6.paymentMethod,
                issueDate: order6.createdAt,
            },
            {
                orderId: order7.id,
                totalAmount: order7.totalAmount,
                paymentMethod: order7.paymentMethod,
                issueDate: order7.createdAt,
            },
            {
                orderId: order8.id,
                totalAmount: order8.totalAmount,
                paymentMethod: order8.paymentMethod,
                issueDate: order8.createdAt,
            },
            {
                orderId: order9.id,
                totalAmount: order9.totalAmount,
                paymentMethod: order9.paymentMethod,
                issueDate: order9.createdAt,
            },
            {
                orderId: order10.id,
                totalAmount: order10.totalAmount,
                paymentMethod: order10.paymentMethod,
                issueDate: order10.createdAt,
            },
        ],
    });
    console.log(`Criadas ${invoices.count} faturas para pedidos confirmados.`);

    console.log('Seeding completo.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

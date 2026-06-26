const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  const count = await prisma.sellerSnapshot.count();
  if (count > 0) {
    console.log("Ya existen datos en la base de datos. Purgando datos anteriores...");
    await prisma.sellerSnapshot.deleteMany({});
    await prisma.shippingSnapshot.deleteMany({});
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of day

  const sellerSnapshots = [];
  const shippingSnapshots = [];

  // Generar datos para los últimos 90 días
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simular tendencia de crecimiento
    const progress = (90 - i) / 90; // 0 to 1
    
    sellerSnapshots.push({
      fecha: date,
      totalSellers: 5 + Math.floor(progress * 15) + Math.floor(Math.random() * 2),
      totalProducts: 50 + Math.floor(progress * 150) + Math.floor(Math.random() * 10),
      activeProducts: 40 + Math.floor(progress * 140) + Math.floor(Math.random() * 10),
      totalStock: 500 + Math.floor(progress * 1000) + Math.floor(Math.random() * 50)
    });

    shippingSnapshots.push({
      fecha: date,
      pendientes: 10 + Math.floor(Math.random() * 5),
      enTransito: 15 + Math.floor(Math.random() * 10) + Math.floor(progress * 20),
      entregados: 100 + Math.floor(progress * 400) + Math.floor(Math.random() * 20),
      cancelados: 5 + Math.floor(progress * 15) + Math.floor(Math.random() * 3),
      avgDeliveryDays: 3 + Math.random() * 1.5 
    });
  }

  await prisma.sellerSnapshot.createMany({ data: sellerSnapshots });
  await prisma.shippingSnapshot.createMany({ data: shippingSnapshots });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

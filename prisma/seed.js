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

    // Simular tendencia con fluctuaciones aleatorias
    const progress = (90 - i) / 90; // 0 to 1
    const stockFluctuation = Math.sin(i / 5) * 100; // Onda senoidal
    
    sellerSnapshots.push({
      fecha: date,
      totalSellers: 5 + Math.floor(progress * 15),
      totalProducts: 50 + Math.floor(progress * 150),
      activeProducts: 40 + Math.floor(progress * 140),
      totalStock: Math.floor(800 + stockFluctuation + (Math.random() * 50 - 25))
    });

    shippingSnapshots.push({
      fecha: date,
      // Los estados actuales deben fluctuar, no crecer infinitamente
      pendientes: Math.max(0, Math.floor(10 + Math.sin(i/3)*8 + Math.random() * 5)),
      enTransito: Math.max(0, Math.floor(25 + Math.cos(i/4)*12 + Math.random() * 8)),
      // Los totales (entregados y cancelados) DEBEN ser acumulativos y crecer
      entregados: 100 + Math.floor(progress * 500) + Math.floor(Math.random() * 20),
      cancelados: 5 + Math.floor(progress * 30) + Math.floor(Math.random() * 5),
      avgDeliveryDays: 2 + Math.random() * 1.5 
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

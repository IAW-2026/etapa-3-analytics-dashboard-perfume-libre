const BUYER_URL = process.env.BUYER_API_URL || "http://localhost:3000";
const FEEDBACK_URL = process.env.FEEDBACK_API_URL || "http://localhost:3001";
const SELLER_URL = process.env.SELLER_API_URL || "http://localhost:3002";
const SHIPPING_URL = process.env.SHIPPING_API_URL || "http://localhost:3003";

export async function getBuyerAnalytics(days: string) {
  try {
    const res = await fetch(`${BUYER_URL}/api/analytics?days=${days}`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 } // Cache por 1 minuto
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getFeedbackAnalytics(days: string) {
  try {
    const res = await fetch(`${FEEDBACK_URL}/api/analytics?days=${days}`, {
      headers: { "api_key": process.env.FEEDBACK_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getSellerAnalytics(days: string) {
  try {
    const res = await fetch(`${SELLER_URL}/api/seller/analytics?days=0`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const currentData = await res.json();

    // Consultar el historial local
    const prisma = new (require('@prisma/client').PrismaClient)();
    const daysNum = parseInt(days, 10);
    
    let dateFilter = {};
    if (daysNum > 0) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - daysNum);
      dateFilter = { fecha: { gte: pastDate } };
    }

    const history = await prisma.sellerSnapshot.findMany({
      where: dateFilter,
      orderBy: { fecha: 'asc' }
    });

    const chartData = history.map((snap: any) => ({
      date: snap.fecha.toISOString().split('T')[0],
      totalStock: snap.totalStock,
      activeProducts: snap.activeProducts
    }));

    return {
      ...currentData,
      chartData
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getShippingAnalytics(days: string) {
  try {
    const res = await fetch(`${SHIPPING_URL}/api/analytics?days=0`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const currentData = await res.json();

    // Consultar el historial local
    const prisma = new (require('@prisma/client').PrismaClient)();
    const daysNum = parseInt(days, 10);
    
    let dateFilter = {};
    if (daysNum > 0) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - daysNum);
      dateFilter = { fecha: { gte: pastDate } };
    }

    const history = await prisma.shippingSnapshot.findMany({
      where: dateFilter,
      orderBy: { fecha: 'asc' }
    });

    const chartData = history.map((snap: any) => ({
      date: snap.fecha.toISOString().split('T')[0],
      pendientes: snap.pendientes,
      enTransito: snap.enTransito,
      entregados: snap.entregados,
      cancelados: snap.cancelados,
      avgDeliveryDays: snap.avgDeliveryDays
    }));

    return {
      ...currentData,
      chartData
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

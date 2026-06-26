import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BUYER_URL = process.env.BUYER_API_URL || "http://localhost:3000";
const FEEDBACK_URL = process.env.FEEDBACK_API_URL || "http://localhost:3001";
const SELLER_URL = process.env.SELLER_API_URL || "http://localhost:3002";
const SHIPPING_URL = process.env.SHIPPING_API_URL || "http://localhost:3003";

export async function getBuyerAnalytics(days: string) {
  let currentData = { totalUsers: 0, totalOrders: 0, totalRevenue: 0, canceledOrders: 0 };
  
  try {
    const res = await fetch(`${BUYER_URL}/api/analytics?days=${days}`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (res.ok) {
      currentData = await res.json();
    }
  } catch (e) {
    console.error("Fetch Buyer error:", e);
  }

  try {
    const daysNum = parseInt(days, 10);
    
    let dateFilter = {};
    if (daysNum > 0) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - daysNum);
      dateFilter = { fecha: { gte: pastDate } };
    }

    const history = await prisma.buyerSnapshot.findMany({
      where: dateFilter,
      orderBy: { fecha: 'asc' }
    });

    const chartData = history.map((snap: any, index: number) => {
      const prevSnap = index > 0 ? history[index - 1] : snap;
      return {
        date: snap.fecha.toISOString().split('T')[0],
        newUsersDia: index === 0 ? 0 : Math.max(0, snap.totalUsers - prevSnap.totalUsers),
        ordersDia: index === 0 ? 0 : Math.max(0, snap.totalOrders - prevSnap.totalOrders),
        revenueDia: index === 0 ? 0 : Number(Math.max(0, snap.totalRevenue - prevSnap.totalRevenue).toFixed(2))
      };
    });

    if (chartData.length > 0) {
      chartData.shift();
    }

    return {
      ...currentData,
      chartData
    };
  } catch (e) {
    console.error("DB Buyer error:", e);
    return { ...currentData, chartData: [] };
  }
}

export async function getFeedbackAnalytics(days: string) {
  let currentData = { averageProductRating: 0, averageSellerRating: 0, distribution: {}, totalReviews: 0 };
  
  try {
    const res = await fetch(`${FEEDBACK_URL}/api/analytics?days=${days}`, {
      headers: { "api_key": process.env.FEEDBACK_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (res.ok) {
      currentData = await res.json();
    }
  } catch (e) {
    console.error("Fetch Feedback error:", e);
  }

  try {
    const daysNum = parseInt(days, 10);
    
    let dateFilter = {};
    if (daysNum > 0) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - daysNum);
      dateFilter = { fecha: { gte: pastDate } };
    }

    const history = await prisma.feedbackSnapshot.findMany({
      where: dateFilter,
      orderBy: { fecha: 'asc' }
    });

    const chartData = history.map((snap: any, index: number) => {
      const prevSnap = index > 0 ? history[index - 1] : snap;
      return {
        date: snap.fecha.toISOString().split('T')[0],
        reviewsDia: index === 0 ? 0 : Math.max(0, snap.totalReviews - prevSnap.totalReviews),
        avgProductRating: Number(snap.averageProductRating.toFixed(2)),
        avgSellerRating: Number(snap.averageSellerRating.toFixed(2))
      };
    });

    if (chartData.length > 0) {
      chartData.shift();
    }

    return {
      ...currentData,
      chartData
    };
  } catch (e) {
    console.error("DB Feedback error:", e);
    return { ...currentData, chartData: [] };
  }
}

export async function getSellerAnalytics(days: string) {
  let currentData = { totalSellers: 0, totalProducts: 0, activeProducts: 0, totalStock: 0 };
  
  try {
    const res = await fetch(`${SELLER_URL}/api/seller/analytics?days=0`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (res.ok) {
      currentData = await res.json();
    }
  } catch (e) {
    console.error("Fetch Seller error:", e);
  }

  try {
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
    console.error("DB Seller error:", e);
    return { ...currentData, chartData: [] };
  }
}

export async function getShippingAnalytics(days: string) {
  let currentData = { distribution: {}, averageDemoraDias: 0 };

  try {
    const res = await fetch(`${SHIPPING_URL}/api/analytics?days=0`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (res.ok) {
      currentData = await res.json();
    }
  } catch (e) {
    console.error("Fetch Shipping error:", e);
  }

  try {
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

    const chartData = history.map((snap: any, index: number) => {
      const prevSnap = index > 0 ? history[index - 1] : snap;
      return {
        date: snap.fecha.toISOString().split('T')[0],
        pendientes: snap.pendientes,
        enTransito: snap.enTransito,
        entregados: index === 0 ? 0 : Math.max(0, snap.entregados - prevSnap.entregados),
        cancelados: index === 0 ? 0 : Math.max(0, snap.cancelados - prevSnap.cancelados),
        avgDeliveryDays: Number(snap.avgDeliveryDays.toFixed(2))
      };
    });

    // Remove the first item since it has no previous day delta (it acts as baseline)
    if (chartData.length > 0) {
      chartData.shift();
    }

    return {
      ...currentData,
      chartData
    };
  } catch (e) {
    console.error("DB Shipping error:", e);
    return { ...currentData, chartData: [] };
  }
}

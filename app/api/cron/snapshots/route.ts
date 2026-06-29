import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SELLER_URL = process.env.SELLER_API_URL || "http://localhost:3002";
const SHIPPING_URL = process.env.SHIPPING_API_URL || "http://localhost:3003";

export async function GET(request: Request) {
  // Proteger con Vercel Cron Secret
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 1. Fetch live data from Seller App
    const sellerRes = await fetch(`${SELLER_URL}/api/seller/analytics?days=0`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" }
    });
    
    if (sellerRes.ok) {
      const sellerData = await sellerRes.json();
      await prisma.sellerSnapshot.create({
        data: {
          totalSellers: sellerData.totalSellers || 0,
          totalProducts: sellerData.totalProducts || 0,
          activeProducts: sellerData.activeProducts || 0,
          totalStock: sellerData.totalStock || 0
        }
      });
    }

    // 2. Fetch live data from Shipping App
    const shippingRes = await fetch(`${SHIPPING_URL}/api/analytics?days=0`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" }
    });

    if (shippingRes.ok) {
      const shippingData = await shippingRes.json();
      const dist = shippingData.distribution || {};
      
      await prisma.shippingSnapshot.create({
        data: {
          pendientes: dist["CREADO"] || 0,
          enTransito: dist["RETIRADO"] || 0,
          entregados: dist["ENTREGADO"] || 0,
          cancelados: dist["CANCELADO"] || 0,
          avgDeliveryDays: shippingData.averageDemoraDias || 0
        }
      });
    }

    // 3. Fetch live data from Buyer App
    const BUYER_URL = process.env.BUYER_API_URL || "http://localhost:3000";
    const buyerRes = await fetch(`${BUYER_URL}/api/analytics?days=90`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" }
    });

    if (buyerRes.ok) {
      const buyerData = await buyerRes.json();
      await prisma.buyerSnapshot.create({
        data: {
          totalUsers: buyerData.totalUsers || 0,
          totalOrders: buyerData.totalOrders || 0,
          totalRevenue: buyerData.totalRevenue || 0,
          canceledOrders: buyerData.canceledOrders || 0
        }
      });
    }

    // 4. Fetch live data from Feedback App
    const FEEDBACK_URL = process.env.FEEDBACK_API_URL || "http://localhost:3001";
    const feedbackRes = await fetch(`${FEEDBACK_URL}/api/analytics?days=90`, {
      headers: { "api_key": process.env.FEEDBACK_API_KEY || "IAW" }
    });

    if (feedbackRes.ok) {
      const feedbackData = await feedbackRes.json();
      await prisma.feedbackSnapshot.create({
        data: {
          totalReviews: feedbackData.totalReviews || 0,
          averageProductRating: parseFloat(feedbackData.averageProductRating) || 0,
          averageSellerRating: parseFloat(feedbackData.averageSellerRating) || 0
        }
      });
    }

    return NextResponse.json({ success: true, message: "Snapshots created" });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ success: false, error: "Failed to create snapshots" }, { status: 500 });
  }
}

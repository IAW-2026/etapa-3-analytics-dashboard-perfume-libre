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

    return NextResponse.json({ success: true, message: "Snapshots created" });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ success: false, error: "Failed to create snapshots" }, { status: 500 });
  }
}

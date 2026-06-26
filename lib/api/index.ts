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
    const res = await fetch(`${SELLER_URL}/api/seller/analytics?days=${days}`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getShippingAnalytics(days: string) {
  try {
    const res = await fetch(`${SHIPPING_URL}/api/analytics?days=${days}`, {
      headers: { "api_key": process.env.SELLER_API_KEY || "IAW" },
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

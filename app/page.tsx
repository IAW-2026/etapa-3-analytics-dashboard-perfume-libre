import { 
  getBuyerAnalytics, 
  getFeedbackAnalytics, 
  getSellerAnalytics, 
  getShippingAnalytics 
} from "@/lib/api";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { LogisticsMetrics } from "@/components/dashboard/LogisticsMetrics";
import { FeedbackSummary } from "@/components/dashboard/FeedbackSummary";
import { StockHistoryChart } from "@/components/dashboard/StockHistoryChart";
import { ShippingHistoryChart } from "@/components/dashboard/ShippingHistoryChart";

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const days = typeof resolvedParams.days === 'string' ? resolvedParams.days : '90';

  // Fetch data in parallel
  const [buyer, feedback, seller, shipping] = await Promise.all([
    getBuyerAnalytics(days),
    getFeedbackAnalytics(days),
    getSellerAnalytics(days),
    getShippingAnalytics(days)
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview Global</h1>
        <p className="text-gray-500 mt-1">Métricas consolidadas del ecosistema Perfume Libre.</p>
      </div>
      
      {/* KPI Cards */}
      <KpiCards 
        totalUsers={buyer?.totalUsers || 0}
        totalRevenue={buyer?.totalRevenue || 0}
        totalOrders={buyer?.totalOrders || 0}
        canceledOrders={buyer?.canceledOrders || 0}
        totalProducts={seller?.activeProducts || 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Main Chart: Ventas (Ocupa todo el ancho o 3 columnas) */}
        <SalesChart data={buyer?.chartData || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Logística y Reputación Snapshot en vivo */}
        <LogisticsMetrics 
          distribution={shipping?.distribution || {}} 
          avgDemora={shipping?.averageDemoraDias || 0} 
        />
        <FeedbackSummary 
          avgProduct={feedback?.averageProductRating || 0}
          avgSeller={feedback?.averageSellerRating || 0}
          distribution={feedback?.distribution || {}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-6 mt-6">
        {/* Gráficas Históricas (Data Warehouse) */}
        <div className="col-span-1 md:col-span-4">
          <StockHistoryChart data={seller?.chartData || []} />
        </div>
        <div className="col-span-1 md:col-span-4">
          <ShippingHistoryChart data={shipping?.chartData || []} />
        </div>
      </div>
    </div>
  );
}

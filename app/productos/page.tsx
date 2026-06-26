import {
  getProductosKPIs,
  getTopProductos,
  getDistribucionCategorias,
  getUltimosProductos,
} from "@/lib/api/productosData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopProductsChart } from "@/components/productos/TopProductsChart";
import { CategoryDonutChart } from "@/components/productos/CategoryDonutChart";
import { CatalogTable } from "@/components/productos/CatalogTable";

function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          {value}
          {suffix}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ProductosPage() {
  const [kpis, topData, categoriaData, catalogoData] = await Promise.all([
    getProductosKPIs(),
    getTopProductos(),
    getDistribucionCategorias(),
    getUltimosProductos(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Catálogo</h1>
        <p className="text-gray-500 text-sm">
          Estado de las publicaciones y rendimiento de productos C2C.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Productos Históricos"
          value={kpis.total.toLocaleString("es-AR")}
        />
        <MetricCard
          title="Publicaciones Activas"
          value={kpis.activos.toLocaleString("es-AR")}
        />
        <MetricCard
          title="Publicaciones Pausadas"
          value={kpis.pausados.toLocaleString("es-AR")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <TopProductsChart data={topData} />
        <CategoryDonutChart data={categoriaData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <CatalogTable data={catalogoData} />
      </div>
    </div>
  );
}

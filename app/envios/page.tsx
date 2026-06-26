import {
  getEnviosKPIs,
  getDistribucionEstados,
  getEnviosPorOperador,
  getVolumenEnviosDia,
} from "@/lib/api/enviosData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShippingStatusDonut } from "@/components/envios/ShippingStatusDonut";
import { CarrierBarChart } from "@/components/envios/CarrierBarChart";
import { ShippingVolumeChart } from "@/components/envios/ShippingVolumeChart";

function MetricCard({
  title,
  value,
  suffix = "",
}: {
  title: string;
  value: string | number;
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
          {value}
          {suffix}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function EnviosPage() {
  const [kpis, estadosData, operadorData, volumenData] = await Promise.all([
    getEnviosKPIs(),
    getDistribucionEstados(),
    getEnviosPorOperador(),
    getVolumenEnviosDia(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Logística y Envíos
        </h1>
        <p className="text-gray-500 text-sm">
          Monitoreo de despachos, tiempos de entrega y distribución de carga.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Paquetes en Tránsito" value={kpis.enTransito} />
        <MetricCard title="Entregados Hoy" value={kpis.entregadosHoy} />
        <MetricCard
          title="Tiempo Promedio de Entrega"
          value={kpis.tiempoPromedio}
          suffix=" días"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <ShippingStatusDonut data={estadosData} />
        <CarrierBarChart data={operadorData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <ShippingVolumeChart data={volumenData} />
      </div>
    </div>
  );
}

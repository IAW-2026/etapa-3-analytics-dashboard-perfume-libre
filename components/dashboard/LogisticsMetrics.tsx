"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#6366f1', '#8b5cf6'];

const STATE_MAP: Record<string, string> = {
  CREADO: "Creado",
  PREPARANDO: "En preparación",
  RETIRADO: "Retirado",
  EN_TRANSITO: "En tránsito",
  ENTREGADO: "Entregado",
  NO_ENTREGADO: "No entregado",
  CANCELADO: "Cancelado"
};

const COLOR_MAP: Record<string, string> = {
  CREADO: '#94a3b8',      // Gris
  PREPARANDO: '#f59e0b',  // Naranja
  RETIRADO: '#3b82f6',    // Azul
  EN_TRANSITO: '#8b5cf6', // Violeta
  ENTREGADO: '#10b981',   // Verde
  NO_ENTREGADO: '#ef4444', // Rojo
  CANCELADO: '#475569'    // Gris Oscuro
};

export function LogisticsMetrics({ distribution, avgDemora }: { distribution: Record<string, number>, avgDemora: number }) {
  const data = Object.keys(distribution || {}).map((key, index) => ({
    name: STATE_MAP[key] || key,
    value: distribution[key],
    color: COLOR_MAP[key] || COLORS[index % COLORS.length]
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Estado de Envíos</CardTitle>
        <CardDescription>Distribución actual de las órdenes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full flex items-center justify-center relative">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#374151', fontWeight: 'bold' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400">Sin datos de envíos</div>
          )}
          
          {data.length > 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-3 text-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-800">{avgDemora}</span>
              <span className="block text-xs text-gray-500">días prom.</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

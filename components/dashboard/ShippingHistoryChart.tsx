"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function ShippingHistoryChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="col-span-4 mt-6">
        <CardHeader>
          <CardTitle>Historial de Logística</CardTitle>
          <CardDescription>No hay datos suficientes (Snapshots) para mostrar.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="col-span-4 mt-6">
      <CardHeader>
        <CardTitle>Flujo de Logística</CardTitle>
        <CardDescription>
          Estado de los paquetes a través del tiempo.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              />
              <Legend />
              <Bar dataKey="pendientes" name="Pendientes" stackId="a" fill="#f59e0b" />
              <Bar dataKey="enTransito" name="En Camino" stackId="a" fill="#3b82f6" />
              <Bar dataKey="entregados" name="Entregados" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

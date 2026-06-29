"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function StockHistoryChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="col-span-4 mt-6">
        <CardHeader>
          <CardTitle>Historial de Inventario</CardTitle>
          <CardDescription>No hay datos suficientes (Snapshots) para mostrar.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="col-span-4 mt-6">
      <CardHeader>
        <CardTitle>Evolución del Stock</CardTitle>
        <CardDescription>
          Volumen total de stock físico a través del tiempo.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="totalStock" name="Stock Total" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorStock)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

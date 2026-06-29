"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function FeedbackHistoryChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-full h-full">
      <CardHeader>
        <CardTitle>Volumen y Satisfacción de Reseñas (Feedback)</CardTitle>
        <CardDescription>Cantidad de reseñas por día vs Rating promedio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getDate()}/${d.getMonth()+1}`;
                  }}
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#3b82f6" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}`}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#f59e0b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 5]}
                  tickFormatter={(val) => `${val}★`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="reviewsDia" name="Nuevas Reseñas" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="avgProductRating" name="Rating Productos" stroke="#f59e0b" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="avgSellerRating" name="Rating Vendedores" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">Sin datos históricos</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star } from "lucide-react";

export function FeedbackSummary({ 
  avgProduct, 
  avgSeller, 
  distribution 
}: { 
  avgProduct: number, 
  avgSeller: number, 
  distribution: Record<string, number> 
}) {
  const data = Object.keys(distribution || {}).map(key => ({
    stars: `${key} Estrellas`,
    count: distribution[key]
  })).reverse();

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Reputación Global</CardTitle>
        <CardDescription>Satisfacción de los usuarios (productos y vendedores)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex mb-6 space-x-8">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Promedio Productos</span>
            <div className="flex items-center text-3xl font-bold text-amber-500">
              {avgProduct}
              <Star className="ml-2 w-6 h-6 fill-amber-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Promedio Vendedores</span>
            <div className="flex items-center text-3xl font-bold text-amber-500">
              {avgSeller}
              <Star className="ml-2 w-6 h-6 fill-amber-500" />
            </div>
          </div>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
              <XAxis type="number" hide />
              <YAxis dataKey="stars" type="category" axisLine={false} tickLine={false} width={80} fontSize={12} />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

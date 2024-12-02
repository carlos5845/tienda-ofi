"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Camiseta Básica', ventas: 250 },
  { name: 'Jeans Slim Fit', ventas: 180 },
  { name: 'Vestido de Noche', ventas: 120 },
  { name: 'Chaqueta de Cuero', ventas: 90 },
  { name: 'Zapatos Deportivos', ventas: 150 },
]

export function GraficoProductosVendidos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prendas Más Vendidas</CardTitle>
      </CardHeader>
      <CardContent className="w-full aspect-[4/3]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


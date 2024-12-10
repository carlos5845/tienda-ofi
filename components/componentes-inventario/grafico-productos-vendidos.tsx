"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase";

import { ProductoVendido } from "@/types/database";
export function GraficoProductosVendidos() {
  const [data, setData] = useState([]);

  // Función para obtener los datos desde Supabase
  const fetchData = async () => {
    const { data, error } = await supabase.rpc(
      "obtener_top_10_productos_vendidos"
    );

    if (error) {
      console.error(
        "Error obteniendo los productos más vendidos:",
        error.message
      );
      return;
    }

    // Ajusta los datos para el gráfico
    const formattedData = data.map((item: ProductoVendido) => ({
      name: item.producto, // Producto
      ventas: Number(item.total_vendido), // Total vendido convertido a número
    }));

    setData(formattedData);
  };

  // Llamada a fetchData al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

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
  );
}

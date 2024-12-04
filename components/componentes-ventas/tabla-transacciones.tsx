"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { Venta } from "@/types/database"; // Asegúrate de importar el tipo correcto

export function TablaTransacciones() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVentas = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("ventas").select("*");
    if (error) {
      console.error("Error al cargar ventas:", error);
      return;
    }
    setVentas(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  if (loading) {
    return <p>Cargando ventas...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente ID</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ventas.map((venta) => (
          <TableRow key={venta.venta_id}>
            <TableCell>{venta.cliente_id}</TableCell>
            <TableCell>${venta.monto.toFixed(2)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  venta.estado === "completada"
                    ? "success"
                    : venta.estado === "pendiente"
                    ? "warning"
                    : "destructive"
                }
              >
                {venta.estado}
              </Badge>
            </TableCell>
            <TableCell>{venta.fecha}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

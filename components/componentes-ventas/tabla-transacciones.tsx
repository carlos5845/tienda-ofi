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

    // Primero, obtenemos las ventas
    const { data: ventasData, error: ventasError } = await supabase
      .from("ventas")
      .select("venta_id, cliente_id, fecha, monto, estado");

    if (ventasError) {
      console.error("Error al cargar ventas:", ventasError);
      setLoading(false);
      return;
    }

    // Luego, obtenemos los clientes, usando los 'cliente_id' de las ventas
    const clienteIds = ventasData.map((venta) => venta.cliente_id);
    const { data: clientesData, error: clientesError } = await supabase
      .from("clientes")
      .select("cliente_id, nombre")
      .in("cliente_id", clienteIds);

    if (clientesError) {
      console.error("Error al cargar clientes:", clientesError);
      setLoading(false);
      return;
    }

    // Asociar los nombres de los clientes a las ventas
    const ventasConClientes = ventasData.map((venta) => {
      const cliente = clientesData.find(
        (cliente) => cliente.cliente_id === venta.cliente_id
      );
      return {
        ...venta,
        clienteNombre: cliente ? cliente.nombre : "Desconocido",
      };
    });

    setVentas(ventasConClientes);
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
          <TableHead>Cliente</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ventas.map((venta) => (
          <TableRow key={venta.venta_id}>
            <TableCell>{venta.clienteNombre}</TableCell>
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
//asdasd

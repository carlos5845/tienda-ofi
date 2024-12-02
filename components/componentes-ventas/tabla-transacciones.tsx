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

type Transaccion = {
  id: string;
  cliente: string;
  monto: number;
  estado: "completada" | "pendiente" | "cancelada";
  fecha: string;
};

const transacciones: Transaccion[] = [
  {
    id: "1",
    cliente: "Juan Pérez",
    monto: 150.0,
    estado: "completada",
    fecha: "2023-07-01",
  },
  {
    id: "2",
    cliente: "María García",
    monto: 75.5,
    estado: "pendiente",
    fecha: "2023-07-02",
  },
  {
    id: "3",
    cliente: "Carlos López",
    monto: 200.0,
    estado: "completada",
    fecha: "2023-07-03",
  },
  {
    id: "4",
    cliente: "Ana Martínez",
    monto: 50.0,
    estado: "cancelada",
    fecha: "2023-07-04",
  },
  {
    id: "5",
    cliente: "Pedro Sánchez",
    monto: 125.75,
    estado: "completada",
    fecha: "2023-07-05",
  },
];

export function TablaTransacciones() {
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
        {transacciones.map((transaccion) => (
          <TableRow key={transaccion.id}>
            <TableCell>{transaccion.cliente}</TableCell>
            <TableCell>${transaccion.monto.toFixed(2)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  transaccion.estado === "completada"
                    ? "success"
                    : transaccion.estado === "pendiente"
                      ? "warning"
                      : "destructive"
                }
              >
                {transaccion.estado}
              </Badge>
            </TableCell>
            <TableCell>{transaccion.fecha}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { Cliente } from "@/types/database";

export default function ClientTable() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const fetchClientes = async () => {
    const { data, error } = await supabase.from("clientes").select("*");
    if (error) {
      console.error("Error al cargar los clientes:", error);
    } else {
      setClientes(data || []);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Table>
      <TableCaption>Lista de clientes registrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Fecha de Registro</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{cliente.telefono}</TableCell>
              <TableCell>{cliente.fecha_registro}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No hay clientes registrados.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

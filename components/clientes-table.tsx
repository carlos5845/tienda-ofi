"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, User } from "lucide-react";

// Tipo para un cliente
type Cliente = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fechaRegistro: string;
};

// Datos de ejemplo
const clientes: Cliente[] = [
  {
    id: "1",
    nombre: "Juan Pérez",
    email: "juan@example.com",
    telefono: "123-456-7890",
    fechaRegistro: "2023-01-15",
  },
  {
    id: "2",
    nombre: "María García",
    email: "maria@example.com",
    telefono: "098-765-4321",
    fechaRegistro: "2023-02-20",
  },
  {
    id: "3",
    nombre: "Carlos López",
    email: "carlos@example.com",
    telefono: "555-555-5555",
    fechaRegistro: "2023-03-10",
  },
  // Agrega más clientes aquí...
];

export function ClientesTable() {
  const [clientesData, setClientesData] = useState<Cliente[]>(clientes);

  const handleDelete = (id: string) => {
    setClientesData(clientesData.filter((cliente) => cliente.id !== id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Fecha de Registro</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientesData.map((cliente) => (
          <TableRow key={cliente.id}>
            <TableCell className="font-medium">{cliente.nombre}</TableCell>
            <TableCell>{cliente.email}</TableCell>
            <TableCell>{cliente.telefono}</TableCell>
            <TableCell>{cliente.fechaRegistro}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => console.log("Ver detalles", cliente.id)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Ver detalles</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => console.log("Editar", cliente.id)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(cliente.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Trash2 } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

type Factura = {
  id: string
  numero: string
  cliente: string
  monto: number
  estado: "pagada" | "pendiente" | "vencida"
  fechaEmision: string
  fechaVencimiento: string
}

const facturas: Factura[] = [
  { id: "1", numero: "FAC-001", cliente: "Juan Pérez", monto: 1500.00, estado: "pagada", fechaEmision: "2023-07-01", fechaVencimiento: "2023-07-31" },
  { id: "2", numero: "FAC-002", cliente: "María García", monto: 2750.50, estado: "pendiente", fechaEmision: "2023-07-05", fechaVencimiento: "2023-08-04" },
  { id: "3", numero: "FAC-003", cliente: "Carlos López", monto: 1000.00, estado: "vencida", fechaEmision: "2023-06-15", fechaVencimiento: "2023-07-15" },
  { id: "4", numero: "FAC-004", cliente: "Ana Martínez", monto: 3500.00, estado: "pendiente", fechaEmision: "2023-07-10", fechaVencimiento: "2023-08-09" },
  { id: "5", numero: "FAC-005", cliente: "Pedro Sánchez", monto: 1250.75, estado: "pagada", fechaEmision: "2023-07-12", fechaVencimiento: "2023-08-11" },
]

export function ListaFacturas() {
  const [facturasData, setFacturasData] = useState<Factura[]>(facturas)

  const handleDelete = (id: string) => {
    setFacturasData(facturasData.filter(factura => factura.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha de Emisión</TableHead>
          <TableHead>Fecha de Vencimiento</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facturasData.map((factura) => (
          <TableRow key={factura.id}>
            <TableCell className="font-medium">{factura.numero}</TableCell>
            <TableCell>{factura.cliente}</TableCell>
            <TableCell>${factura.monto.toFixed(2)}</TableCell>
            <TableCell>
              <Badge variant={
                factura.estado === "pagada" ? "success" :
                factura.estado === "pendiente" ? "warning" : "destructive"
              }>
                {factura.estado}
              </Badge>
            </TableCell>
            <TableCell>{factura.fechaEmision}</TableCell>
            <TableCell>{factura.fechaVencimiento}</TableCell>
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
                  <DropdownMenuItem onClick={() => console.log("Ver factura", factura.id)}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Ver factura</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(factura.id)}>
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
  )
}


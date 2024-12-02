"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

type Producto = {
  id: string
  nombre: string
  categoria: string
  talla: string
  precio: number
  stock: number
  estado: "En stock" | "Bajo stock" | "Agotado"
}

const productos: Producto[] = [
  { id: "1", nombre: "Camiseta Básica", categoria: "Camisetas", talla: "M", precio: 19.99, stock: 100, estado: "En stock" },
  { id: "2", nombre: "Jeans Slim Fit", categoria: "Pantalones", talla: "32", precio: 49.99, stock: 50, estado: "En stock" },
  { id: "3", nombre: "Vestido de Noche", categoria: "Vestidos", talla: "S", precio: 79.99, stock: 5, estado: "Bajo stock" },
  { id: "4", nombre: "Chaqueta de Cuero", categoria: "Chaquetas", talla: "L", precio: 129.99, stock: 0, estado: "Agotado" },
  { id: "5", nombre: "Zapatos Deportivos", categoria: "Calzado", talla: "40", precio: 89.99, stock: 25, estado: "En stock" },
]

export function TablaProductos() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar prendas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button className="ml-4">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Talla</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell className="font-medium">{producto.nombre}</TableCell>
              <TableCell>{producto.categoria}</TableCell>
              <TableCell>{producto.talla}</TableCell>
              <TableCell>${producto.precio.toFixed(2)}</TableCell>
              <TableCell>{producto.stock}</TableCell>
              <TableCell>
                <Badge variant={
                  producto.estado === "En stock" ? "success" :
                  producto.estado === "Bajo stock" ? "warning" : "destructive"
                }>
                  {producto.estado}
                </Badge>
              </TableCell>
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
                    <DropdownMenuItem onClick={() => console.log("Editar", producto.id)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Eliminar", producto.id)}>
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


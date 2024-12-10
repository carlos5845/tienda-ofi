"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase"; // Configuración de Supabase
import { Inventario } from "@/types/database"; // Tus tipos
import { EditarProducto } from "./EditarProducto";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
export function TablaProductos() {
  const [productos, setProductos] = useState<Inventario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [productoEditando, setProductoEditando] = useState<Inventario | null>(
    null
  );

  // Filtra productos basándose en el término de búsqueda
  const filteredProducts = productos.filter((producto) =>
    producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para cargar productos desde Supabase
  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("inventario").select("*");

    if (error) {
      console.error("Error al cargar productos:", error);
      alert("Error al cargar los productos.");
    } else {
      setProductos(data || []);
    }
    setLoading(false);
  };

  // Función para eliminar un producto
  const deleteProducto = async (producto_id: number) => {
    const confirmDelete = confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    const { error } = await supabase
      .from("inventario")
      .delete()
      .eq("producto_id", producto_id);

    if (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar el producto.");
    } else {
      alert("Producto eliminado con éxito.");
      fetchProductos(); // Actualiza la lista
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos(); // Carga productos al montar el componente
  }, []);

  return (
    <div className="">
      <Dialog
        open={!!productoEditando}
        onOpenChange={(open) => !open && setProductoEditando(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {productoEditando && (
            <EditarProducto
              producto={productoEditando}
              onClose={() => setProductoEditando(null)}
              onUpdate={fetchProductos}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-end py-4">
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button className="ml-4" onClick={fetchProductos} disabled={loading}>
          <Search className="mr-2 h-4 w-4" />
          {loading ? "Cargando..." : "Buscar"}
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((producto) => (
              <TableRow key={producto.producto_id}>
                <TableCell className="font-medium">
                  {producto.nombre_producto}
                </TableCell>
                <TableCell>{producto.categoria}</TableCell>
                <TableCell>{producto.talla}</TableCell>
                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      producto.estado === "en stock"
                        ? "success"
                        : producto.estado === "bajo stock"
                          ? "warning"
                          : "destructive"
                    }
                  >
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

                      <DropdownMenuItem
                        onClick={() => setProductoEditando(producto)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteProducto(producto.producto_id)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No hay productos disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

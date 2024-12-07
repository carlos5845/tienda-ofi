"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Inventario } from "@/types/database";

type EditarProductoProps = {
  producto: Inventario | null; // Producto a editar
  onClose: () => void; // Función para cerrar el formulario
  onUpdate: () => void; // Función para recargar la lista de productos
};

export function EditarProducto({
  producto,
  onClose,
  onUpdate,
}: EditarProductoProps) {
  const [formData, setFormData] = useState<Inventario | null>(producto);
  const [loading, setLoading] = useState(false);

  // Maneja cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    });
  };

  // Actualiza el producto en la base de datos
  const updateProducto = async () => {
    if (!formData) return;

    setLoading(true);
    const { error } = await supabase
      .from("inventario")
      .update({
        nombre_producto: formData.nombre_producto,
        categoria: formData.categoria,
        talla: formData.talla,
        precio: formData.precio,
        stock: formData.stock,
        estado: formData.estado,
      })
      .eq("producto_id", formData.producto_id);

    setLoading(false);

    if (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar el producto.");
    } else {
      alert("Producto actualizado con éxito.");
      onUpdate(); // Refresca la lista de productos
      onClose(); // Cierra el formulario
    }
  };

  if (!formData) return null;

  return (
    <div className="p-2 ">
      <div className="space-y-4">
        <div>
          <label>Nombre</label>
          <Input
            name="nombre_producto"
            type="text"
            value={formData.nombre_producto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoría</label>
          <Input
            name="categoria"
            type="text"
            value={formData.categoria}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Talla</label>
          <Input
            name="talla"
            type="text"
            value={formData.talla}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio</label>
          <Input
            name="precio"
            type="number"
            step="0.01"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock</label>
          <Input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado</label>
          <Input
            name="estado"
            type="text"
            value={formData.estado}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={updateProducto} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

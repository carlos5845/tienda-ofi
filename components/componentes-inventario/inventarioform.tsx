"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function InventarioForm() {
  const [nombre_producto, setnombreProducto] = useState("");
  const [categoria, setcategoria] = useState("");
  const [talla, settalla] = useState("");
  const [precio, setprecio] = useState("");
  const [stock, setstock] = useState("");
  const [estado, setestado] = useState("");
  const handleSubmit = async () => {
    if (
      !nombre_producto ||
      !categoria ||
      !talla ||
      !precio ||
      !stock ||
      !estado
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const { error } = await supabase
      .from("inventario")
      .insert([{ nombre_producto, categoria, talla, precio, stock, estado }]);
    if (error) {
      console.error("Error al agregar producto", error);
      alert(`Error al cargar producto: ${error.message}`);
    } else {
      alert("Producto agregado con exito");
      setnombreProducto("");
      setcategoria("");
      settalla("");
      setprecio("");
      setstock("");
      setestado("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nombre del Producto"
          value={nombre_producto}
          onChange={(e) => setnombreProducto(e.target.value)}
        />
        <Input
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setcategoria(e.target.value)}
        />
        <Input
          placeholder="Talla"
          value={talla}
          onChange={(e) => settalla(e.target.value)}
        />
        <Input
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={(e) => setprecio(e.target.value)}
        />
        <Input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setstock(e.target.value)}
        />
        <Input
          placeholder="Estado"
          value={estado}
          onChange={(e) => setestado(e.target.value)}
        />
        <Button type="submit">Agregar Producto</Button>
      </form>
    </div>
  );
}

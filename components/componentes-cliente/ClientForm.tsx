"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function ClientForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha_registro, setFechaRegistro] = useState("");

  const handleSubmit = async () => {
    if (!nombre || !telefono || !email || !fecha_registro) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const { error } = await supabase
      .from("clientes")
      .insert([{ nombre, telefono, email, fecha_registro }]);

    if (error) {
      console.error("Error al agregar cliente:", error);
      alert("Hubo un error al agregar el cliente.");
    } else {
      alert("Cliente agregado con éxito.");
      setNombre("");
      setTelefono("");
      setEmail("");
      setFechaRegistro("");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <form className="space-y-4">
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del cliente"
          />
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
          />
        </div>
        <div>
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          />
        </div>
        <div>
          <Label htmlFor="fecha_registro">Fecha de Registro</Label>
          <Input
            id="fecha_registro"
            type="date"
            value={fecha_registro}
            onChange={(e) => setFechaRegistro(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>Agregar Cliente</Button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FormularioVentas({ onRefresh }: { onRefresh: () => void }) {
  const [cliente_id, setClienteId] = useState("");
  const [monto, setMonto] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [fecha, setFecha] = useState("");

  const agregarVenta = async () => {
    const { error } = await supabase.from("ventas").insert([
      {
        cliente_id: parseInt(cliente_id, 10),
        monto: parseFloat(monto),
        estado,
        fecha,
      },
    ]);

    if (error) {
      console.error("Error al agregar venta:", error);
      alert("Error al agregar la venta.");
    } else {
      alert("Venta agregada con éxito.");
      onRefresh();
      setClienteId("");
      setMonto("");
      setEstado("pendiente");
      setFecha("");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="ID del Cliente"
        value={cliente_id}
        onChange={(e) => setClienteId(e.target.value)}
      />
      <Input
        placeholder="Monto"
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <Input
        placeholder="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />
      <Input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <Button onClick={agregarVenta}>Agregar Venta</Button>
    </div>
  );
}
///asdasd

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormularioVentas({ onRefresh }: { onRefresh: () => void }) {
  const [clientes, setClientes] = useState<any[]>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(true);
  const [cliente_id, setClienteId] = useState("");
  const [monto, setMonto] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [fecha, setFecha] = useState("");

  // Cargar la lista de clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      setIsLoadingClientes(true);
      const { data, error } = await supabase
        .from("clientes")
        .select("cliente_id, nombre");

      if (error) {
        console.error("Error al cargar los clientes:", error);
      } else {
        setClientes(data || []);
      }

      setIsLoadingClientes(false);
    };

    fetchClientes();
  }, []);

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
      {/* Selector de Cliente */}
      <div>
        <label className="block mb-1 text-sm font-medium">Cliente</label>
        <Select
          onValueChange={(value) => setClienteId(value)}
          value={cliente_id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un cliente" />
          </SelectTrigger>
          <SelectContent>
            {isLoadingClientes ? (
              <div className="px-2 py-1 text-sm text-gray-500">
                Cargando clientes...
              </div>
            ) : clientes.length > 0 ? (
              clientes.map((cliente) => (
                <SelectItem
                  key={cliente.cliente_id}
                  value={cliente.cliente_id.toString()}
                >
                  {cliente.nombre}
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-1 text-sm text-gray-500">
                No hay clientes disponibles
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Campos restantes */}
      <Input
        placeholder="Monto"
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <div>
        <label className="block mb-1 text-sm font-medium">Estado</label>
        <Select onValueChange={(value) => setEstado(value)} value={estado}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendiente">pendiente</SelectItem>
            <SelectItem value="completada">completada</SelectItem>
            <SelectItem value="cancelada">cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <Button onClick={agregarVenta} disabled={!cliente_id}>
        Agregar Venta
      </Button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Asegúrate de tener esta configuración
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Asegúrate de tener el componente Input importado
import { Facturas } from "@/types/database";

export function FormularioEditarFactura({
  factura,
  onClose,
}: {
  factura: Facturas;
  onClose: () => void;
}) {
  const [numeroFactura, setNumeroFactura] = useState(factura.numero_factura);
  const [clienteId, setClienteId] = useState(factura.cliente_id);
  const [montoTotal, setMontoTotal] = useState(factura.monto_total);
  const [estado, setEstado] = useState(factura.estado);
  const [fechaEmision, setFechaEmision] = useState(factura.fecha_emision);
  const [fechaVencimiento, setFechaVencimiento] = useState(
    factura.fecha_vencimiento
  );
  const [clientes, setClientes] = useState<{ id: number; nombre: string }[]>(
    []
  ); // Lista de clientes

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const { data, error } = await supabase
          .from("clientes")
          .select("id, nombre");
        if (error) throw error;
        setClientes(data || []);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("facturas")
        .update({
          numero_factura: numeroFactura,
          cliente_id: clienteId,
          monto_total: montoTotal,
          estado,
          fecha_emision: fechaEmision,
          fecha_vencimiento: fechaVencimiento,
        })
        .eq("factura_id", factura.factura_id);
      if (error) throw error;
      onClose(); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Error updating factura:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cliente</label>
        <select
          value={clienteId}
          onChange={(e) => setClienteId(Number(e.target.value))} // Cambiar cliente
        >
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Número de Factura</label>
        <Input
          type="text"
          value={numeroFactura}
          onChange={(e) => setNumeroFactura(e.target.value)}
        />
      </div>

      <div>
        <label>Monto Total</label>
        <Input
          type="number"
          value={montoTotal}
          onChange={(e) => setMontoTotal(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="pagada">Pagada</option>
          <option value="vencida">Vencida</option>
        </select>
      </div>

      <div>
        <label>Fecha de Emisión</label>
        <Input
          type="date"
          value={fechaEmision}
          onChange={(e) => setFechaEmision(e.target.value)}
        />
      </div>

      <div>
        <label>Fecha de Vencimiento</label>
        <Input
          type="date"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
        />
      </div>

      <div>
        <Button type="submit">Guardar</Button>
        <Button type="button" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </form>
  );
}

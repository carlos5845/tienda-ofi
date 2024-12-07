import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Asegúrate de configurar Supabase correctamente

interface EstadisticaProps {
  title: string;
  value: string;
  change: number;
}

function Estadistica({ title, value, change }: EstadisticaProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {change > 0 ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change > 0 ? "+" : ""}
          {change}% desde el último mes
        </p>
      </CardContent>
    </Card>
  );
}

export function ResumenVentas() {
  const [estadisticas, setEstadisticas] = useState({
    ventasTotales: "$0",
    nuevosClientes: "0",
    ticketPromedio: "$0",
    tasaCancelacion: "0",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        // Llamar a las funciones SQL de Supabase
        const { data: ventasTotales } = await supabase.rpc(
          "obtener_ventas_totales"
        );
        const { data: nuevosClientes } = await supabase.rpc(
          "obtener_nuevos_clientes"
        );
        const { data: ticketPromedio } = await supabase.rpc(
          "obtener_ticket_promedio"
        );
        const { data: tasaCancelacion } = await supabase.rpc(
          "obtener_tasa_cancelaciones"
        );
        // Actualizar el estado con los datos obtenidos
        setEstadisticas({
          ventasTotales: `$${ventasTotales.toFixed(2)}`,
          nuevosClientes: `${nuevosClientes}`,
          ticketPromedio: `$${ticketPromedio.toFixed(2)}`,
          tasaCancelacion: `${tasaCancelacion.toFixed(2)}`,
        });
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarEstadisticas();
  }, []);

  if (loading) {
    return <div>Cargando estadísticas...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Estadistica
        title="Ventas Totales"
        value={estadisticas.ventasTotales}
        change={20.1}
      />
      <Estadistica
        title="Nuevos Clientes"
        value={estadisticas.nuevosClientes}
        change={1}
      />
      <Estadistica
        title="Ticket Promedio"
        value={estadisticas.ticketPromedio}
        change={12.7}
      />
      <Estadistica
        title="Tasa de Cancelacion"
        value={estadisticas.tasaCancelacion}
        change={13.5}
      />
    </div>
  );
}

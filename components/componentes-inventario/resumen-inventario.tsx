"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShirtIcon,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface EstadisticaInventarioProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

function EstadisticaInventario({
  title,
  value,
  icon,
  description,
}: EstadisticaInventarioProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function ResumenInventario() {
  const [totalPrendas, setTotalPrendas] = useState<string>("0");
  const [prendasAgotadas, setPrendasAgotadas] = useState<string>("0");
  const [prendaMasVendida, setPrendaMasVendida] = useState<string>("0");
  const [prendaMenosVendida, setPrendaMenosVendida] = useState<string>("0");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const [
          { data: totalPrendasData, error: totalError },
          { data: prendasAgotadasData, error: agotadasError },
          { data: prendaMasVendidaData, error: vendidaError },
          { data: prendaMenosVendidaData, error: menosVendidaError },
        ] = await Promise.all([
          supabase.rpc("obtener_total_prendas"),
          supabase.rpc("obtener_prendas_agotadas"),
          supabase.rpc("obtener_prenda_mas_vendida"),
          supabase.rpc("obtener_prenda_menos_vendida"),
        ]);

        // Manejo de errores
        if (totalError || agotadasError || vendidaError || menosVendidaError) {
          console.error("Errores en las funciones de Supabase:", {
            totalError,
            agotadasError,
            vendidaError,
            menosVendidaError,
          });
          setError("Hubo un problema al cargar las estadísticas.");
          return;
        }

        // Asignar resultados con validación
        setTotalPrendas(totalPrendasData?.toString() || "0");
        setPrendasAgotadas(prendasAgotadasData?.toString() || "0");
        setPrendaMasVendida(
          prendaMasVendidaData?.[0]?.producto_id?.toString() || "No disponible"
        );
        setPrendaMenosVendida(
          prendaMenosVendidaData?.[0]?.producto_id?.toString() ||
            "No disponible"
        );
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
        setError("Error interno al cargar las estadísticas.");
      }
    };

    cargarEstadisticas();
  }, []);

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EstadisticaInventario
        title="Total de Prendas"
        value={totalPrendas}
        icon={<ShirtIcon className="h-4 w-4 text-muted-foreground" />}
        description="Prendas en inventario"
      />
      <EstadisticaInventario
        title="Prendas Agotadas"
        value={prendasAgotadas}
        icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
        description="Necesitan reabastecimiento"
      />
      <EstadisticaInventario
        title="Prenda Más Vendida"
        value={prendaMasVendida}
        icon={<TrendingUp className="h-4 w-4 text-green-500" />}
        description="Producto con mayor cantidad vendida"
      />
      <EstadisticaInventario
        title="Prenda Menos Vendida"
        value={prendaMenosVendida}
        icon={<TrendingDown className="h-4 w-4 text-red-500" />}
        description="Producto con menor cantidad vendida"
      />
    </div>
  );
}

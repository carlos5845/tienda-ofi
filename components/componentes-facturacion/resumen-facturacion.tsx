"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export function ResumenFacturacion() {
  const [totalFacturado, setTotalFacturado] = useState<string>("0");
  const [facturasPendientes, setFacturasPendientes] = useState<string>("0");
  const [facturasVencidas, setFacturasVencidas] = useState<string>("0");
  const [porcentajePagadas, setPorcentajePagadas] = useState<string>("0");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const [
          { data: totalFacturadoData, error: totalError },
          { data: facturasPendientesData, error: pendientesError },
          { data: facturasVencidasData, error: vencidasError },
          { data: porcentajePagadasData, error: pagadasError },
        ] = await Promise.all([
          supabase.rpc("obtener_total_facturado"),
          supabase.rpc("obtener_facturas_pendientes"),
          supabase.rpc("obtener_facturas_vencidas"),
          supabase.rpc("obtener_porcentaje_facturas_pagadas"),
        ]);

        // Manejo de errores
        if (totalError || pendientesError || vencidasError || pagadasError) {
          console.error("Errores en las funciones de Supabase:", {
            totalError,
            pendientesError,
            vencidasError,
            pagadasError,
          });
          setError("Hubo un problema al cargar las estadísticas.");
          return;
        }

        // Asignar valores
        setTotalFacturado(`$${(totalFacturadoData || 0).toFixed(2)}`);
        setFacturasPendientes(facturasPendientesData?.toString() || "0");
        setFacturasVencidas(facturasVencidasData?.toString() || "0");
        setPorcentajePagadas(`${(porcentajePagadasData || 0).toFixed(2)}%`);
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Facturado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFacturado}</div>
          <p className="text-xs text-muted-foreground">
            Total de ingresos generados.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Facturas Pendientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{facturasPendientes}</div>
          <p className="text-xs text-muted-foreground">
            Facturas aún no pagadas.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Facturas Vencidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{facturasVencidas}</div>
          <p className="text-xs text-muted-foreground">
            Facturas con fecha de vencimiento superada.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Porcentaje de Facturas Pagadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{porcentajePagadas}</div>
          <p className="text-xs text-muted-foreground">
            Proporción de facturas pagadas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

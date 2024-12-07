"use client";
import { ResumenVentas } from "@/components/componentes-ventas/resumen-ventas";
import { GraficoVentas } from "@/components/componentes-ventas/grafico-ventas";
import { TablaTransacciones } from "@/components/componentes-ventas/tabla-transacciones";
import { FormularioVentas } from "@/components/componentes-ventas/FormularioVentas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export default function VentasPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshVentas = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Agregar venta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Venta</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* Formulario para agregar nuevas ventas */}
          <div className="mb-8">
            <FormularioVentas onRefresh={refreshVentas} />
          </div>
        </DialogContent>
      </Dialog>
      {/* Resumen de ventas */}
      <ResumenVentas />

      {/* Gráfico y transacciones */}
      <div className="grid gap-4 ">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Transacciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Recargar la tabla al agregar una nueva venta */}
            <TablaTransacciones key={refreshKey} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
//asdasd

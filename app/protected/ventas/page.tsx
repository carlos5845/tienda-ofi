import { ResumenVentas } from "@/components/resumen-ventas";
import { GraficoVentas } from "@/components/grafico-ventas";
import { TablaTransacciones } from "@/components/tabla-transacciones";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VentasPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
      <ResumenVentas />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <GraficoVentas />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Transacciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <TablaTransacciones />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

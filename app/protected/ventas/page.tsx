import { ResumenVentas } from "@/components/componentes-ventas/resumen-ventas";
import { GraficoVentas } from "@/components/componentes-ventas/grafico-ventas";
import { TablaTransacciones } from "@/components/componentes-ventas/tabla-transacciones";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VentasPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
      <ResumenVentas />
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-6">
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

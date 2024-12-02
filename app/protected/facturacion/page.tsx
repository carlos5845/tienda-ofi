import { ResumenFacturacion } from "@/components/componentes-facturacion/resumen-facturacion";
import { ListaFacturas } from "@/components/componentes-facturacion/lista-facturas";
import { FormularioFactura } from "@/components/componentes-facturacion/formulario-factura";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FacturacionPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Facturación</h2>
      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="facturas">Facturas</TabsTrigger>
          <TabsTrigger value="nueva">Nueva Factura</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen" className="space-y-4">
          <ResumenFacturacion />
          <Card>
            <CardHeader>
              <CardTitle>Facturas Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ListaFacturas />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="facturas">
          <Card>
            <CardHeader>
              <CardTitle>Todas las Facturas</CardTitle>
            </CardHeader>
            <CardContent>
              <ListaFacturas />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nueva">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Factura</CardTitle>
            </CardHeader>
            <CardContent>
              <FormularioFactura />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

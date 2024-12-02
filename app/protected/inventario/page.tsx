import { ResumenInventario } from "@/components/componentes-inventario/resumen-inventario";
import { TablaProductos } from "@/components/componentes-inventario/tabla-productos";
import { GraficoProductosVendidos } from "@/components/componentes-inventario/grafico-productos-vendidos";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function InventarioPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Inventario de Ropa
        </h2>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Prenda
          </Button>
        </div>
      </div>
      <ResumenInventario />
      <div className="grid gap-4 grid-cols-1">
        <TablaProductos />
        <GraficoProductosVendidos/>
      </div>
    </div>
  );
}

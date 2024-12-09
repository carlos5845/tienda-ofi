import { ResumenInventario } from "@/components/componentes-inventario/resumen-inventario";
import { TablaProductos } from "@/components/componentes-inventario/tabla-productos";
import { GraficoProductosVendidos } from "@/components/componentes-inventario/grafico-productos-vendidos";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import InventarioForm from "@/components/componentes-inventario/inventarioform";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
export default function InventarioPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Inventario de Ropa
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Agregar producto</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar nuevo producto</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {/* Formulario para agregar nuevas ventas */}
            <div className="mb-8">
              <InventarioForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ResumenInventario />
      <div className="grid gap-4 grid-cols-1">
        <TablaProductos />
        <GraficoProductosVendidos />
      </div>
    </div>
  );
}

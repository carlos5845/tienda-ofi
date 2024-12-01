import { ClientesTable } from "@/components/clientes-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Clientes() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Cliente
          </Button>
        </div>
      </div>
      <ClientesTable />
    </div>
  );
}

import { ClientesTable } from "@/components/componentes-cliente/clientes-table";

export default function ClientesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
      <div className="container mx-auto py-10">
        <ClientesTable />
      </div>
    </div>
  );
}

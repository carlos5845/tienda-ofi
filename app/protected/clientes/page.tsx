"use client";

import React from "react";
import ClientForm from "@/components/componentes-cliente/ClientForm";
import ClientTable from "@/components/componentes-cliente/ClientTable";
export default function ClientesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Gestión de Clientes</h1>

      {/* Componente del formulario */}
      <div className="mb-10">
        <ClientForm />
      </div>

      {/* Componente de la tabla */}
      <div>
        <ClientTable />
      </div>
    </div>
  );
}

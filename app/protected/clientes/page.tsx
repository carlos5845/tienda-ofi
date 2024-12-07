"use client";

import React from "react";
import ClientForm from "@/components/componentes-cliente/ClientForm";
import ClientTable from "@/components/componentes-cliente/ClientTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
export default function ClientesPage() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-6">Gestión de Clientes</h1>

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
          {/* Componente del formulario */}
          <div className="mb-8">
            <ClientForm />
          </div>
        </DialogContent>
      </Dialog>

      {/* Componente de la tabla */}
      <div>
        <ClientTable />
      </div>
    </div>
  );
}

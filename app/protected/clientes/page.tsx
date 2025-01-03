"use client";

import React from "react";
import ClientForm from "@/components/componentes-cliente/ClientForm";
import ClientTable from "@/components/componentes-cliente/ClientTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className=" container mx-auto px-4 py-8">
      <div className=" flex justify-between">
        <h1 className="text-4xl font-bold mb-6">Gestión de Clientes</h1>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Agregar cliente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar nuevo cliente</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              {/* Componente del formulario */}
              <div className="mb-8">
                <ClientForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Componente de la tabla */}
      <div>
        <Card>
          <CardContent>
            <ClientTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

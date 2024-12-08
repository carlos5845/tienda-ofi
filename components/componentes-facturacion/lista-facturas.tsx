"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Facturas } from "@/types/database";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Importa el componente Dialog

export function ListaFacturas() {
  const [facturasData, setFacturasData] = useState<Facturas[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFactura, setSelectedFactura] = useState<Facturas | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchFacturas = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("facturas").select("*");
        if (error) throw error;
        setFacturasData(data || []);
      } catch (error) {
        console.error("Error fetching facturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacturas();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("facturas")
        .delete()
        .eq("factura_id", id);
      if (error) throw error;
      setFacturasData(
        facturasData.filter((factura) => factura.factura_id !== id)
      );
    } catch (error) {
      console.error("Error deleting factura:", error);
    }
  };

  const handleViewFactura = (factura: Facturas) => {
    setSelectedFactura(factura);
    setIsDialogOpen(true);
  };

  if (loading) {
    return <p>Cargando facturas...</p>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha de Emisión</TableHead>
            <TableHead>Fecha de Vencimiento</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facturasData.map((factura) => (
            <TableRow key={factura.factura_id}>
              <TableCell className="font-medium">
                {factura.numero_factura}
              </TableCell>
              <TableCell>{factura.cliente_id}</TableCell>
              <TableCell>${factura.monto_total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    factura.estado === "pagada"
                      ? "success"
                      : factura.estado === "pendiente"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {factura.estado}
                </Badge>
              </TableCell>
              <TableCell>{factura.fecha_emision}</TableCell>
              <TableCell>{factura.fecha_vencimiento}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => handleViewFactura(factura)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Ver factura</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(factura.factura_id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog para los detalles de la factura */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Factura #{selectedFactura?.numero_factura}
            </DialogTitle>
            <DialogDescription>
              Detalles de la factura seleccionada:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>Cliente ID:</strong> {selectedFactura?.cliente_id}
            </p>
            <p>
              <strong>Monto Total:</strong> $
              {selectedFactura?.monto_total.toFixed(2)}
            </p>
            <p>
              <strong>Estado:</strong> {selectedFactura?.estado}
            </p>
            <p>
              <strong>Fecha de Emisión:</strong>{" "}
              {selectedFactura?.fecha_emision}
            </p>
            <p>
              <strong>Fecha de Vencimiento:</strong>{" "}
              {selectedFactura?.fecha_vencimiento}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

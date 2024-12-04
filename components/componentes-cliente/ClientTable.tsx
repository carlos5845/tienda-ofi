import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Cliente } from "@/types/database";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-select";
export default function ClientTable() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  const fetchClientes = async () => {
    const { data, error } = await supabase.from("clientes").select("*");
    if (error) {
      console.error("Error al cargar los clientes:", error);
    } else {
      setClientes(data || []);
    }
  };

  const deleteCliente = async (id: number | undefined) => {
    if (!id) {
      alert("ID del cliente no definido.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("cliente_id", id);

    if (error) {
      console.error("Error al eliminar cliente:", error);
      alert(`Error al eliminar el cliente: ${error.message}`);
    } else {
      alert("Cliente eliminado con éxito.");
      fetchClientes(); // Refresca la lista de clientes
    }

    setLoading(false);
  };

  const updateCliente = async () => {
    if (!editingCliente) return;

    setLoading(true);

    const { error } = await supabase
      .from("clientes")
      .update({
        nombre: editingCliente.nombre,
        email: editingCliente.email,
        telefono: editingCliente.telefono,
        fecha_registro: editingCliente.fecha_registro,
      })
      .eq("cliente_id", editingCliente.cliente_id);

    if (error) {
      console.error("Error al actualizar cliente:", error);
      alert(`Error al actualizar el cliente: ${error.message}`);
    } else {
      alert("Cliente actualizado con éxito.");
      setEditingCliente(null); // Cierra el formulario
      fetchClientes(); // Refresca la lista de clientes
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div>
      {/* Formulario de edición */}
      {editingCliente ? (
        <div className="p-4 border rounded shadow mb-4">
          <h3 className="text-lg font-bold mb-2">Editar Cliente</h3>
          <div className="space-y-4">
            <div>
              <label>Nombre</label>
              <Input
                type="text"
                className="input"
                value={editingCliente.nombre}
                onChange={(e) =>
                  setEditingCliente({
                    ...editingCliente,
                    nombre: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                type="email"
                className="input"
                value={editingCliente.email}
                onChange={(e) =>
                  setEditingCliente({
                    ...editingCliente,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Teléfono</label>
              <Input
                type="text"
                className="input"
                value={editingCliente.telefono}
                onChange={(e) =>
                  setEditingCliente({
                    ...editingCliente,
                    telefono: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Fecha de Registro</label>
              <Input
                type="date"
                className="input"
                value={editingCliente.fecha_registro}
                onChange={(e) =>
                  setEditingCliente({
                    ...editingCliente,
                    fecha_registro: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={updateCliente}>Guardar Cambios</Button>
              <Button
                onClick={() => setEditingCliente(null)}
                variant="secondary"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Tabla de clientes */}
      <Table>
        <TableCaption>Lista de clientes registrados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Fecha de Registro</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <TableRow key={cliente.cliente_id}>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>{cliente.fecha_registro}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => setEditingCliente(cliente)}
                    variant="secondary"
                    className="mr-2"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => deleteCliente(cliente.cliente_id)}
                    disabled={loading}
                    variant="destructive"
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No hay clientes registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

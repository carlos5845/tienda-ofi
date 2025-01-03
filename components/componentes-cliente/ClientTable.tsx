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
import { MoreHorizontal, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Cliente } from "@/types/database";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
export default function ClientTable() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchClients, setSearchClients] = useState("");
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filterClients = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchClients.toLowerCase())
  );
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
        estado: editingCliente.estado,
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar clientes...."
          value={searchClients}
          onChange={(e) => setSearchClients(e.target.value)}
        />
        <Button className="ml-4" onClick={fetchClientes} disabled={loading}>
          <Search className="mr-2 h-4 w-4" />
          {loading ? "Cargando..." : "Buscar"}
        </Button>
      </div>

      {/* Contenedor para la tabla con scroll horizontal */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>Lista de clientes registrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterClients.length > 0 ? (
              filterClients.map((cliente) => (
                <TableRow key={cliente.cliente_id}>
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.fecha_registro}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cliente.estado === "nuevo"
                          ? "success"
                          : cliente.estado === "Frecuente"
                            ? "warning"
                            : "vip"
                      }
                    >
                      {cliente.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* Botón que abre el Dialog para editar */}
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setEditingCliente(cliente);
                                setIsDialogOpen(true);
                              }}
                              variant="secondary"
                              className="mr-2"
                            >
                              Editar
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Editar Cliente</DialogTitle>
                              <DialogDescription>
                                Realiza los cambios en el perfil del cliente.
                              </DialogDescription>
                            </DialogHeader>
                            {/* Formulario dentro del Dialog */}
                            <div className="space-y-4">
                              <div>
                                <label>Nombre</label>
                                <Input
                                  type="text"
                                  value={editingCliente?.nombre || ""}
                                  onChange={(e) =>
                                    setEditingCliente({
                                      ...editingCliente!,
                                      nombre: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label>Email</label>
                                <Input
                                  type="email"
                                  value={editingCliente?.email || ""}
                                  onChange={(e) =>
                                    setEditingCliente({
                                      ...editingCliente!,
                                      email: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label>Teléfono</label>
                                <Input
                                  type="text"
                                  value={editingCliente?.telefono || ""}
                                  onChange={(e) =>
                                    setEditingCliente({
                                      ...editingCliente!,
                                      telefono: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label>Fecha de Registro</label>
                                <Input
                                  type="date"
                                  value={editingCliente?.fecha_registro || ""}
                                  onChange={(e) =>
                                    setEditingCliente({
                                      ...editingCliente!,
                                      fecha_registro: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label>Estado</label>
                                <select
                                  value={editingCliente?.estado || ""}
                                  onChange={(e) =>
                                    setEditingCliente({
                                      ...editingCliente!,
                                      estado: e.target.value,
                                    })
                                  }
                                  className="block w-full p-2 border rounded-md"
                                >
                                  <option value="nuevo">Nuevo</option>
                                  <option value="VIP">VIP</option>
                                  <option value="Frecuente">Frecuente</option>
                                </select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={() => {
                                  updateCliente();
                                  setEditingCliente(null); // Limpia el cliente en edición
                                  setIsDialogOpen(false); // Cierra el diálogo
                                }}
                              >
                                Guardar Cambios
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  setEditingCliente(null); // Limpia el cliente en edición
                                  setIsDialogOpen(false); // Cierra el diálogo
                                }}
                              >
                                Cancelar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Botón de Eliminar */}
                        <Button
                          onClick={() => deleteCliente(cliente.cliente_id)}
                          disabled={loading}
                          variant="destructive"
                        >
                          Eliminar
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
    </div>
  );
}

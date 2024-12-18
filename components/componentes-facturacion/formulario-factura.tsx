"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/lib/supabase"; // Configura Supabase aquí
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  numero_factura: z.string().min(1, "El número de factura es obligatorio."),
  cliente_id: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El ID del cliente debe ser un número positivo.",
    }),
  monto_total: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El monto total debe ser un número positivo.",
    }),
  estado: z.enum(["pendiente", "pagada", "vencida"]),
  fecha_emision: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ingrese una fecha válida.",
  }),
  fecha_vencimiento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ingrese una fecha válida.",
  }),
});

export function FormularioFactura() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [clientes, setClientes] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numero_factura: "",
      cliente_id: "",
      monto_total: "",
      estado: "pendiente",
      fecha_emision: "",
      fecha_vencimiento: "",
    },
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from("clientes").select("cliente_id, nombre");
        if (error) throw error;
        setClientes(data || []);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("facturas").insert({
        numero_factura: values.numero_factura,
        cliente_id: parseInt(values.cliente_id),
        monto_total: parseFloat(values.monto_total),
        estado: values.estado,
        fecha_emision: values.fecha_emision,
        fecha_vencimiento: values.fecha_vencimiento,
      });

      if (error) throw error;

      setMessage("Factura creada exitosamente.");
      form.reset();
    } catch (error: any) {
      setMessage(`Error al crear la factura: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Solo renderizamos el formulario después de que los clientes hayan sido cargados
  if (isLoading) {
    return (
      <div className="p-4 text-sm bg-gray-100 text-gray-800">Cargando clientes...</div>
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen space-y-4"
      >
        {message && (
          <div
            className={`p-4 text-sm ${
              message.startsWith("Error")
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {message}
          </div>
        )}
        <FormField
          control={form.control}
          name="numero_factura"
          render={({ field }) => (
            <FormItem className="max-w-2xl">
              <FormLabel>Número de Factura</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número único de factura"
                  {...field}
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cliente_id"
          render={({ field }) => (
            <FormItem className="max-w-2xl">
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="" disabled>
                        Cargando clientes...
                      </SelectItem>
                    ) : clientes.length > 0 ? (
                      clientes.map((cliente) => (
                        <SelectItem key={cliente.cliente_id} value={cliente.cliente_id.toString()}>
                          {cliente.nombre}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        No hay clientes disponibles
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monto_total"
          render={({ field }) => (
            <FormItem className="max-w-2xl">
              <FormLabel>Monto Total</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem className="max-w-2xl">
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="pagada">Pagada</SelectItem>
                  <SelectItem value="vencida">Vencida</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha_emision"
          render={({ field }) => (
            <FormItem className="max-w-2xl">
              <FormLabel>Fecha de Emisión</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha_vencimiento"
          render={({ field }) => (
            <FormItem className="max-w-2xl">
              <FormLabel>Fecha de Vencimiento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Crear Factura"}
        </Button>
      </form>
    </Form>
  );
}

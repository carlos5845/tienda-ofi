// Cliente
export type Cliente = {
  cliente_id: number;
  nombre: string;
  telefono: string;
  email: string;
  fecha_registro: string;
  estado: string;
};

// Venta
export type Venta = {
  venta_id: number;
  cliente_id: number;
  fecha: string;
  monto: number;
  estado: string;
  clienteNombre?: string; // Add this line
};

// Inventario
export type Inventario = {
  producto_id: number;
  nombre_producto: string;
  categoria: string;
  talla: string;
  precio: number;
  stock: number;
  estado: string;
};

// Factura
export type Facturas = {
  factura_id: number;
  numero_factura: string;
  cliente_id: number;
  monto_total: number;
  estado: string;
  fecha_emision: string;
  fecha_vencimiento: string;
};

// DetalleVenta
export type DetalleVenta = {
  detalle_id: number;
  venta_id: number;
  producto_id: number;
  cantidad: number;
  subtotal: number;
};
export type ProductoVendido = {
  producto: string;
  total_vendido: string | number;
};
//VentasMensuales
export type VentasMensuales = {
  mes: string;
  ventas: number;
};

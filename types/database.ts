export type Cliente = {
  cliente_id: number;
  nombre: string;
  telefono: string;
  email: string;
  fecha_registro: string;
};
// Cliente

// Venta
export type Venta = {
  venta_id: number;
  cliente_id: number;
  fecha: string;
  monto: number;
  estado: string;
};

// Inventario
export type Inventario = {
  producto_id: number;
  nombre_producto: string;
  talla: string;
  precio: number;
  stock: number;
};

// Factura
export type Factura = {
  factura_id: number;
  numero_factura: string;
  cliente_id: number;
  monto_total: number;
  fecha_emision: string;
};

// DetalleVenta
export type DetalleVenta = {
  detalle_id: number;
  venta_id: number;
  producto_id: number;
  cantidad: number;
  subtotal: number;
};

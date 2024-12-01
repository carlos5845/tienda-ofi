import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface EstadisticaProps {
  title: string
  value: string
  change: number
}

function Estadistica({ title, value, change }: EstadisticaProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {change > 0 ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change > 0 ? "+" : ""}{change}% desde el último mes
        </p>
      </CardContent>
    </Card>
  )
}

export function ResumenVentas() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Estadistica title="Ventas Totales" value="$15,231.89" change={20.1} />
      <Estadistica title="Nuevos Clientes" value="145" change={-5.4} />
      <Estadistica title="Tasa de Conversión" value="3.24%" change={2.3} />
      <Estadistica title="Ticket Promedio" value="$105.12" change={12.7} />
    </div>
  )
}


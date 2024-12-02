import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShirtIcon, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

interface EstadisticaInventarioProps {
  title: string
  value: string
  icon: React.ReactNode
  description: string
}

function EstadisticaInventario({ title, value, icon, description }: EstadisticaInventarioProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function ResumenInventario() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EstadisticaInventario
        title="Total de Prendas"
        value="2,345"
        icon={<ShirtIcon className="h-4 w-4 text-muted-foreground" />}
        description="Prendas en inventario"
      />
      <EstadisticaInventario
        title="Prendas Agotadas"
        value="18"
        icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
        description="Necesitan reabastecimiento"
      />
      <EstadisticaInventario
        title="Prendas Más Vendidas"
        value="132"
        icon={<TrendingUp className="h-4 w-4 text-green-500" />}
        description="Prendas con alta demanda"
      />
      <EstadisticaInventario
        title="Prendas Menos Vendidas"
        value="57"
        icon={<TrendingDown className="h-4 w-4 text-red-500" />}
        description="Prendas con baja rotación"
      />
    </div>
  )
}


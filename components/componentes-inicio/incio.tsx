import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const motivationalPhrases = [
  "La moda es un lenguaje que hablas todos los días.😁",
  "Viste con confianza y conquista el mundo.👍",
  "Tu estilo es tu firma personal.🙌",
  "La actitud es todo, el resto es moda.",
  "Cada día es una pasarela, ¡brilla!",
];

export default function DashboardWelcome() {
  const randomPhrase =
    motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <Card className="bg-gradient-to-r from-cyan-600 to-blue-400">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-black">
            ¡Bienvenido a Estiloo Urbano!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-6">
            Estamos emocionados de tenerte en nuestro equipo. Aquí comienza tu
            viaje en el mundo de la moda urbana.
          </p>
          <Badge variant="secondary" className="text-lg p-2">
            <Sparkles className="mr-2 h-4 w-4" />
            {randomPhrase}
          </Badge>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Tu Rol</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Como nuevo miembro de Estiloo Urbano, serás fundamental en crear
              experiencias de compra excepcionales para nuestros clientes.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nuestros Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Innovación en moda urbana</li>
              <li>Excelencia en servicio al cliente</li>
              <li>Sostenibilidad y responsabilidad</li>
              <li>Trabajo en equipo y creatividad</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Próximos Pasos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explora tu dashboard para acceder a:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Programas de capacitación</li>
              <li>Catálogo de productos</li>
              <li>Políticas de la empresa</li>
              <li>Calendario de eventos</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

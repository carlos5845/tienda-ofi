import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, ShoppingBag, Users, PackageX } from "lucide-react";
import Link from "next/link";
import { roboto, rowdies } from "@/app/ui/fonts";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <main className={`${roboto} container mx-auto px-4 py-16`}>
        <div className="text-center mb-4">
          <h1
            className={`${rowdies} text-5xl md:text-7xl font-extrabold text-gray-900 mb-4`}
          >
            Sistema de Gestión{" "}
            <span className="bg-clip-text text-transparent animate-spin bg-gradient-to-r from-cloud-burst-700 to-violet-500">
              Estiloo Urbano
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-0">
            Tu tienda de moda urbana con nuestro sistema integral de gestión
          </p>
        </div>
        <div className="flex gap-2 justify-center items-center mb-5 ">
          <div>
            <Button className="bg-cloud-burst-600 hover:bg-cloud-burst-500 ease-out duration-300">
              <Link href="/sign-in">Iniciar Sesion</Link>
            </Button>
          </div>
          <div>
            <Button className="bg-cloud-burst-600 hover:bg-cloud-burst-500">
              <Link href="/sign-up">Registrarse</Link>
            </Button>
          </div>
        </div>

        <section className="mb-16 mt-14">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              {
                title: "Inventario",
                icon: ShoppingBag,
                description:
                  "Gestiona tu stock en tiempo real y predice las necesidades futuras.",
              },
              {
                title: "Resumen de Ventas",
                icon: BarChart2,
                description:
                  "Visualiza tus datos de ventas con gráficos intuitivos y reportes detallados.",
              },
              {
                title: "Gestión de Clientes",
                icon: Users,
                description:
                  "Mantén un registro de tus clientes y sus preferencias para personalizar su experiencia.",
              },
              {
                title: "Control de Stocks",
                icon: PackageX,
                description:
                  "Recibe alertas cuando los productos estén a punto de agotarse o cuando necesites reordenar inventario.",
                additional_info:
                  "Tener un sistema de alertas puede evitar que se te acaben los productos más populares.",
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-white border-blue-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-600">
                    <feature.icon className="h-6 w-6" />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { rowdies } from "@/app/ui/fonts";
import { Card, CardContent } from "@/components/ui/card";
export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-28 mb-32">
      <div className="md:col-span-2 flex flex-col justify-center items-center p-4 relative">
        <div className="w-full bg-no-repeat bg-center bg-cover z-0 absolute left-0"></div>
        <article className="z-10 relative text-center md:text-left">
          <p
            className={`${rowdies.className} text-4xl md:text-6xl lg:text-7xl mb-4`}
          >
            Bienvenido al panel de{" "}
            <span className="text-blue-400">Estiloo Urbano</span>, donde
            gestionas y optimizas la tienda.
          </p>
          <p className="text-lg md:text-2xl">
            Accede a herramientas avanzadas para mantener el inventario,
            gestionar pedidos y ofrecer la mejor experiencia a nuestros
            clientes.
          </p>
        </article>
      </div>

      <div className="flex justify-center items-center p-4">
        <Card className="px-4 py-8 border-cloud-burst-500 w-full max-w-md">
          <CardContent>
            <form className="flex flex-col gap-4">
              <h1 className="text-xl md:text-2xl font-medium text-center md:text-left">
                Iniciar Sesión
              </h1>
              <p className="text-sm text-foreground text-center md:text-left">
                ¿No tienes una cuenta?{" "}
                <Link
                  className="text-foreground font-medium underline"
                  href="/sign-up"
                >
                  Regístrate
                </Link>
              </p>
              <div className="flex flex-col gap-2 mt-6">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="users@ejemplo.com" required />
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    className="text-xs text-foreground underline"
                    href="/forgot-password"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Tu contraseña"
                  required
                />
                <SubmitButton
                  pendingText="Iniciando sesión..."
                  formAction={signInAction}
                >
                  Iniciar Sesión
                </SubmitButton>
                <FormMessage message={searchParams} />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
//das

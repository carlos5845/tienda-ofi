import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { rowdies } from "@/app/ui/fonts";
export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-28 mb-32">
      <div className="col-span-2 flex flex-col justify-center items-center">
        <article>
          <p className={`${rowdies.className} font-semibold text-4xl `}>
            "Bienvenido al panel de gestión de Estiloo Urbano, donde puedes
            administrar y optimizar cada aspecto de la tienda. "
          </p>
          <p>
            Accede a herramientas avanzadas para mantener el inventario,
            gestionar pedidos y ofrecer la mejor experiencia a nuestros
            clientes."
          </p>
        </article>
      </div>

      <div className="flex justify-center items-center col-span-1">
        <form className="flex-1 flex flex-col max-w-64">
          <h1 className="text-2xl font-medium">Iniciar Sesion</h1>
          <p className="text-sm text-foreground">
            No tienes una cuenta?{" "}
            <Link
              className="text-foreground font-medium underline"
              href="/sign-up"
            >
              Registrate
            </Link>
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="users@ejemplo.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Olvidaste tu contraseña?
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
              Iniciar Sesion
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { rowdies } from "@/app/ui/fonts";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-28 mb-32">
        <div className="col-span-2 flex flex-col justify-center items-center p-6  rounded-md">
          <h1>
            <p className={`${rowdies.className} text-7xl mb-4`}>
              ¡Bienvenido a{" "}
              <span className="text-blue-400 ">Estiloo Urbano</span>!
            </p>
            <p className="text-2xl ">
              {" "}
              Registra tu cuenta y comienza a <span>gestionar</span> todo lo que
              hace nuestra tienda increíble. ¡Te necesitamos en el{" "}
              <span className="text-#007BFF">equipo</span>!
            </p>
          </h1>
        </div>
        <div className="flex justify-center items-center col-span-1 p-4">
          <form className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Registrarse</h1>
            <p className="text-sm text text-foreground">
              Ya tienes una cuenta?{" "}
              <Link
                className="text-primary font-medium underline"
                href="/sign-in"
              >
                Iniciar Sesion
              </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="user@ejemplo.com" required />
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                name="password"
                placeholder="Tu contraseña"
                minLength={6}
                required
              />
              <SubmitButton
                formAction={signUpAction}
                pendingText="Registrando..."
              >
                Registrar
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

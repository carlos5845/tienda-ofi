import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { rowdies } from "@/app/ui/fonts";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-28 mb-32">
        <div className="md:col-span-2 flex flex-col justify-center items-center p-6 rounded-md text-center md:text-left">
          <h1>
            <p
              className={`${rowdies.className} text-4xl md:text-6xl lg:text-7xl mb-4`}
            >
              ¡Bienvenido a{" "}
              <span className="text-blue-400">Estiloo Urbano</span>!
            </p>
            <p className="text-lg md:text-2xl">
              Registra tu cuenta y comienza a <span>gestionar</span> todo lo que
              hace nuestra tienda increíble. ¡Te necesitamos en el{" "}
              <span className="text-#007BFF">equipo</span>!
            </p>
          </h1>
        </div>

        <div className="flex justify-center items-center p-4">
          <Card className="px-4 py-8 border-cloud-burst-500 w-full max-w-md">
            <CardContent>
              <form className="flex flex-col gap-4">
                <h1 className="text-xl md:text-2xl font-medium text-center md:text-left">
                  Registrarse
                </h1>
                <p className="text-sm text-foreground text-center md:text-left">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    className="text-primary font-medium underline"
                    href="/sign-in"
                  >
                    Iniciar Sesión
                  </Link>
                </p>
                <div className="flex flex-col gap-2 mt-6">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"botonn"}
              className="font-normal pointer-events-none"
            ></Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"destructive"}
              disabled
              className="opacity-75 cursor-none pointer-events-none "
            >
              <Link href="/sign-in">Iniciar sesión</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"destructive"}
              disabled
              className="opacity-75 cursor-none pointer-events-none "
            >
              <Link href="/sign-up">Registrarse</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      Hola, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Cerrar Sesion
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" disabled className="bg-white border-2 text-black hover:bg-transparent ">
        <Link href="/sign-in">Iniciar sesión</Link>
      </Button>

      <Button
        asChild
        size="sm"
        variant={"default"}
        className=" bg-cloud-burst-600 text-white hover:bg-cloud-burst-500"
      >
        <Link href="/sign-up">Registrarse</Link>
      </Button>
    </div>
  );
}

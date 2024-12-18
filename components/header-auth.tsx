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
    <div className="flex flex-wrap items-center gap-2 font-semibold text-sm sm:text-base sm:flex sm:justify-end justify-end ">
      <span className="truncate max-w-full">Hola, {user.email}!</span>
      <form action={signOutAction}>
        <Button
          type="submit"
          variant={"outline"}
          className="text-xs sm:text-sm px-2 sm:px-4 "
        >
          Cerrar Sesión
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex flex-col sm:flex-row gap-2 ">
      <Button
        asChild
        size="sm"
        disabled
        className="bg-white border-2 text-black hover:bg-black hover:text-white "
      >
        <Link href="/sign-in">Iniciar sesión</Link>
      </Button>

      <Button
        asChild
        size="sm"
        variant="default"
        className="bg-cloud-burst-600 text-white hover:bg-cloud-burst-500"
      >
        <Link href="/sign-up">Registrarse</Link>
      </Button>
    </div>
  );
}

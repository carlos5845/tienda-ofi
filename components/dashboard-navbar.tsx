"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ShoppingCart, Package, FileText, House } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Inicio", href: "/", icon: House },
  { name: "Clientes", href: "/protected/clientes", icon: Users },
  { name: "Ventas", href: "/protected/ventas", icon: ShoppingCart },
  { name: "Inventario", href: "/protected/inventario", icon: Package },
  { name: "Facturación", href: "/protected/facturacion", icon: FileText },
];
console.log(navItems);
export function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex  flex-col  lg:space-y-1  p-2 mt-6">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className={cn(
            "justify-start font-semibold text-lg px-2",
            pathname === item.href
              ? "bg-muted hover:bg-slate-300 hover:text-black"
              : "hover:bg-transparent hover:underline"
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="my-4 h-4 w-4" />
            {item.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
//asdasd

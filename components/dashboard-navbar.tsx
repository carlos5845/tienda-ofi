"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ShoppingCart, Package, FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Clientes", href: "/protected/clientes", icon: Users },
  { name: "Ventas", href: "/protected/ventas", icon: ShoppingCart },
  { name: "Inventario", href: "/protected/inventario", icon: Package },
  { name: "Facturación", href: "/protected/facturacion", icon: FileText },
];

export function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className={cn(
            "justify-start",
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

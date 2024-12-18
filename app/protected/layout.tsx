"use client";
import { useState } from "react";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Botón del menú hamburguesa */}
      <button
        className="lg:hidden p-4 z-50 fixed top-4 left-4 bg-white dark:bg-black border rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-3 w-4" />
        )}
      </button>

      {/* Barra lateral responsiva */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static  w-64 bg-white dark:bg-black dark:border-cloud-burst-400 border rounded-md p-4 z-40 transition-transform duration-300 h-screen`}
      >
        <DashboardNavbar />
      </aside>

      {/* Contenido principal */}
      <main
        className={`flex-1 p-2 overflow-auto bg-white dark:bg-slate-900 dark:text-slate-200 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

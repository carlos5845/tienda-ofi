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
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block fixed lg:static top-0 left-0 h-full w-48 bg-white dark:bg-black dark:border-cloud-burst-400 border rounded-md p-4 z-40`}
      >
        <DashboardNavbar />
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 overflow-auto bg-white dark:bg-slate-900 w-full dark:text-slate-200">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 bg-cloud-burst-500 p-2 rounded-md text-white z-50 mr-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        {children}
      </main>
    </div>
  );
}

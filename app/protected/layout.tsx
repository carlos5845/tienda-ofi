import { DashboardNavbar } from "@/components/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 dark:bg-indigo-950 dark:brightness-125 text-black  p-4 dark:text-slate-100 ">
        <DashboardNavbar />
      </aside>
      <main className="flex-1 p-6 overflow-auto bg-white dark:bg-slate-900 w-screen dark:text-slate-20000">
        {children}
      </main>
    </div>
  );
}

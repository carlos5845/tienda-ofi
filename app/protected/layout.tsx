import { DashboardNavbar } from "@/components/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 bg-blue-400 p-4">
        <DashboardNavbar />
      </aside>
      <main className="flex-1 p-6 overflow-auto bg-white w-screen">
        {children}
      </main>
    </div>
  );
}

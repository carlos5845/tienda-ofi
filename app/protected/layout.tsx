import { DashboardNavbar } from "@/components/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <DashboardNavbar />
      </aside>
      <main className="flex-1 p-6 overflow-auto bg-white w-full">
        {children}
      </main>
    </div>
  );
}

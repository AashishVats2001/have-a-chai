import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <div className="flex flex-1">
        <aside className="w-1/3 min-w-[275px] max-w-[450px] hidden md:block bg-[#f7dcb9] p-10 px-4">
          <Sidebar />
        </aside>
        <main className="flex-1 p-9 overflow-y-auto bg-[#eee2d8]">
          {children}
        </main>
      </div>
    </div>
  );
}
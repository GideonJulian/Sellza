import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MobileBottomNav from "../components/dashboard/MobileBottomNav";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f8faf8] text-[#111827] antialiased">
      <Sidebar />
      <DashboardHeader />

      <main className="min-h-screen min-w-0 pt-16 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:ml-64 lg:pb-0">
        <Outlet />
      </main>

      <MobileBottomNav />
    </div>
  );
}

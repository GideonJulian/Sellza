import { Link } from "react-router-dom";
import DashboardIcon from "../../components/dashboard/DashboardIcon";
import RecentOrders from "../../components/dashboard/RecentOrders";
import SetupProgressCard from "../../components/dashboard/SetupProgressCard";
import StatsOverview from "../../components/dashboard/StatsOverview";

export default function DashboardHome() {
  return (
    <div className="mx-auto flex w-full max-w-[1264px] flex-col gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-1 lg:hidden">
        <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold leading-8 tracking-tight text-[#111827]">
          Welcome to Sellza, Amina
        </h1>
        <p className="text-[13px] leading-[18px] text-[#6b7280]">
          Set up your store and start selling online.
        </p>
      </div>

      <div className="my-1 sm:my-0">
        <SetupProgressCard />
      </div>

      <div className="my-0.5 sm:my-0">
        <StatsOverview />
      </div>

      <div className="sm:hidden">
        <Link
          to="/dashboard/products/new"
          className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-[#16a34a] bg-white px-4 text-sm font-semibold text-[#16a34a] transition-colors hover:bg-[#f0fdf4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
        >
          <DashboardIcon name="add" />
          Add product
        </Link>
      </div>

      <RecentOrders />
    </div>
  );
}

import { Link } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";

export default function RecentOrders() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-none sm:gap-6 sm:p-6 sm:shadow-sm">
      <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-3 sm:pb-4">
        <h2 className="text-base font-semibold leading-6 text-[#111827]">
          Recent orders
        </h2>
        <Link
          to="/dashboard/orders"
          className="text-[13px] font-medium leading-5 text-[#16a34a] hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border border-[#f3f4f6] bg-[#f9fafb] px-3 py-6 text-center sm:border-0 sm:bg-transparent sm:px-0 sm:py-12">
        <span className="mb-2 grid size-10 place-items-center rounded-full bg-[#e5e7eb] text-[#6b7280] sm:mb-3 sm:size-12">
          <DashboardIcon
            name="receipt"
            className="size-5 sm:size-6"
          />
        </span>
        <h3 className="mt-1 text-[15px] font-semibold leading-5 text-[#111827]">
          No orders yet
        </h3>
        <p className="mb-4 mt-1 max-w-[240px] text-[13px] leading-[18px] text-[#6b7280] sm:mb-6 sm:max-w-sm">
          Your customer orders will appear here.
        </p>
        <Link
          to="/dashboard/products/new"
          className="hidden min-h-9 items-center gap-1.5 rounded-lg bg-[#16a34a] px-4 py-2 text-[13px] font-medium leading-5 text-white shadow-sm transition-colors hover:bg-[#15803d] sm:inline-flex"
        >
          <DashboardIcon name="add" className="size-4" />
          Add product
        </Link>
      </div>
    </section>
  );
}

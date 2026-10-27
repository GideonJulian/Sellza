import { NavLink } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";
import { dashboardNavigation } from "./dashboardNavigation";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col justify-between border-r border-[#e5e7eb] bg-white lg:flex">
      <div>
        <NavLink
          to="/dashboard"
          className="flex h-16 items-center gap-2 border-b border-[#e5e7eb] px-6"
          aria-label="Sellza dashboard overview"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-[#16a34a] text-xl font-bold text-white">
            S
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-lg font-semibold tracking-tight text-[#111827]">
            Sellza
          </span>
        </NavLink>

        <nav aria-label="Dashboard" className="flex flex-col gap-1 p-2">
          {dashboardNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex min-h-10 items-center gap-3 rounded px-3 py-2 text-xs font-medium leading-4 transition-colors ${
                  isActive
                    ? "bg-[#dcfce7] text-[#15803d]"
                    : "text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#111827]"
                }`
              }
            >
              <DashboardIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-[#e5e7eb] p-2">
        <div className="flex items-center gap-2 rounded p-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#16a34a] text-white">
            <DashboardIcon name="profile" className="size-[18px]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-medium leading-4 text-[#111827]">
              Amina Fashion
            </span>
            <span className="block truncate text-[11px] leading-[14px] text-[#6b7280]">
              Business Owner
            </span>
          </span>
          <DashboardIcon
            name="more"
            className="size-5 rotate-90 text-[#6b7280]"
          />
        </div>
      </div>
    </aside>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";
import { dashboardNavigation } from "./dashboardNavigation";

const primaryItems = dashboardNavigation.slice(0, 3);
const moreItems = dashboardNavigation.slice(3);

export default function MobileBottomNav() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <>
      {isMoreOpen && (
        <button
          type="button"
          aria-label="Close more navigation"
          className="fixed inset-0 z-40 bg-black/10 lg:hidden"
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {isMoreOpen && (
        <nav
          aria-label="More dashboard sections"
          className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] right-3 z-50 flex w-52 flex-col gap-1 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-lg lg:hidden"
        >
          {moreItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsMoreOpen(false)}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded px-3 py-2 text-sm ${
                  isActive
                    ? "bg-[#dcfce7] font-semibold text-[#15803d]"
                    : "text-[#6b7280] hover:bg-[#f8faf8]"
                }`
              }
            >
              <DashboardIcon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      <nav
        aria-label="Primary dashboard navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e5e7eb] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl lg:hidden"
      >
        <div className="flex h-16 items-center justify-around px-2">
          {primaryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex min-h-11 min-w-14 flex-col items-center justify-center gap-0.5 transition-colors ${
                  isActive
                    ? "font-semibold text-[#16a34a]"
                    : "text-[#6b7280] hover:text-[#111827]"
                }`
              }
            >
              <DashboardIcon name={item.icon} className="size-[22px]" />
              <span className="text-[11px] font-semibold leading-[14px]">
                {item.label === "Overview" ? "Home" : item.label}
              </span>
            </NavLink>
          ))}
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={isMoreOpen}
            onClick={() => setIsMoreOpen((open) => !open)}
            className={`flex min-h-11 min-w-14 flex-col items-center justify-center gap-0.5 transition-colors ${
              isMoreOpen
                ? "font-semibold text-[#16a34a]"
                : "text-[#6b7280] hover:text-[#111827]"
            }`}
          >
            <DashboardIcon name="more" className="size-[22px]" />
            <span className="text-[11px] font-semibold leading-[14px]">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

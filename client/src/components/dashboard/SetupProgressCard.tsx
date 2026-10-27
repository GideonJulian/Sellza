import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";

const setupSteps = [
  { label: "Set up your business", path: "/dashboard/settings" },
  { label: "Add your first product", path: "/dashboard/products/new" },
  { label: "Connect payment account", path: "/dashboard/payments" },
  { label: "Customize your store", path: "/dashboard/store" },
  { label: "Publish your store", path: "/dashboard/store" },
];

export default function SetupProgressCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-none sm:p-6 md:flex-row md:items-center md:justify-between md:gap-6 md:shadow-sm">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold leading-6 text-[#111827]">
            Get your store ready
          </h2>
          <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-2 py-0.5 text-xs font-medium leading-4 text-[#4b5563]">
            0 of 5 completed
          </span>
        </div>
        <p className="text-sm leading-5 text-[#6b7280]">
          Complete your setup to start selling.
        </p>
        <div
          role="progressbar"
          aria-label="Store setup progress"
          aria-valuemin={0}
          aria-valuemax={5}
          aria-valuenow={0}
          className="mt-1 h-2 w-full max-w-md overflow-hidden rounded-full bg-[#f3f4f6]"
        >
          <div className="h-full w-0 rounded-full bg-[#16a34a] transition-all duration-300" />
        </div>
        {isExpanded && (
          <ol className="mt-2 flex flex-col gap-1 border-t border-[#f3f4f6] pt-3 md:max-w-md">
            {setupSteps.map((step, index) => (
              <li key={`${step.label}-${index}`}>
                <Link
                  to={step.path}
                  className="flex min-h-10 items-center gap-3 rounded px-2 text-sm text-[#4b5563] transition-colors hover:bg-[#f8faf8] hover:text-[#15803d]"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full border border-[#d1d5db] text-[11px] leading-none">
                    {index + 1}
                  </span>
                  {step.label}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="flex shrink-0 items-center md:self-center">
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#15803d] active:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] md:h-11 md:w-auto"
        >
          {isExpanded ? "Hide setup steps" : "Complete setup"}
          <DashboardIcon
            name="arrow"
            className={`size-[18px] transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>
    </section>
  );
}

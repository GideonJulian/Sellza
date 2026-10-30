import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";

export const setupSteps = [
  {
    id: "business",
    label: "Set up your business",
    description: "Add your business information and merchant details.",
    path: "/dashboard/settings",
  },
  {
    id: "product",
    label: "Add your first product",
    description: "Add at least one product to your store catalog.",
    path: "/dashboard/products/new",
  },
  {
    id: "payments",
    label: "Set up payments",
    description: "Connect a payment provider and complete payout setup.",
    path: "/dashboard/payments",
  },
  {
    id: "whatsapp",
    label: "Connect WhatsApp",
    description: "Connect an eligible WhatsApp Business number.",
    path: "/dashboard/whatsapp",
  },
  {
    id: "delivery",
    label: "Set delivery",
    description: "Configure your delivery zones and fees.",
    path: "/dashboard/delivery",
  },
  {
    id: "store",
    label: "Customize your store",
    description: "Set your storefront details, appearance, and URL.",
    path: "/dashboard/store",
  },
] as const;

export type SetupStepId = (typeof setupSteps)[number]["id"];

type SetupProgressCardProps = {
  completedSteps?: readonly SetupStepId[];
};

export default function SetupProgressCard({
  completedSteps = [],
}: SetupProgressCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const completedStepIds = new Set(completedSteps);
  const completedCount = setupSteps.filter((step) =>
    completedStepIds.has(step.id),
  ).length;
  const isStoreReady = completedCount === setupSteps.length;

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-none sm:p-6 md:flex-row md:items-center md:justify-between md:gap-6 md:shadow-sm">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold leading-6 text-[#111827]">
            {isStoreReady ? "Your store is ready" : "Get your store ready"}
          </h2>
          <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-2 py-0.5 text-xs font-medium leading-4 text-[#4b5563]">
            {completedCount} of {setupSteps.length} completed
          </span>
        </div>
        <p className="text-sm leading-5 text-[#6b7280]">
          {isStoreReady
            ? "Everything is set up. Publish your store and start accepting orders."
            : "Complete your setup to start selling."}
        </p>
        <div
          role="progressbar"
          aria-label="Store setup progress"
          aria-valuemin={0}
          aria-valuemax={setupSteps.length}
          aria-valuenow={completedCount}
          className="mt-1 h-2 w-full max-w-md overflow-hidden rounded-full bg-[#f3f4f6]"
        >
          <div
            className="h-full rounded-full bg-[#16a34a] transition-all duration-300"
            style={{
              width: `${(completedCount / setupSteps.length) * 100}%`,
            }}
          />
        </div>
        {isExpanded && !isStoreReady && (
          <ol className="mt-2 flex flex-col gap-1 border-t border-[#f3f4f6] pt-3 md:max-w-md">
            {setupSteps.map((step, index) => {
              const isComplete = completedStepIds.has(step.id);

              return (
                <li key={step.id}>
                  <Link
                    to={step.path}
                    className="flex min-h-12 items-center gap-3 rounded-lg px-2 text-sm text-[#4b5563] transition-colors hover:bg-[#f8faf8] hover:text-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full border text-[11px] leading-none ${
                        isComplete
                          ? "border-[#16a34a] bg-[#dcfce7] text-[#15803d]"
                          : "border-[#d1d5db] text-[#6b7280]"
                      }`}
                      aria-label={
                        isComplete ? "Completed" : `Step ${index + 1}`
                      }
                    >
                      {isComplete ? (
                        <DashboardIcon name="check" className="size-3.5" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-[13px] font-medium leading-5 ${
                          isComplete ? "text-[#15803d]" : ""
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="block text-xs leading-4 text-[#6b7280]">
                        {step.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </div>
      <div className="flex shrink-0 items-center md:self-center">
        {isStoreReady ? (
          <Link
            to="/dashboard/store"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#15803d] active:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] md:h-11 md:w-auto"
          >
            Publish Store
            <DashboardIcon name="arrow" className="size-[18px]" />
          </Link>
        ) : (
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
        )}
      </div>
    </section>
  );
}

import DashboardIcon from "./DashboardIcon";

export default function DashboardHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-[#e5e7eb] bg-white lg:left-64">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hidden min-w-0 flex-col justify-center lg:flex">
          <h1 className="text-base font-semibold leading-5 text-[#111827]">
            Welcome to Sellza, Amina
          </h1>
          <p className="text-xs leading-4 text-[#6b7280]">
            Set up your store and start selling online.
          </p>
        </div>

        <div className="flex min-w-0 items-center gap-2 lg:hidden">
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#16a34a] text-lg font-bold text-white">
            S
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-['Plus_Jakarta_Sans'] text-base font-semibold leading-5 text-[#111827]">
              Sellza
            </span>
            <span className="text-[11px] leading-[14px] text-[#6b7280]">
              Merchant OS
            </span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <span className="hidden items-center gap-1.5 rounded-full border border-[#fde68a] bg-[#fef3c7] px-2.5 py-1 text-xs font-medium leading-4 text-[#92400e] sm:inline-flex lg:hidden">
            <span className="size-2 rounded-full bg-[#d97706]" />
            Setup incomplete
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-[#fde68a] bg-[#fef3c7] px-2.5 py-1 text-xs font-medium leading-4 text-[#92400e] lg:inline-flex">
            <span className="size-2 rounded-full bg-[#d97706]" />
            Setup incomplete
          </span>
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]"
          >
            <DashboardIcon name="notifications" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-[#dc2626]" />
          </button>
          <span className="grid size-8 place-items-center rounded-full bg-[#16a34a] text-white">
            <DashboardIcon name="profile" className="size-[18px]" />
          </span>
        </div>
      </div>
    </header>
  );
}

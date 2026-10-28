import { Link } from "react-router-dom";
import DashboardIcon from "../../components/dashboard/DashboardIcon";

const orderSteps = [
  {
    number: "01",
    title: "Customers place an order",
    description: "Shoppers order through your online store.",
  },
  {
    number: "02",
    title: "The order appears here",
    description: "Review the order and its payment status.",
  },
  {
    number: "03",
    title: "Prepare it for delivery",
    description: "Update its status as you fulfill the order.",
  },
];

export default function OrdersEmptyState() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <section className="flex flex-col items-center rounded-xl border border-[#e5e7eb] bg-white px-5 py-9 text-center sm:px-8 sm:py-12">
        <span className="mb-4 grid size-12 place-items-center rounded-full bg-[#f0fdf4] text-[#15803d]">
          <DashboardIcon name="receipt" className="size-6" />
        </span>
        <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold leading-7 text-[#111827]">
          No orders yet
        </h2>
        <p className="mt-2 max-w-md text-[13px] leading-5 text-[#6b7280] sm:text-sm">
          Your store is ready. Orders will appear here automatically when
          customers buy from you.
        </p>
        <div className="mt-5 flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row">
          <Link
            to="/dashboard/products/new"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
          >
            <DashboardIcon name="add" className="size-[18px]" />
            Add your first product
          </Link>
          <Link
            to="/dashboard/store"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-semibold text-[#374151] transition-colors hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
          >
            <DashboardIcon name="store" className="size-[18px]" />
            Set up your store
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="orders-how-it-works"
        className="rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-6"
      >
        <div className="mb-4">
          <h2
            id="orders-how-it-works"
            className="text-base font-semibold leading-6 text-[#111827]"
          >
            How orders work
          </h2>
          <p className="mt-1 text-[13px] leading-5 text-[#6b7280]">
            A simple flow from checkout to delivery.
          </p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {orderSteps.map((step) => (
            <li
              key={step.number}
              className="flex gap-3 rounded-lg bg-[#f8faf8] p-3 sm:flex-col sm:gap-2 sm:p-4"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#dcfce7] text-xs font-semibold text-[#15803d]">
                {step.number}
              </span>
              <div>
                <h3 className="text-[13px] font-semibold leading-5 text-[#111827]">
                  {step.title}
                </h3>
                <p className="mt-0.5 text-xs leading-[18px] text-[#6b7280]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "../../components/dashboard/DashboardIcon";
import OrdersEmptyState from "./OrdersEmptyState";
import OrdersList from "./OrdersList";
import { demoOrders } from "./ordersDemoData";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  type Order,
  type OrderStatus,
  type PaymentStatus,
} from "./ordersData";

type StatusFilter = OrderStatus | "All";
type PaymentFilter = PaymentStatus | "All";
type DateFilter = "all" | "7" | "30";

const emptyOrders: Order[] = [];

export default function Orders() {
  const orders = import.meta.env.DEV ? demoOrders : emptyOrders;
  return <OrdersPage orders={orders} />;
}

export function OrdersPage({ orders }: { orders: Order[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("All");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const visibleOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const cutoff =
      dateFilter === "all"
        ? null
        : Date.now() - Number(dateFilter) * 24 * 60 * 60 * 1000;

    return orders.filter((order) => {
      const matchesSearch =
        !normalizedSearch ||
        order.orderNumber.toLowerCase().includes(normalizedSearch) ||
        order.customerName.toLowerCase().includes(normalizedSearch) ||
        order.customerEmail.toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;
      const matchesPayment =
        paymentFilter === "All" || order.paymentStatus === paymentFilter;
      const matchesDate =
        cutoff === null || new Date(order.createdAt).getTime() >= cutoff;

      return (
        matchesSearch && matchesStatus && matchesPayment && matchesDate
      );
    });
  }, [dateFilter, orders, paymentFilter, search, statusFilter]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setDateFilter("all");
  }

  return (
    <div className="mx-auto flex w-full max-w-[1264px] flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold leading-8 tracking-tight text-[#111827] sm:text-[30px] sm:leading-9">
            Orders
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-[#6b7280] sm:text-sm">
            Manage and track orders from your Sellza store.
          </p>
        </div>
        <Link
          to="/dashboard/store"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#e5e7eb] bg-white px-3 text-[13px] font-medium text-[#374151] transition-colors hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] sm:self-auto"
        >
          <DashboardIcon name="store" className="size-[18px]" />
          View store
        </Link>
      </header>

      <section
        aria-label="Order search and filters"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search orders</span>
            <DashboardIcon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-[#6b7280]"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order number or customer"
              className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white pl-10 pr-3 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15"
            />
          </label>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            <label>
              <span className="sr-only">Filter by payment status</span>
              <select
                value={paymentFilter}
                onChange={(event) =>
                  setPaymentFilter(event.target.value as PaymentFilter)
                }
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-[13px] text-[#374151] outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15 sm:min-w-36"
              >
                <option value="All">All payments</option>
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Filter by order date</span>
              <select
                value={dateFilter}
                onChange={(event) =>
                  setDateFilter(event.target.value as DateFilter)
                }
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-[13px] text-[#374151] outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15 sm:min-w-32"
              >
                <option value="all">All time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </label>
          </div>
        </div>

        <div
          aria-label="Filter by order status"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          {(["All", ...ORDER_STATUSES] as const).map((status) => {
            const count =
              status === "All"
                ? orders.length
                : orders.filter((order) => order.orderStatus === status).length;
            const isSelected = statusFilter === status;

            return (
              <button
                key={status}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setStatusFilter(status)}
                className={`min-h-9 shrink-0 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] ${
                  isSelected
                    ? "border-[#16a34a] bg-[#16a34a] text-white"
                    : "border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#bbf7d0] hover:text-[#15803d]"
                }`}
              >
                {status === "All" ? "All orders" : status} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {orders.length === 0 ? (
        <OrdersEmptyState />
      ) : visibleOrders.length > 0 ? (
        <OrdersList orders={visibleOrders} />
      ) : (
        <section className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-10 text-center sm:py-14">
          <h2 className="text-base font-semibold text-[#111827]">
            No matching orders
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-[13px] leading-5 text-[#6b7280]">
            Try changing your search or filters to find the order you’re looking
            for.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 min-h-10 rounded-lg px-4 text-[13px] font-semibold text-[#15803d] transition-colors hover:bg-[#f0fdf4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
          >
            Clear filters
          </button>
        </section>
      )}
    </div>
  );
}

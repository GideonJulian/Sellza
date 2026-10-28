import { Link } from "react-router-dom";
import DashboardIcon from "../../components/dashboard/DashboardIcon";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "./OrderStatusBadge";
import type { Order } from "./ordersData";

type OrdersListProps = {
  orders: Order[];
};

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function OrderCard({ order }: { order: Order }) {
  return (
    <li>
      <Link
        to={`/dashboard/orders/${order.id}`}
        aria-label={`View order ${order.orderNumber}`}
        className="block rounded-xl border border-[#e5e7eb] bg-white p-4 transition-colors hover:border-[#bbf7d0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-sm font-semibold text-[#15803d]">
              {order.orderNumber}
            </span>
            <p className="mt-1 truncate text-sm font-medium text-[#111827]">
              {order.customerName}
            </p>
          </div>
          <span className="shrink-0 text-right text-sm font-semibold text-[#111827]">
            {currencyFormatter.format(order.total)}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <OrderStatusBadge status={order.orderStatus} />
          <PaymentStatusBadge status={order.paymentStatus} />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#f3f4f6] pt-3">
          <time
            dateTime={order.createdAt}
            className="text-xs leading-4 text-[#6b7280]"
          >
            {dateFormatter.format(new Date(order.createdAt))}
          </time>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#15803d]">
            View details
            <DashboardIcon name="arrow" className="size-4" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <>
      <ul className="grid gap-3 xl:hidden">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-xl border border-[#e5e7eb] bg-white xl:block">
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">Customer orders</caption>
          <thead className="border-b border-[#e5e7eb] bg-[#f9fafb]">
            <tr className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
              <th scope="col" className="w-[13%] px-4 py-3">
                Order
              </th>
              <th scope="col" className="w-[24%] px-4 py-3">
                Customer
              </th>
              <th scope="col" className="w-[15%] px-4 py-3">
                Date
              </th>
              <th scope="col" className="w-[14%] px-4 py-3">
                Payment
              </th>
              <th scope="col" className="w-[14%] px-4 py-3">
                Status
              </th>
              <th scope="col" className="w-[13%] px-4 py-3 text-right">
                Total
              </th>
              <th scope="col" className="w-[7%] px-3 py-3">
                <span className="sr-only">Order details</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <Link
                    to={`/dashboard/orders/${order.id}`}
                    className="text-sm font-semibold text-[#15803d] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <span className="block truncate text-[13px] font-medium text-[#111827]">
                    {order.customerName}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-[#6b7280]">
                    {order.customerEmail}
                  </span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#6b7280]">
                  <time dateTime={order.createdAt}>
                    {dateFormatter.format(new Date(order.createdAt))}
                  </time>
                </td>
                <td className="px-4 py-4">
                  <PaymentStatusBadge status={order.paymentStatus} />
                </td>
                <td className="px-4 py-4">
                  <OrderStatusBadge status={order.orderStatus} />
                </td>
                <td className="px-4 py-4 text-right text-[13px] font-semibold tabular-nums text-[#111827]">
                  {currencyFormatter.format(order.total)}
                </td>
                <td className="px-3 py-4 text-right">
                  <Link
                    to={`/dashboard/orders/${order.id}`}
                    aria-label={`View order ${order.orderNumber}`}
                    className="inline-grid size-8 place-items-center rounded text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                  >
                    <DashboardIcon name="arrow" className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardIcon from "../../components/dashboard/DashboardIcon";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "./OrderStatusBadge";
import { demoOrders } from "./ordersDemoData";
import {
  demoOrderDetails,
  ORDER_PROGRESS_STATUSES,
  type OrderActivity,
} from "./orderDetailsData";
import type { Order, OrderStatus } from "./ordersData";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("en-NG", {
  hour: "numeric",
  minute: "2-digit",
});

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  New: "Confirmed",
  Confirmed: "Processing",
  Processing: "Shipped",
  Shipped: "Delivered",
};

const nextActionLabel: Partial<Record<OrderStatus, string>> = {
  New: "Confirm order",
  Confirmed: "Start processing",
  Processing: "Mark as shipped",
  Shipped: "Mark as delivered",
};

const statusDescriptions: Record<OrderStatus, string> = {
  New: "Order received",
  Confirmed: "Order confirmed",
  Processing: "Order preparation started",
  Shipped: "Handed over for delivery",
  Delivered: "Delivered to customer",
  Cancelled: "Order cancelled",
};

export default function OrderDetails() {
  const { orderId } = useParams();
  const order = import.meta.env.DEV
    ? demoOrders.find((candidate) => candidate.id === orderId)
    : undefined;
  const details = orderId ? demoOrderDetails[orderId] : undefined;

  if (!order || !details) {
    return <OrderNotFound />;
  }

  return (
    <OrderDetailsView key={order.id} order={order} details={details} />
  );
}

function OrderNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <span className="grid size-12 place-items-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
        <DashboardIcon name="receipt" className="size-6" />
      </span>
      <h1 className="mt-4 font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#111827]">
        Order not found
      </h1>
      <p className="mt-2 text-sm leading-5 text-[#6b7280]">
        This order may have been removed or the link may be incorrect.
      </p>
      <Link
        to="/dashboard/orders"
        className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
      >
        <DashboardIcon name="back" className="size-4" />
        Back to orders
      </Link>
    </div>
  );
}

function OrderDetailsView({
  order,
  details,
}: {
  order: Order;
  details: (typeof demoOrderDetails)[string];
}) {
  const [status, setStatus] = useState(order.orderStatus);
  const [activity, setActivity] = useState(details.activity);
  const availableNextStatus = nextStatus[status];
  const canCancel = ["New", "Confirmed", "Processing"].includes(status);
  const whatsappNumber = details.customerPhone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hi ${order.customerName.split(" ")[0]}, here's an update on order ${order.orderNumber}.`,
  );

  function updateStatus(next: OrderStatus) {
    const newActivity: OrderActivity = {
      status: next,
      description: statusDescriptions[next],
      occurredAt: new Date().toISOString(),
    };

    setStatus(next);
    setActivity((currentActivity) => [...currentActivity, newActivity]);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1264px] flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="flex flex-col gap-4">
        <Link
          to="/dashboard/orders"
          className="inline-flex min-h-8 w-fit items-center gap-2 text-[13px] font-medium text-[#6b7280] transition-colors hover:text-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
        >
          <DashboardIcon name="back" className="size-4" />
          Orders
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold leading-8 tracking-tight text-[#111827] sm:text-[30px] sm:leading-9">
                Order {order.orderNumber}
              </h1>
              <OrderStatusBadge status={status} />
            </div>
            <p className="mt-1.5 text-[13px] leading-5 text-[#6b7280]">
              Placed {dateTimeFormatter.format(new Date(order.createdAt))}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[#e5e7eb] pt-3 sm:border-0 sm:pt-0">
            <span className="text-xs font-medium text-[#6b7280] sm:hidden">
              Order total
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold tabular-nums text-[#111827] sm:text-2xl">
              {currencyFormatter.format(order.total)}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <CustomerPanel
          order={order}
          phone={details.customerPhone}
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
          className="order-1 sm:col-start-1 sm:row-start-1 lg:col-start-2 lg:row-start-1"
        />

        <ItemsPanel
          order={order}
          items={details.items}
          className="order-2 sm:col-start-1 sm:row-start-2 lg:col-start-1 lg:row-start-1"
        />

        <SummaryPanel
          subtotal={details.subtotal}
          deliveryFee={details.deliveryFee}
          total={order.total}
          className="order-3 sm:col-start-1 sm:row-start-3 lg:col-start-1 lg:row-start-2"
        />

        <DeliveryPanel
          zone={details.deliveryZone}
          address={details.deliveryAddress}
          className="order-4 sm:col-start-2 sm:row-start-2 lg:col-start-2 lg:row-start-2"
        />

        <PaymentPanel
          order={order}
          paymentMethod={details.paymentMethod}
          transactionReference={details.transactionReference}
          paidAt={details.paidAt}
          className="order-5 sm:col-start-2 sm:row-start-3 lg:col-start-2 lg:row-start-3"
        />

        <TimelinePanel
          status={status}
          activity={activity}
          className="order-6 sm:col-start-1 sm:row-start-4 lg:col-start-1 lg:row-start-3"
        />

        <ActionsPanel
          status={status}
          nextStatus={availableNextStatus}
          actionLabel={nextActionLabel[status]}
          canCancel={canCancel}
          onAdvance={() => {
            if (availableNextStatus) updateStatus(availableNextStatus);
          }}
          onCancel={() => updateStatus("Cancelled")}
          className="order-7 sm:col-span-2 sm:row-start-5 lg:col-span-1 lg:col-start-2 lg:row-start-4"
        />
      </div>
    </div>
  );
}

function CustomerPanel({
  order,
  phone,
  whatsappNumber,
  whatsappMessage,
  className,
}: {
  order: Order;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  className: string;
}) {
  return (
    <section
      aria-labelledby="order-customer"
      className={`rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-5 ${className}`}
    >
      <PanelHeading id="order-customer">Customer</PanelHeading>
      <p className="mt-4 text-sm font-semibold text-[#111827]">
        {order.customerName}
      </p>
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="mt-1 inline-flex min-h-8 items-center gap-2 text-[13px] text-[#6b7280] hover:text-[#15803d]"
      >
        <DashboardIcon name="phone" className="size-4" />
        {phone}
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-3 text-[13px] font-semibold text-[#15803d] transition-colors hover:bg-[#dcfce7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
      >
        <DashboardIcon name="chat" className="size-[18px]" />
        Message customer
      </a>
    </section>
  );
}

function ItemsPanel({
  order,
  items,
  className,
}: {
  order: Order;
  items: (typeof demoOrderDetails)[string]["items"];
  className: string;
}) {
  return (
    <section
      aria-labelledby="order-items"
      className={`rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-5 ${className}`}
    >
      <PanelHeading id="order-items">Order items</PanelHeading>
      <ul className="mt-4 divide-y divide-[#f3f4f6]">
        {items.map((item) => (
          <li
            key={item.sku}
            className="flex min-w-0 items-start gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#f0fdf4] text-[#15803d]">
              <DashboardIcon name="package" className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#111827]">
                {item.name}
              </p>
              <p className="mt-0.5 text-xs leading-4 text-[#6b7280]">
                {item.options}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-[#9ca3af]">
                SKU {item.sku} · Qty {item.quantity}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[13px] font-semibold tabular-nums text-[#111827]">
                {currencyFormatter.format(item.unitPrice * item.quantity)}
              </p>
              <p className="mt-0.5 text-[11px] leading-4 text-[#6b7280]">
                {currencyFormatter.format(item.unitPrice)} each
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-[#f3f4f6] pt-3 text-xs text-[#6b7280]">
        {items.length} {items.length === 1 ? "item" : "items"} in this order
        <span className="float-right font-medium text-[#374151]">
          {order.orderNumber}
        </span>
      </p>
    </section>
  );
}

function SummaryPanel({
  subtotal,
  deliveryFee,
  total,
  className,
}: {
  subtotal: number;
  deliveryFee: number;
  total: number;
  className: string;
}) {
  return (
    <section
      aria-labelledby="order-summary"
      className={`rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-5 ${className}`}
    >
      <PanelHeading id="order-summary">Order summary</PanelHeading>
      <dl className="mt-4 flex flex-col gap-3 text-[13px]">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[#6b7280]">Subtotal</dt>
          <dd className="font-medium tabular-nums text-[#111827]">
            {currencyFormatter.format(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[#6b7280]">Delivery</dt>
          <dd className="font-medium tabular-nums text-[#111827]">
            {currencyFormatter.format(deliveryFee)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-[#e5e7eb] pt-3">
          <dt className="font-semibold text-[#111827]">Total</dt>
          <dd className="text-base font-bold tabular-nums text-[#111827]">
            {currencyFormatter.format(total)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

function DeliveryPanel({
  zone,
  address,
  className,
}: {
  zone: string;
  address: string[];
  className: string;
}) {
  return (
    <section
      aria-labelledby="order-delivery"
      className={`rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-5 ${className}`}
    >
      <PanelHeading id="order-delivery">Delivery</PanelHeading>
      <div className="mt-4 flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f3f4f6] text-[#6b7280]">
          <DashboardIcon name="location" className="size-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#111827]">{zone}</p>
          <address className="mt-1 text-[13px] not-italic leading-5 text-[#6b7280]">
            {address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      </div>
    </section>
  );
}

function PaymentPanel({
  order,
  paymentMethod,
  transactionReference,
  paidAt,
  className,
}: {
  order: Order;
  paymentMethod: string;
  transactionReference: string;
  paidAt: string | null;
  className: string;
}) {
  return (
    <section
      aria-labelledby="order-payment"
      className={`rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PanelHeading id="order-payment">Payment</PanelHeading>
        <PaymentStatusBadge status={order.paymentStatus} />
      </div>
      <dl className="mt-4 flex flex-col gap-3 text-[13px]">
        <div>
          <dt className="text-xs text-[#6b7280]">Payment method</dt>
          <dd className="mt-1 flex items-center gap-2 font-medium leading-5 text-[#111827]">
            <DashboardIcon
              name="card"
              className="size-[18px] shrink-0 text-[#6b7280]"
            />
            <span className="min-w-0 break-words">{paymentMethod}</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-[#6b7280]">Transaction reference</dt>
          <dd className="mt-1 break-all font-mono text-xs leading-5 text-[#374151]">
            {transactionReference}
          </dd>
        </div>
        {paidAt && (
          <div>
            <dt className="text-xs text-[#6b7280]">Paid at</dt>
            <dd className="mt-1 text-[13px] font-medium text-[#111827]">
              {dateTimeFormatter.format(new Date(paidAt))}
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}

function TimelinePanel({
  status,
  activity,
  className,
}: {
  status: OrderStatus;
  activity: OrderActivity[];
  className: string;
}) {
  const isCancelled = status === "Cancelled";

  return (
    <section
      aria-labelledby="order-timeline"
      className={`rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PanelHeading id="order-timeline">Order timeline</PanelHeading>
        {!isCancelled && <OrderStatusBadge status={status} />}
      </div>

      {isCancelled && (
        <p className="mt-4 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2.5 text-[13px] font-medium leading-5 text-[#b91c1c]">
          This order was cancelled. No further fulfillment steps are active.
        </p>
      )}

      <ol className="mt-5 flex flex-col gap-0">
        {ORDER_PROGRESS_STATUSES.map((step, index) => {
          const event = activity.find((entry) => entry.status === step);
          const currentIndex =
            status === "Cancelled"
              ? -1
              : ORDER_PROGRESS_STATUSES.indexOf(status);
          const isCurrent = !isCancelled && status === step;
          const isComplete = event !== undefined && !isCurrent;
          const isUpcoming = !event;

          return (
            <li
              key={step}
              className={`relative flex min-h-[58px] gap-3 ${
                index < ORDER_PROGRESS_STATUSES.length - 1
                  ? "after:absolute after:bottom-0 after:left-[11px] after:top-7 after:border-l after:border-[#e5e7eb]"
                  : ""
              }`}
            >
              <span
                className={`relative z-10 grid size-6 shrink-0 place-items-center rounded-full ${
                  isCurrent
                    ? "bg-[#16a34a] text-white ring-4 ring-[#dcfce7]"
                    : isComplete
                      ? "bg-[#dcfce7] text-[#15803d]"
                      : "border border-[#e5e7eb] bg-white text-[#9ca3af]"
                }`}
              >
                {isComplete || (isCurrent && currentIndex > 0) ? (
                  <DashboardIcon name="check" className="size-3.5" />
                ) : (
                  <span
                    className={`size-1.5 rounded-full ${
                      isCurrent ? "bg-white" : "bg-[#d1d5db]"
                    }`}
                  />
                )}
              </span>
              <div className="flex min-w-0 flex-1 items-start justify-between gap-3 pb-4">
                <div className="min-w-0">
                  <p
                    className={`text-[13px] font-semibold leading-5 ${
                      isCurrent
                        ? "text-[#15803d]"
                        : isUpcoming
                          ? "text-[#9ca3af]"
                          : "text-[#111827]"
                    }`}
                  >
                    {step}
                  </p>
                  <p className="text-xs leading-[18px] text-[#6b7280]">
                    {event?.description ?? "Upcoming"}
                  </p>
                </div>
                <span className="shrink-0 pt-0.5 text-[11px] leading-4 text-[#6b7280]">
                  {event
                    ? timeFormatter.format(new Date(event.occurredAt))
                    : "Upcoming"}
                </span>
              </div>
            </li>
          );
        })}
        {isCancelled && (
          <li className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#fef2f2] text-[#dc2626]">
              <span className="size-1.5 rounded-full bg-current" />
            </span>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold leading-5 text-[#b91c1c]">
                  Cancelled
                </p>
                <p className="text-xs leading-[18px] text-[#6b7280]">
                  Order cancelled by the seller
                </p>
              </div>
              <span className="shrink-0 pt-0.5 text-[11px] leading-4 text-[#6b7280]">
                {timeFormatter.format(
                  new Date(
                    activity.find((entry) => entry.status === "Cancelled")
                      ?.occurredAt ?? new Date(),
                  ),
                )}
              </span>
            </div>
          </li>
        )}
      </ol>
    </section>
  );
}

function ActionsPanel({
  status,
  nextStatus: nextOrderStatus,
  actionLabel,
  canCancel,
  onAdvance,
  onCancel,
  className,
}: {
  status: OrderStatus;
  nextStatus?: OrderStatus;
  actionLabel?: string;
  canCancel: boolean;
  onAdvance: () => void;
  onCancel: () => void;
  className: string;
}) {
  return (
    <section
      aria-labelledby="order-actions"
      className={`rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-5 ${className}`}
    >
      <PanelHeading id="order-actions">Order actions</PanelHeading>
      {nextOrderStatus && actionLabel ? (
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={onAdvance}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
          >
            {nextOrderStatus === "Shipped" ? (
              <DashboardIcon name="package" className="size-[18px]" />
            ) : (
              <DashboardIcon name="check" className="size-[18px]" />
            )}
            {actionLabel}
          </button>
          {canCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex min-h-10 w-full items-center justify-center rounded-lg px-4 text-[13px] font-medium text-[#dc2626] transition-colors hover:bg-[#fef2f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dc2626]"
            >
              Cancel order
            </button>
          )}
        </div>
      ) : (
        <p className="mt-3 text-[13px] leading-5 text-[#6b7280]">
          {status === "Cancelled"
            ? "This order has been cancelled."
            : "This order is complete. There are no further fulfillment actions."}
        </p>
      )}
    </section>
  );
}

function PanelHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-sm font-semibold leading-5 text-[#111827]"
    >
      {children}
    </h2>
  );
}

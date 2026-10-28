import type { OrderStatus, PaymentStatus } from "./ordersData";

const orderStatusClasses: Record<OrderStatus, string> = {
  New: "bg-[#eff6ff] text-[#1d4ed8]",
  Confirmed: "bg-[#f0fdf4] text-[#15803d]",
  Processing: "bg-[#fffbeb] text-[#b45309]",
  Shipped: "bg-[#eff6ff] text-[#1d4ed8]",
  Delivered: "bg-[#dcfce7] text-[#15803d]",
  Cancelled: "bg-[#fef2f2] text-[#b91c1c]",
};

const paymentStatusClasses: Record<PaymentStatus, string> = {
  Pending: "bg-[#fffbeb] text-[#b45309]",
  Paid: "bg-[#dcfce7] text-[#15803d]",
  Failed: "bg-[#fef2f2] text-[#b91c1c]",
  Refunded: "bg-[#f3f4f6] text-[#4b5563]",
  "Partially refunded": "bg-[#fff7ed] text-[#c2410c]",
};

export function OrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium leading-4 ${orderStatusClasses[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold leading-4 ${paymentStatusClasses[status]}`}
    >
      {status}
    </span>
  );
}

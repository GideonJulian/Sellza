import type { Order } from "./ordersData";

export const demoOrders: Order[] = [
  {
    id: "1045",
    orderNumber: "#1045",
    customerName: "David Okafor",
    customerEmail: "david.okafor@example.com",
    total: 37500,
    orderStatus: "Processing",
    paymentStatus: "Paid",
    createdAt: "2026-10-28T10:42:00+01:00",
  },
  {
    id: "1044",
    orderNumber: "#1044",
    customerName: "Amara Eze",
    customerEmail: "amara.eze@example.com",
    total: 24800,
    orderStatus: "New",
    paymentStatus: "Pending",
    createdAt: "2026-10-27T15:18:00+01:00",
  },
  {
    id: "1043",
    orderNumber: "#1043",
    customerName: "Tunde Adebayo",
    customerEmail: "tunde.adebayo@example.com",
    total: 62000,
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    createdAt: "2026-10-21T09:05:00+01:00",
  },
];

import type { OrderStatus } from "./ordersData";

export type OrderItem = {
  name: string;
  options: string;
  sku: string;
  quantity: number;
  unitPrice: number;
};

export type OrderActivity = {
  status: OrderStatus;
  description: string;
  occurredAt: string;
};

export type OrderDetailsData = {
  customerPhone: string;
  deliveryZone: string;
  deliveryAddress: string[];
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  paymentMethod: string;
  transactionReference: string;
  paidAt: string | null;
  activity: OrderActivity[];
};

export const demoOrderDetails: Record<string, OrderDetailsData> = {
  "1045": {
    customerPhone: "+234 803 291 8842",
    deliveryZone: "Lekki",
    deliveryAddress: ["14 Admiralty Way", "Lekki Phase 1, Lagos State"],
    items: [
      {
        name: "Classic Sneakers",
        options: "Size 42 · White & Forest",
        sku: "SLZ-FTW-42-WHT",
        quantity: 1,
        unitPrice: 35000,
      },
    ],
    subtotal: 35000,
    deliveryFee: 2500,
    paymentMethod: "Paystack · Mastercard •••• 4129",
    transactionReference: "SLZ-TXN-894021",
    paidAt: "2026-10-28T10:43:00+01:00",
    activity: [
      {
        status: "New",
        description: "Order placed by David",
        occurredAt: "2026-10-28T10:42:00+01:00",
      },
      {
        status: "Confirmed",
        description: "Payment verified",
        occurredAt: "2026-10-28T10:43:00+01:00",
      },
      {
        status: "Processing",
        description: "Order preparation started",
        occurredAt: "2026-10-28T10:45:00+01:00",
      },
    ],
  },
  "1044": {
    customerPhone: "+234 809 114 6502",
    deliveryZone: "Yaba",
    deliveryAddress: ["22 Herbert Macaulay Way", "Yaba, Lagos State"],
    items: [
      {
        name: "Linen Everyday Shirt",
        options: "Size M · Natural",
        sku: "SLZ-LIN-M-NAT",
        quantity: 1,
        unitPrice: 16800,
      },
      {
        name: "Canvas Tote",
        options: "One size · Olive",
        sku: "SLZ-BAG-OLV",
        quantity: 1,
        unitPrice: 6000,
      },
    ],
    subtotal: 22800,
    deliveryFee: 2000,
    paymentMethod: "Bank transfer",
    transactionReference: "Payment pending",
    paidAt: null,
    activity: [
      {
        status: "New",
        description: "Order placed by Amara",
        occurredAt: "2026-10-27T15:18:00+01:00",
      },
    ],
  },
  "1043": {
    customerPhone: "+234 706 442 1830",
    deliveryZone: "Ikeja",
    deliveryAddress: ["8 Allen Avenue", "Ikeja, Lagos State"],
    items: [
      {
        name: "Leather Weekender Bag",
        options: "One size · Cognac",
        sku: "SLZ-BAG-CGN",
        quantity: 1,
        unitPrice: 60000,
      },
    ],
    subtotal: 60000,
    deliveryFee: 2000,
    paymentMethod: "Paystack · Visa •••• 1086",
    transactionReference: "SLZ-TXN-893876",
    paidAt: "2026-10-21T09:08:00+01:00",
    activity: [
      {
        status: "New",
        description: "Order placed by Tunde",
        occurredAt: "2026-10-21T09:05:00+01:00",
      },
      {
        status: "Confirmed",
        description: "Payment verified",
        occurredAt: "2026-10-21T09:08:00+01:00",
      },
      {
        status: "Processing",
        description: "Order preparation started",
        occurredAt: "2026-10-21T11:20:00+01:00",
      },
      {
        status: "Shipped",
        description: "Handed over for delivery",
        occurredAt: "2026-10-22T08:30:00+01:00",
      },
    ],
  },
};

export const ORDER_PROGRESS_STATUSES = [
  "New",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
] as const satisfies readonly OrderStatus[];

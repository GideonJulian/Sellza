import type { ReactNode } from "react";

export type DashboardIconName =
  | "overview"
  | "orders"
  | "products"
  | "customers"
  | "payments"
  | "whatsapp"
  | "store"
  | "settings"
  | "notifications"
  | "profile"
  | "more"
  | "arrow"
  | "back"
  | "search"
  | "location"
  | "phone"
  | "chat"
  | "card"
  | "package"
  | "check"
  | "warning"
  | "download"
  | "external"
  | "grid"
  | "list"
  | "add"
  | "receipt";

type DashboardIconProps = {
  name: DashboardIconName;
  className?: string;
};

const iconPaths: Record<DashboardIconName, ReactNode> = {
  overview: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </>
  ),
  orders: (
    <>
      <path d="M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  products: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.5 7.7 7.5 4.4 7.5-4.4M12 12v8.5M8 5.3l8 4.5" />
    </>
  ),
  customers: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16 5.2a3.5 3.5 0 0 1 0 6.7M17 14a5.8 5.8 0 0 1 4.2 5.5" />
    </>
  ),
  payments: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M7 15h4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.5-.7L4 20l1.2-3.3A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z" />
      <path d="M9 9.5c.5 2 2 3.5 4.5 4.5l1-1 2 1c-.2 1.4-1.2 2-2.5 2-3.5-.5-6-3-6.5-6.5 0-1.3.6-2.3 2-2.5l1 2-1 1Z" />
    </>
  ),
  store: (
    <>
      <path d="M4 10v10h16V10M3 10l1.5-6h15L21 10M3 10a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0M9 20v-6h6v6" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" />
    </>
  ),
  notifications: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  back: <path d="M19 12H5m7 7-7-7 7-7" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M7.2 3.5H5a1.5 1.5 0 0 0-1.5 1.6A15.9 15.9 0 0 0 19 20.6a1.5 1.5 0 0 0 1.6-1.5v-2.2l-4.1-1.8-1.7 2.1a12.6 12.6 0 0 1-6.1-6.1l2.1-1.7-1.6-4.1Z" />
  ),
  chat: (
    <>
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.5-.7L4 20l1.2-3.3A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z" />
      <path d="M9 10h6m-6 3h4" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18m-14 5h4" />
    </>
  ),
  package: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.5 7.7 7.5 4.4 7.5-4.4M12 12v8.5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  warning: (
    <>
      <path d="m10.3 4.3-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-2.7l-8-14a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4m0 4h.01" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5m-5 5V3" />
    </>
  ),
  external: (
    <>
      <path d="M14 3h7v7m0-7-10 10" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h12M9 12h12M9 18h12" />
      <circle cx="4" cy="6" r=".75" />
      <circle cx="4" cy="12" r=".75" />
      <circle cx="4" cy="18" r=".75" />
    </>
  ),
  add: <path d="M12 5v14m-7-7h14" />,
  receipt: (
    <>
      <path d="M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
};

export default function DashboardIcon({
  name,
  className = "size-5",
}: DashboardIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

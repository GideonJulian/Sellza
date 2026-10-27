import type { DashboardIconName } from "./DashboardIcon";

export type DashboardNavigationItem = {
  label: string;
  path: string;
  icon: DashboardIconName;
};

export const dashboardNavigation: DashboardNavigationItem[] = [
  { label: "Overview", path: "/dashboard", icon: "overview" },
  { label: "Orders", path: "/dashboard/orders", icon: "orders" },
  { label: "Products", path: "/dashboard/products", icon: "products" },
  { label: "Customers", path: "/dashboard/customers", icon: "customers" },
  { label: "Payments", path: "/dashboard/payments", icon: "payments" },
  { label: "WhatsApp", path: "/dashboard/whatsapp", icon: "whatsapp" },
  { label: "Store", path: "/dashboard/store", icon: "store" },
  { label: "Settings", path: "/dashboard/settings", icon: "settings" },
];

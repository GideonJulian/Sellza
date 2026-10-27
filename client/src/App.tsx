import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Orders from "./pages/dashboard/Orders";
import OrderDetails from "./pages/dashboard/OrderDetails";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/AddProduct";
import EditProduct from "./pages/dashboard/EditProduct";
import Customers from "./pages/dashboard/Customers";
import CustomerDetails from "./pages/dashboard/CustomerDetails";
import Payments from "./pages/dashboard/Payments";
import WhatsApp from "./pages/dashboard/WhatsApp";
import Store from "./pages/dashboard/Store";
import Delivery from "./pages/dashboard/Delivery";
import BusinessSettings from "./pages/dashboard/BusinessSettings";
import Storefront from "./pages/store/Storefront";
import ProductDetails from "./pages/store/ProductDetails";
import Checkout from "./pages/store/Checkout";
import OrderConfirmation from "./pages/store/OrderConfirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/new",
        element: <AddProduct />,
      },
      {
        path: "products/:productId/edit",
        element: <EditProduct />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customers/:customerId",
        element: <CustomerDetails />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "whatsapp",
        element: <WhatsApp />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "delivery",
        element: <Delivery />,
      },
      {
        path: "settings",
        element: <BusinessSettings />,
      },
    ],
  },
  {
    path: "/store/:storeSlug",
    element: <Storefront />,
  },
  {
    path: "/store/:storeSlug/product/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/store/:storeSlug/checkout",
    element: <Checkout />,
  },
  {
    path: "/store/:storeSlug/order/:orderId",
    element: <OrderConfirmation />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

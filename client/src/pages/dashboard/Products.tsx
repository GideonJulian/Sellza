import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "../../components/dashboard/DashboardIcon";
import type { Product, ProductStatus } from "./productsData";
import { demoProducts } from "./productsDemoData";

type StatusFilter = "All" | "Active" | "Draft" | "Out of stock";
type CatalogView = "grid" | "list";
type SortOrder = "newest" | "name" | "price";

const MOBILE_PAGE_SIZE = 6;
const DESKTOP_PAGE_SIZE = 8;
const STORE_URL = "veyra-fashion";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  notation: "compact",
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function isOutOfStock(product: Product) {
  return product.status === "Published" && product.stock === 0;
}

function getDisplayStatus(product: Product): ProductStatus | "Out of stock" {
  return isOutOfStock(product) ? "Out of stock" : product.status;
}

function ProductStatusBadge({ product }: { product: Product }) {
  const status = getDisplayStatus(product);
  const className =
    status === "Published"
      ? "bg-[#dcfce7] text-[#15803d]"
      : status === "Draft"
        ? "bg-[#f3f4f6] text-[#4b5563]"
        : "bg-[#fef2f2] text-[#b91c1c]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium leading-4 ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status === "Published" ? "Active" : status}
    </span>
  );
}

function StockBadge({
  stock,
  showZeroQuantity = false,
}: {
  stock: number;
  showZeroQuantity?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium leading-4 ${
        stock === 0
          ? "bg-[#fef2f2] text-[#b91c1c]"
          : "bg-[#dcfce7] text-[#15803d]"
      }`}
    >
      {stock === 0 && !showZeroQuantity
        ? "Out of stock"
        : `${stock} in stock`}
    </span>
  );
}

function ProductMenu({
  product,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}: {
  product: Product;
  onDuplicate: (product: Product) => void;
  onToggleVisibility: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function runAction(action: () => void) {
    action();
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Actions for ${product.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="grid size-7 place-items-center rounded bg-white/95 text-[#4b5563] shadow-sm transition-colors hover:bg-white hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
      >
        <DashboardIcon name="more" className="size-4 rotate-90" />
      </button>
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close product actions"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div
            role="menu"
            aria-label={`${product.name} actions`}
            className="absolute right-0 top-full z-40 mt-1 w-40 rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-lg"
          >
            <Link
              role="menuitem"
              to={`/store/${STORE_URL}/product/${product.id}`}
              className="block rounded px-3 py-2 text-left text-xs text-[#374151] hover:bg-[#f8faf8]"
            >
              View product
            </Link>
            <Link
              role="menuitem"
              to={`/dashboard/products/${product.id}/edit`}
              className="block rounded px-3 py-2 text-left text-xs text-[#374151] hover:bg-[#f8faf8]"
            >
              Edit product
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => runAction(() => onDuplicate(product))}
              className="block w-full rounded px-3 py-2 text-left text-xs text-[#374151] hover:bg-[#f8faf8]"
            >
              Duplicate
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => runAction(() => onToggleVisibility(product))}
              className="block w-full rounded px-3 py-2 text-left text-xs text-[#374151] hover:bg-[#f8faf8]"
            >
              {product.status === "Published" ? "Move to draft" : "Publish"}
            </button>
            <div className="my-1 border-t border-[#f3f4f6]" />
            <button
              type="button"
              role="menuitem"
              onClick={() => runAction(() => onDelete(product))}
              className="block w-full rounded px-3 py-2 text-left text-xs text-[#dc2626] hover:bg-[#fef2f2]"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

type ProductActions = {
  onDuplicate: (product: Product) => void;
  onToggleVisibility: (product: Product) => void;
  onDelete: (product: Product) => void;
};

function ProductImage({
  product,
  className,
}: {
  product: Product;
  className: string;
}) {
  return (
    <img
      src={product.image}
      alt=""
      loading="lazy"
      className={`object-cover ${className}`}
    />
  );
}

function ProductCard({
  product,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}: { product: Product } & ProductActions) {
  return (
    <li className="min-w-0 rounded-lg border border-[#e5e7eb] bg-white p-1.5">
      <div className="relative aspect-[1.55]">
        <ProductImage
          product={product}
          className="size-full rounded-md bg-[#f3f4f6]"
        />
        <span className="absolute left-1.5 top-1.5 max-w-[65%] truncate rounded bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-3 tracking-wide text-[#4b5563]">
          {product.category}
        </span>
        <div className="absolute right-1.5 top-1.5">
          <ProductMenu
            product={product}
            onDuplicate={onDuplicate}
            onToggleVisibility={onToggleVisibility}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="px-1.5 pb-1 pt-2">
        <div className="flex min-w-0 items-center justify-between gap-1">
          <p className="truncate text-[10px] leading-4 text-[#6b7280]">
            {product.sku}
          </p>
          <ProductStatusBadge product={product} />
        </div>
        <h3 className="mt-1 truncate text-xs font-semibold leading-4 text-[#111827]">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center justify-between gap-1">
          <span className="truncate text-[13px] font-bold tabular-nums text-[#111827]">
            {currencyFormatter.format(product.price)}
          </span>
          <StockBadge stock={product.stock} showZeroQuantity />
        </div>
        <Link
          to={`/dashboard/products/${product.id}/edit`}
          className={`mt-2 flex min-h-8 w-full items-center justify-center rounded px-2 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] ${
            product.stock === 0
              ? "bg-[#fef2f2] text-[#b91c1c] hover:bg-[#fee2e2]"
              : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
          }`}
        >
          {product.stock === 0 ? "Restock / Edit" : "Edit Product"}
        </Link>
      </div>
    </li>
  );
}

function MobileProductRow({
  product,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}: { product: Product } & ProductActions) {
  return (
    <li className="flex min-w-0 items-center gap-2.5 rounded-lg border border-[#e5e7eb] bg-white p-3">
      <ProductImage
        product={product}
        className="size-[60px] shrink-0 rounded-md bg-[#f3f4f6] min-[390px]:size-[66px]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1.5">
          <h3 className="min-w-0 flex-1 truncate text-[11px] font-semibold leading-4 text-[#111827] min-[390px]:text-xs">
            {product.name}
          </h3>
          <div className="shrink-0">
            <ProductMenu
              product={product}
              onDuplicate={onDuplicate}
              onToggleVisibility={onToggleVisibility}
              onDelete={onDelete}
            />
          </div>
        </div>
        <p className="mt-0.5 truncate text-[10px] leading-3 text-[#6b7280]">
          {product.category}
        </p>
        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="shrink-0 text-base font-semibold leading-5 tabular-nums text-[#111827] min-[390px]:text-lg">
            {currencyFormatter.format(product.price)}
          </span>
          <span className="min-w-0 truncate text-[9px] leading-3 text-[#6b7280]">
            SKU: {product.sku}
          </span>
        </div>
        <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
          <StockBadge stock={product.stock} />
          {product.status === "Draft" ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-[#6b7280]">
              <span className="size-1.5 rounded-full bg-[#6b7280]" />
              Draft
            </span>
          ) : (
            <span
              className={`inline-flex items-center gap-1 text-[10px] ${
                product.stock === 0 ? "text-[#dc2626]" : "text-[#15803d]"
              }`}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {product.stock === 0 ? "Out of stock" : "Active"}
            </span>
          )}
        </div>
      </div>
      <Link
        to={`/dashboard/products/${product.id}/edit`}
        aria-label={`${product.stock === 0 ? "Restock" : product.status === "Draft" ? "Publish" : "Edit"} ${product.name}`}
        className={`grid min-h-8 shrink-0 place-items-center self-end rounded px-2 text-[10px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] min-[390px]:px-2.5 ${
          product.stock === 0 || product.status === "Draft"
            ? "bg-[#86efac] text-[#14532d] hover:bg-[#4ade80]"
            : "bg-[#eef2ff] text-[#374151] hover:bg-[#e0e7ff]"
        }`}
      >
        {product.stock === 0
          ? "Restock"
          : product.status === "Draft"
            ? "Publish"
            : "Edit"}
      </Link>
    </li>
  );
}

function CatalogSearch({
  search,
  onSearchChange,
  placeholder,
  inputRef,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}) {
  return (
    <label className="relative block min-w-0 flex-1">
      <span className="sr-only">Search products</span>
      <DashboardIcon
        name="search"
        className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#6b7280]"
      />
      <input
        ref={inputRef}
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-[#e5e7eb] bg-white pl-8 pr-2 text-[11px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15 sm:text-xs"
      />
    </label>
  );
}

function ProductStats({ products }: { products: Product[] }) {
  const published = products.filter(
    (product) => product.status === "Published" && product.stock > 0,
  ).length;
  const outOfStock = products.filter(isOutOfStock).length;
  const drafts = products.filter((product) => product.status === "Draft").length;
  const stats = [
    {
      label: "Total products",
      value: products.length.toString(),
      detail: "in catalog",
      icon: "products" as const,
      color: "text-[#6b7280]",
    },
    {
      label: "Active",
      value: published.toString(),
      detail: "published",
      icon: "check" as const,
      color: "text-[#16a34a]",
    },
    {
      label: "Out of stock",
      value: outOfStock.toString(),
      detail: outOfStock > 0 ? "needs restocking" : "all stocked",
      icon: "warning" as const,
      color: "text-[#dc2626]",
    },
    {
      label: "Drafts",
      value: drafts.toString(),
      detail: "unpublished",
      icon: "more" as const,
      color: "text-[#6b7280]",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 items-start justify-between gap-1 rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-2.5 sm:px-3.5 sm:py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-[9px] font-semibold uppercase leading-3 tracking-wide text-[#6b7280] min-[390px]:text-[10px]">
                {stat.label}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-lg font-bold leading-5 tabular-nums text-[#111827]">
                  {stat.value}
                </span>
                <span className="truncate text-[9px] leading-3 text-[#6b7280]">
                  {stat.detail}
                </span>
              </div>
            </div>
            <DashboardIcon
              name={stat.icon}
              className={`mt-0.5 size-4 shrink-0 ${stat.color}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function StoreProfile({ products }: { products: Product[] }) {
  const activeStock = products.reduce(
    (sum, product) =>
      product.status === "Published" ? sum + product.stock : sum,
    0,
  );
  const totalValue = products.reduce(
    (sum, product) =>
      product.status === "Published"
        ? sum + product.price * product.stock
        : sum,
    0,
  );
  const lowOrOutOfStock = products.filter(
    (product) =>
      product.status === "Published" &&
      (product.stock === 0 || product.stock <= 5),
  ).length;

  return (
    <section className="min-w-0 rounded-xl border border-[#e5e7eb] bg-white p-3 sm:px-4 sm:py-3">
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-[#eef2ff] text-sm font-bold text-[#1f2937]">
            VF
          </span>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <h2 className="truncate text-[13px] font-semibold text-[#111827]">
                Veyra Fashion
              </h2>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#dcfce7] px-1.5 py-0.5 text-[9px] font-semibold leading-3 text-[#15803d]">
                <span className="size-1.5 rounded-full bg-[#16a34a]" />
                <span className="hidden sm:inline">Store </span>Published
              </span>
            </div>
            <p className="mt-0.5 hidden truncate text-[10px] leading-3 text-[#6b7280] sm:block">
              Modern fashion pieces for everyday style.
            </p>
            <p className="mt-0.5 truncate text-[10px] leading-3 text-[#6b7280] sm:hidden">
              Modern fashion pieces for everyday style.
            </p>
            <p className="mt-0.5 truncate text-[10px] leading-3 text-[#6b7280] sm:hidden">
              veyra-fashion.sellza.store · Lagos, Nigeria
            </p>
            <p className="mt-1 hidden text-[10px] leading-3 text-[#6b7280] sm:block">
              <span className="font-medium text-[#374151]">sellza.co/veyra</span>
              {" · Lagos, Nigeria"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            to={`/store/${STORE_URL}`}
            className="inline-flex min-h-8 items-center gap-1 rounded-md bg-[#eef2ff] px-2 text-[10px] font-medium text-[#374151] hover:bg-[#e0e7ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] sm:hidden"
          >
            Store link
            <DashboardIcon name="external" className="size-3.5" />
          </Link>
          <Link
            to={`/store/${STORE_URL}`}
            className="hidden min-h-8 items-center gap-1 rounded px-2 text-[10px] font-medium text-[#4b5563] hover:bg-[#f3f4f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] sm:inline-flex"
          >
            Preview Public Store
            <DashboardIcon name="external" className="size-3.5" />
          </Link>
          <Link
            to="/dashboard/store"
            className="hidden min-h-8 items-center gap-1 rounded px-2 text-[10px] font-medium text-[#4b5563] hover:bg-[#f3f4f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] sm:inline-flex"
          >
            <DashboardIcon name="settings" className="size-3.5" />
            Store Settings
          </Link>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-[#f8fafc] px-2 py-2.5 sm:hidden">
        <div className="min-w-0 text-center">
          <p className="truncate text-[10px] text-[#374151]">Active Stock</p>
          <p className="mt-0.5 truncate text-sm font-semibold tabular-nums text-[#111827]">
            {activeStock} units
          </p>
        </div>
        <div className="min-w-0 border-x border-[#e5e7eb] text-center">
          <p className="truncate text-[10px] text-[#374151]">Total Value</p>
          <p className="mt-0.5 truncate text-sm font-semibold tabular-nums text-[#111827]">
            {compactCurrencyFormatter.format(totalValue)}
          </p>
        </div>
        <div className="min-w-0 text-center">
          <p className="truncate text-[10px] text-[#374151]">Low / OOS</p>
          <p
            className={`mt-0.5 truncate text-sm font-semibold tabular-nums ${
              lowOrOutOfStock > 0 ? "text-[#dc2626]" : "text-[#111827]"
            }`}
          >
            {lowOrOutOfStock} items
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Products() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [view, setView] = useState<CatalogView>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1280px)").matches
      ? DESKTOP_PAGE_SIZE
      : MOBILE_PAGE_SIZE,
  );
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const updatePageSize = () => {
      setPageSize(
        desktopQuery.matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE,
      );
      setCurrentPage(1);
    };

    updatePageSize();
    desktopQuery.addEventListener("change", updatePageSize);
    return () => desktopQuery.removeEventListener("change", updatePageSize);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" &&
          product.status === "Published" &&
          product.stock > 0) ||
        (statusFilter === "Draft" && product.status === "Draft") ||
        (statusFilter === "Out of stock" && isOutOfStock(product));

      return matchesSearch && matchesStatus;
    });

    return result.sort((first, second) => {
      if (sortOrder === "name") {
        return first.name.localeCompare(second.name);
      }
      if (sortOrder === "price") {
        return first.price - second.price;
      }
      return (
        new Date(second.updatedAt).getTime() -
        new Date(first.updatedAt).getTime()
      );
    });
  }, [products, search, sortOrder, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize),
  );
  const page = Math.min(currentPage, totalPages);
  const pageProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function duplicateProduct(product: Product) {
    setProducts((current) => [
      {
        ...product,
        id: `${product.id}-copy-${Date.now()}`,
        name: `${product.name} (copy)`,
        status: "Draft",
        updatedAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setCurrentPage(1);
  }

  function toggleVisibility(product: Product) {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
  }

  function deleteProduct(product: Product) {
    if (window.confirm(`Delete "${product.name}" from your catalog?`)) {
      setProducts((current) =>
        current.filter((item) => item.id !== product.id),
      );
    }
  }

  function exportCatalog() {
    const rows = [
      ["Name", "SKU", "Category", "Price", "Stock", "Status"],
      ...filteredProducts.map((product) => [
        product.name,
        product.sku,
        product.category,
        product.price.toString(),
        product.stock.toString(),
        getDisplayStatus(product),
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "sellza-product-catalog.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const activeCount = products.filter(
    (product) => product.status === "Published" && product.stock > 0,
  ).length;
  const draftCount = products.filter(
    (product) => product.status === "Draft",
  ).length;
  const outOfStockCount = products.filter(isOutOfStock).length;
  const filters: { label: StatusFilter; count: number }[] = [
    { label: "All", count: products.length },
    { label: "Active", count: activeCount },
    { label: "Draft", count: draftCount },
    { label: "Out of stock", count: outOfStockCount },
  ];
  const actions: ProductActions = {
    onDuplicate: duplicateProduct,
    onToggleVisibility: toggleVisibility,
    onDelete: deleteProduct,
  };

  return (
    <div className="mx-auto flex w-full max-w-[1264px] flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6 lg:px-8">
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-['Plus_Jakarta_Sans'] text-xl font-bold leading-7 tracking-tight text-[#111827] sm:text-2xl sm:leading-8">
            Products
          </h1>
          <p className="mt-0.5 text-[11px] leading-4 text-[#6b7280] sm:text-xs">
            <span className="sm:hidden">
              {products.length} items listed in your store
            </span>
            <span className="hidden sm:inline">
              Manage the products customers can buy from your store.
            </span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Focus product search"
            onClick={() => searchInputRef.current?.focus()}
            className="grid size-9 place-items-center rounded-lg border border-[#e5e7eb] bg-white text-[#4b5563] hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] sm:hidden"
          >
            <DashboardIcon name="search" className="size-4" />
          </button>
          <button
            type="button"
            onClick={exportCatalog}
            className="hidden min-h-9 items-center gap-1 rounded-lg border border-[#e5e7eb] bg-white px-2.5 text-[11px] font-medium text-[#4b5563] hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] sm:inline-flex"
          >
            <DashboardIcon name="download" className="size-3.5" />
            Export Catalog
          </button>
          <Link
            to="/dashboard/products/new"
            className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg bg-[#16a34a] px-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] sm:min-h-10 sm:gap-1.5 sm:px-3 sm:text-xs"
          >
            <DashboardIcon name="add" className="size-4" />
            Add Product
          </Link>
        </div>
      </header>

      <StoreProfile products={products} />

      <div className="hidden sm:block">
        <ProductStats products={products} />
      </div>

      <section
        aria-label="Product catalog search and filters"
        className="min-w-0 rounded-lg border border-[#e5e7eb] bg-white p-2"
      >
        <div className="flex min-w-0 flex-col gap-2 xl:flex-row xl:items-center">
          <CatalogSearch
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            placeholder="Search products..."
            inputRef={searchInputRef}
          />
          <div className="flex min-w-0 items-center justify-between gap-2 xl:justify-end">
            <div
              aria-label="Filter products by status"
              className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 pb-0.5 xl:flex-none"
            >
              {filters.map((filter) => {
                const isSelected = statusFilter === filter.label;
                return (
                  <button
                    key={filter.label}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setStatusFilter(filter.label);
                      setCurrentPage(1);
                    }}
                    className={`min-h-7 shrink-0 rounded-full px-2.5 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] ${
                      isSelected
                        ? "bg-[#15803d] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                );
              })}
            </div>
            <div className="hidden shrink-0 items-center gap-1 sm:flex">
              <label className="hidden xl:block">
                <span className="sr-only">Sort products</span>
                <select
                  value={sortOrder}
                  onChange={(event) =>
                    setSortOrder(event.target.value as SortOrder)
                  }
                  className="h-8 max-w-36 rounded-md border border-[#e5e7eb] bg-white px-2 text-[10px] text-[#4b5563] outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15"
                >
                  <option value="newest">Newest first</option>
                  <option value="name">Name A–Z</option>
                  <option value="price">Price: low to high</option>
                </select>
              </label>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={`grid size-7 place-items-center rounded border ${
                view === "grid"
                  ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
                  : "border-[#e5e7eb] text-[#6b7280]"
              }`}
            >
              <DashboardIcon name="grid" className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={`grid size-7 place-items-center rounded border ${
                view === "list"
                  ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
                  : "border-[#e5e7eb] text-[#6b7280]"
              }`}
            >
              <DashboardIcon name="list" className="size-3.5" />
            </button>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="product-catalog-heading"
        className="min-w-0"
      >
        <div className="mb-2 flex items-center justify-between gap-2 rounded-md bg-[#f3f4f6] px-3 py-2">
          <h2
            id="product-catalog-heading"
            className="text-[11px] font-semibold leading-4 text-[#111827] sm:text-xs"
          >
            Store Catalog Inventory
          </h2>
          <span className="shrink-0 text-[10px] leading-4 text-[#6b7280]">
            Showing {pageProducts.length} items
          </span>
        </div>

        {pageProducts.length > 0 ? (
          <>
            <ul className="flex flex-col gap-2 xl:hidden">
              {pageProducts.map((product) => (
                <MobileProductRow
                  key={product.id}
                  product={product}
                  {...actions}
                />
              ))}
            </ul>

            {view === "grid" ? (
              <ul className="hidden gap-2.5 xl:grid xl:grid-cols-4">
                {pageProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    {...actions}
                  />
                ))}
              </ul>
            ) : (
              <div className="hidden overflow-visible xl:block">
                <table className="w-full table-fixed text-left">
                  <caption className="sr-only">
                    Products in your store catalog
                  </caption>
                  <thead className="border-y border-[#f3f4f6] bg-[#f9fafb]">
                    <tr className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                      <th scope="col" className="w-[36%] px-3 py-2.5">
                        Product
                      </th>
                      <th scope="col" className="w-[14%] px-3 py-2.5">
                        Category
                      </th>
                      <th scope="col" className="w-[12%] px-3 py-2.5">
                        Price
                      </th>
                      <th scope="col" className="w-[12%] px-3 py-2.5">
                        Stock
                      </th>
                      <th scope="col" className="w-[14%] px-3 py-2.5">
                        Status
                      </th>
                      <th scope="col" className="w-[12%] px-3 py-2.5">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3f4f6]">
                    {pageProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-[#f9fafb]">
                        <th scope="row" className="px-3 py-2.5 text-left">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <ProductImage
                              product={product}
                              className="size-10 shrink-0 rounded-md bg-[#f3f4f6]"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-[#111827]">
                                {product.name}
                              </p>
                              <p className="mt-0.5 text-[10px] text-[#6b7280]">
                                SKU {product.sku}
                              </p>
                            </div>
                          </div>
                        </th>
                        <td className="px-3 py-2.5 text-xs text-[#6b7280]">
                          {product.category}
                        </td>
                        <td className="px-3 py-2.5 text-xs font-semibold tabular-nums text-[#111827]">
                          {currencyFormatter.format(product.price)}
                        </td>
                        <td className="px-3 py-2.5 text-xs text-[#4b5563]">
                          {product.stock === 0
                            ? "Out of stock"
                            : `${product.stock} in stock`}
                        </td>
                        <td className="px-3 py-2.5">
                          <ProductStatusBadge product={product} />
                        </td>
                        <td className="px-3 py-2.5 text-[11px] text-[#6b7280]">
                          <time dateTime={product.updatedAt}>
                            {dateFormatter.format(new Date(product.updatedAt))}
                          </time>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-2 flex items-center justify-between border-t border-[#e5e7eb] px-0.5 pt-2">
              <p className="hidden text-[10px] text-[#6b7280] sm:block">
                Showing {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </p>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
                  className="min-h-7 rounded px-2 text-[10px] text-[#6b7280] hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      aria-current={pageNumber === page ? "page" : undefined}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`grid size-7 place-items-center rounded text-[10px] ${
                        pageNumber === page
                          ? "bg-[#15803d] font-semibold text-white"
                          : "text-[#4b5563] hover:bg-[#f3f4f6]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setCurrentPage((value) => Math.min(totalPages, value + 1))
                  }
                  className="min-h-7 rounded px-2 text-[10px] text-[#6b7280] hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center px-4 py-10 text-center">
            <span className="grid size-10 place-items-center rounded-lg bg-[#f0fdf4] text-[#15803d]">
              <DashboardIcon name="search" className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-[#111827]">
              No products found
            </h3>
            <p className="mt-1 max-w-xs text-[13px] leading-5 text-[#6b7280]">
              Try a different search or status filter.
            </p>
          </div>
        )}
      </section>

    </div>
  );
}

import { Link } from "react-router-dom";
import Mark from "./Mark";
import { getRevealClassName, useScrollReveal } from "./useScrollReveal";

const orders = [
  [
    "#1048",
    "David K.",
    "Vintage Linen Shirt (M)",
    "₦45,000",
    "Paid",
    "Delivered",
  ],
  [
    "#1047",
    "Amara O.",
    "Minimalist Leather Tote",
    "₦85,000",
    "Processing",
    "Via WhatsApp",
  ],
  [
    "#1046",
    "Tunde S.",
    "Running Shoes (42)",
    "₦35,000",
    "Paid",
    "Tracking Sent",
  ],
  [
    "#1045",
    "Sarah M.",
    "Ceramic Table Lamp",
    "₦52,000",
    "Shipped",
    "Out for Delivery",
  ],
];

function DashboardPreview() {
  return (
    <div
      className="min-w-0 w-full animate-dashboard-float rounded-t-[5px] border border-[#e1e7e2] bg-white shadow-[0_8px_24px_rgb(17_24_39_/_3%)] motion-reduce:animate-none"
      aria-label="Preview of the Sellza business dashboard"
    >
      <div className="flex h-[39px] min-w-0 items-center gap-[5px] border-b border-[#edf0ed] px-[13px] text-[9px] text-[#344039] max-md:h-auto max-md:min-h-9 max-md:flex-wrap max-md:py-1 max-md:px-[7px]">
        <i className="h-[6px] w-[6px] rounded-full bg-[#e5e9e7]" />
        <i className="h-[6px] w-[6px] rounded-full bg-[#e5e9e7] max-md:hidden" />
        <i className="h-[6px] w-[6px] rounded-full bg-[#e5e9e7] max-md:hidden" />
        <div className="ml-[11px] flex min-w-0 flex-1 items-center gap-[5px] font-[650] max-md:ml-1 max-md:flex-wrap max-md:whitespace-normal max-md:text-[8px]">
          <span className="h-[9px] w-[9px] rounded-[50%_50%_50%_1px] bg-[#16a34a]" />{" "}
          Sellza Dashboard · Studio Lagos Store{" "}
          <b className="ml-1 shrink-0 rounded-[2px] border border-[#bbf7d0] px-[5px] py-[2px] text-[8px] font-[600] text-[#15803d]">
            Live Store
          </b>
        </div>
        <span className="ml-auto rounded-[3px] border border-[#e5e7eb] px-2 py-1 text-[#4b5563] max-md:hidden">
          Last 7 Days
        </span>
        <button
          type="button"
          className="ml-[5px] h-[25px] shrink-0 rounded-[2px] bg-[#16a34a] px-[9px] text-[9px] font-[600] text-white max-[430px]:px-[6px] max-[430px]:text-[8px]"
        >
          + Add Product
        </button>
      </div>
      <div className="min-w-0 p-[14px] max-md:p-[9px]">
        <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[10px] max-md:grid-cols-2 max-md:gap-[7px]">
          <article className="min-w-0 min-h-[81px] rounded-[3px] border border-[#edf0ed] p-[10px_11px] max-md:min-h-[73px] max-md:p-2">
            <span className="flex items-center justify-between text-[9px] text-[#6b7280] max-[430px]:text-[8px]">
              Total Sales{" "}
              <b className="rounded-[2px] bg-[#dcfce7] px-1 py-px text-[8px] font-[600] text-[#15803d]">
                +8.4%
              </b>
            </span>
            <strong className="my-[4px] block min-w-0 whitespace-nowrap text-[17px] font-[680] leading-[1.2] tabular-nums max-md:text-[14px] max-[375px]:text-[13px]">
              ₦1,420,000
            </strong>
            <small className="text-[8px] text-[#929a94] max-[430px]:text-[7px]">
              vs last week ₦1,310,000
            </small>
          </article>
          <article className="min-w-0 min-h-[81px] rounded-[3px] border border-[#edf0ed] p-[10px_11px] max-md:min-h-[73px] max-md:p-2">
            <span className="flex items-center justify-between text-[9px] text-[#6b7280] max-[430px]:text-[8px]">
              Orders{" "}
              <b className="rounded-[2px] bg-[#dcfce7] px-1 py-px text-[8px] font-[600] text-[#15803d]">
                +12%
              </b>
            </span>
            <strong className="my-[4px] block min-w-0 whitespace-nowrap text-[17px] font-[680] leading-[1.2] tabular-nums max-md:text-[14px] max-[375px]:text-[13px]">
              84{" "}
              <small className="text-[9px] font-[450] text-[#6b7280]">
                orders
              </small>
            </strong>
            <small className="text-[8px] text-[#15803d] max-[430px]:text-[7px]">
              ✓ 4 added last week
            </small>
          </article>
          <article className="min-w-0 min-h-[81px] rounded-[3px] border border-[#edf0ed] p-[10px_11px] max-md:min-h-[73px] max-md:p-2">
            <span className="flex items-center justify-between text-[9px] text-[#6b7280] max-[430px]:text-[8px]">
              Active Inventory
            </span>
            <strong className="my-[4px] block min-w-0 whitespace-nowrap text-[17px] font-[680] leading-[1.2] tabular-nums max-md:text-[14px] max-[375px]:text-[13px]">
              32{" "}
              <small className="text-[9px] font-[450] text-[#6b7280]">
                products
              </small>
            </strong>
            <small className="text-[8px] text-[#929a94] max-[430px]:text-[7px]">
              Across 4 categories
            </small>
          </article>
          <article className="min-w-0 min-h-[81px] rounded-[3px] border border-[#edf0ed] p-[10px_11px] max-md:min-h-[73px] max-md:p-2">
            <span className="flex items-center justify-between text-[9px] text-[#6b7280] max-[430px]:text-[8px]">
              WhatsApp Orders
            </span>
            <strong className="my-[4px] block min-w-0 whitespace-nowrap text-[17px] font-[680] leading-[1.2] tabular-nums max-md:text-[14px] max-[375px]:text-[13px]">
              142{" "}
              <small className="text-[9px] font-[450] text-[#6b7280]">
                alerts
              </small>
            </strong>
            <small className="text-[8px] text-[#929a94] max-[430px]:text-[7px]">
              From 9 buyer groups
            </small>
          </article>
        </div>
        <div className="mt-[13px] grid grid-cols-[minmax(0,1.85fr)_minmax(235px,.95fr)] gap-3 max-[1024px]:grid-cols-[minmax(0,1.7fr)_minmax(220px,.9fr)] max-md:mt-[9px] max-md:grid-cols-1 max-md:gap-[9px]">
          <section className="min-w-0 rounded-[3px] border border-[#edf0ed]">
            <div className="flex h-[35px] items-center justify-between gap-2 border-b border-[#edf0ed] px-[10px] text-[9px] font-[700] max-[430px]:px-[7px] max-[375px]:text-[8px]">
              <span className="inline-flex items-center gap-[6px]">
                RECENT ORDERS{" "}
                <b className="rounded-[2px] bg-[#f3f4f3] px-1 py-px text-[8px] font-[550] text-[#68716b] max-[375px]:hidden">
                  All 84
                </b>
              </span>
              <a
                className="inline-flex items-center gap-[3px] whitespace-nowrap text-[8px] font-[550] text-[#15803d] max-[430px]:text-[7px]"
                href="#how-it-works"
              >
                View full ledger{" "}
                <Mark name="arrow" className="h-[10px] w-[10px]" />
              </a>
            </div>
            <div className="grid min-h-[25px] min-w-0 grid-cols-[.53fr_.72fr_1.35fr_.7fr_.7fr_.95fr] items-center gap-[6px] border-b border-[#f0f2f0] px-[9px] text-[7px] font-[700] text-[#8a928c] max-[1024px]:grid-cols-[.5fr_.7fr_1.15fr_.65fr_.7fr_.9fr] max-[1024px]:gap-1 max-[1024px]:px-[7px] max-md:grid-cols-[minmax(0,.56fr)_minmax(0,.72fr)_minmax(0,.72fr)_minmax(0,.72fr)] max-md:gap-1 max-md:text-[6px] max-[375px]:grid-cols-[minmax(0,.5fr)_minmax(0,.68fr)_minmax(0,.68fr)_minmax(0,.75fr)] max-[375px]:gap-[3px] max-[375px]:px-[6px]">
              <span>ORDER</span>
              <span>CUSTOMER</span>
              <span className="max-md:hidden">PRODUCT</span>
              <span>AMOUNT</span>
              <span>STATUS</span>
              <span className="max-md:hidden">WHATSAPP UPDATE</span>
            </div>
            {orders.map(([id, customer, product, amount, status, update]) => (
              <div
                className="grid min-h-[31px] min-w-0 grid-cols-[.53fr_.72fr_1.35fr_.7fr_.7fr_.95fr] items-center gap-[6px] border-b border-[#f0f2f0] px-[9px] text-[8px] text-[#505a53] last:border-b-0 max-[1024px]:grid-cols-[.5fr_.7fr_1.15fr_.65fr_.7fr_.9fr] max-[1024px]:gap-1 max-[1024px]:px-[7px] max-[1024px]:text-[7px] max-md:grid-cols-[minmax(0,.56fr)_minmax(0,.72fr)_minmax(0,.72fr)_minmax(0,.72fr)] max-md:gap-1 max-md:px-[7px] max-md:text-[7px] max-[430px]:text-[6px] max-[375px]:grid-cols-[minmax(0,.5fr)_minmax(0,.68fr)_minmax(0,.68fr)_minmax(0,.75fr)] max-[375px]:gap-[3px] max-[375px]:px-[6px]"
                key={id}
              >
                <strong className="font-[650] text-[#27332b]">{id}</strong>
                <span className="min-w-0 break-words leading-tight">
                  {customer}
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-md:hidden">
                  {product}
                </span>
                <span className="min-w-0 whitespace-nowrap tabular-nums">
                  {amount}
                </span>
                <span className="min-w-0">
                  <i
                    className={`inline-block whitespace-nowrap rounded-[2px] px-[5px] py-[2px] text-[7px] font-[600] not-italic max-[430px]:px-[3px] max-[430px]:text-[6px] ${status === "Processing" ? "bg-amber-100 text-amber-700" : status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-[#dcfce7] text-[#15803d]"}`}
                  >
                    {status}
                  </i>
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[#15803d] max-md:hidden">
                  ✓ {update}
                </span>
              </div>
            ))}
          </section>
          <aside className="min-w-0 rounded-[3px] border border-[#edf0ed] max-md:hidden">
            <div className="flex h-[35px] items-center justify-between gap-2 border-b border-[#edf0ed] px-[10px] text-[9px] font-[700]">
              <span>
                <span className="text-[14px] text-[#168d51]">◔</span> WhatsApp
                Activity Log
              </span>
              <b className="rounded-[2px] border border-[#bbf7d0] px-[5px] py-[2px] text-[7px] text-[#15803d]">
                CONNECTED
              </b>
            </div>
            <div className="relative flex min-h-[41px] flex-col gap-[3px] border-b border-[#f0f2f0] px-[9px] pb-[6px] pt-[7px] pr-8">
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-[#39443c]">
                Payment: David K. #1048
              </strong>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#828a84]">
                Automated tracking sent · Shirt (M), ₦45,000 ...
              </span>
              <small className="absolute right-2 top-2 text-[7px] text-[#929a94]">
                2m ago
              </small>
            </div>
            <div className="relative flex min-h-[41px] flex-col gap-[3px] border-b border-[#f0f2f0] px-[9px] pb-[6px] pt-[7px] pr-8">
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-[#39443c]">
                Payment Confirmed #1045
              </strong>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#828a84]">
                Buyer paid · order shipped to David K.
              </span>
              <small className="absolute right-2 top-2 text-[7px] text-[#929a94]">
                18m ago
              </small>
            </div>
            <div className="relative flex min-h-[41px] flex-col gap-[3px] border-b border-[#f0f2f0] px-[9px] pb-[6px] pt-[7px] pr-8">
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-[#39443c]">
                Order Created #1047
              </strong>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#828a84]">
                Customer accepted payment link
              </span>
              <small className="absolute right-2 top-2 text-[7px] text-[#929a94]">
                38m ago
              </small>
            </div>
            <div className="p-[8px_9px] text-[8px] text-[#68716b]">
              <strong className="flex justify-between text-[8px] text-[#374139]">
                Inventory Attention{" "}
                <span className="text-[7px] font-[600] text-[#d97706]">
                  2 items critical
                </span>
              </strong>
              <p className="mt-[6px] flex justify-between gap-[5px]">
                Minimalist Leather Tote{" "}
                <b className="text-[7px] font-[600] text-[#d97706]">
                  Only 2 left
                </b>
              </p>
              <p className="mt-[6px] flex justify-between gap-[5px]">
                Ceramic Table Lamp{" "}
                <b className="text-[7px] font-[600] text-[#d97706]">
                  Only 1 left
                </b>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { elementRef, isRevealed } = useScrollReveal<HTMLElement>();
  const revealClassName = getRevealClassName(isRevealed);

  return (
    <section
      ref={elementRef}
      className="px-6 pb-0 pt-11 text-center max-md:px-[18px] max-md:pt-[39px] max-[430px]:px-[14px]"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto max-w-[760px]">
        <span className="inline-flex min-h-5 items-center justify-center gap-[5px] rounded-full bg-[#dcfce7] px-[9px] py-[2px] text-[9px] font-[700] leading-[1.2] tracking-[.035em] text-[#15803d]">
          <i className="h-1 w-1 rounded-full bg-[#16a34a]" /> THE SIMPLE WAY TO
          SELL ONLINE
        </span>
        <h1
          className={`my-[12px] mb-[10px] text-[48px] font-[680] leading-[1.03] tracking-[-.045em] transition-[opacity,translate] delay-0 duration-700 ease-out motion-reduce:transition-none max-md:text-[38px] max-[430px]:text-[34px] max-[375px]:text-[32px] ${revealClassName}`}
          id="hero-title"
        >
          Sell online. Manage orders.
          <br className="max-md:hidden" /> Grow your business.
        </h1>
        <p
          className={`m-0 text-[15px] leading-[1.55] text-[#6b7280] transition-[opacity,translate] delay-75 duration-700 ease-out motion-reduce:transition-none max-md:mx-auto max-md:max-w-[500px] max-md:text-[13px] max-[430px]:text-[12px] ${revealClassName}`}
        >
          Create your online store, accept payments and manage every order
          <br className="max-md:hidden" /> from one simple platform — with
          WhatsApp built into the experience.
        </p>
        <div
          className={`mt-[19px] flex justify-center gap-[10px] transition-[opacity,translate] delay-150 duration-700 ease-out motion-reduce:transition-none max-[430px]:gap-[7px] ${revealClassName}`}
        >
          <Link
            className="inline-flex min-h-[39px] items-center justify-center gap-2 rounded-[3px] bg-[#16a34a] px-4 text-[12px] font-[650] text-white transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[430px]:min-h-[37px] max-[430px]:px-[11px] max-[430px]:text-[11px] max-[375px]:px-[9px] max-[375px]:text-[10px]"
            to="/auth"
          >
            Get started <Mark name="arrow" />
          </Link>
          <a
            className="inline-flex min-h-[39px] items-center justify-center gap-2 rounded-[3px] border border-[#e5e7eb] bg-white px-4 text-[12px] font-[650] text-[#111827] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[#b9c6bb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[430px]:min-h-[37px] max-[430px]:px-[11px] max-[430px]:text-[11px] max-[375px]:px-[9px] max-[375px]:text-[10px]"
            href="#how-it-works"
          >
            <span className="text-[9px]" aria-hidden="true">
              ▶
            </span>{" "}
            See how it works
          </a>
        </div>
        <div
          className={`mt-[10px] text-[10px] text-[#6b7280] transition-[opacity,translate] delay-200 duration-700 ease-out motion-reduce:transition-none max-[430px]:text-[8px] ${revealClassName}`}
        >
          <span className="font-[800] text-[#15803d]">✓</span> No complicated
          setup. No customer accounts required.
        </div>
      </div>
      <div
        className={`mx-auto mt-12 min-w-0 w-[min(1120px,100%)] text-left transition-[opacity,translate] delay-300 duration-700 ease-out motion-reduce:transition-none max-md:mt-[35px] max-[430px]:mt-7 ${revealClassName}`}
      >
        <DashboardPreview />
      </div>
    </section>
  );
}

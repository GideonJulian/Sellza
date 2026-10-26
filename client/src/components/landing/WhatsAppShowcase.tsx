import { Link } from "react-router-dom";
import Mark from "./Mark";
import { getRevealClassName, useScrollReveal } from "./useScrollReveal";

export default function WhatsAppShowcase() {
  const { elementRef, isRevealed } = useScrollReveal<HTMLElement>();
  const revealClassName = getRevealClassName(isRevealed);

  return (
    <section
      ref={elementRef}
      className="border-b border-[#edf0ed] py-[58px] pb-16 max-md:py-[45px]"
      id="whatsapp"
    >
      <div
        className={`mx-auto mb-7 max-w-[690px] px-5 text-center transition-[opacity,translate] duration-600 ease-out motion-reduce:transition-none max-md:mb-[22px] ${revealClassName}`}
      >
        <span className="inline-flex min-h-5 items-center justify-center rounded-full bg-[#dcfce7] px-[9px] py-[2px] text-[9px] font-[700] leading-[1.2] tracking-[.035em] text-[#15803d]">
          KEEP SALES MOVING
        </span>
        <h2 className="my-[9px] mb-[5px] text-[28px] font-[650] leading-[1.2] tracking-[-.035em] max-md:text-[24px] max-[430px]:text-[22px]">
          Your store and WhatsApp, working together.
        </h2>
        <p className="m-0 text-[12px] text-[#6b7280] max-md:text-[11px]">
          Sell through your storefront while keeping your customers and orders
          connected to WhatsApp automatically.
        </p>
      </div>
      <div className="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[minmax(270px,.76fr)_minmax(0,1.24fr)] items-start gap-6 max-[1024px]:gap-4 max-md:w-[min(calc(100%_-_36px),560px)] max-md:grid-cols-1 max-md:gap-[14px] max-[430px]:w-[calc(100%_-_32px)] max-md:[&>*]:mx-auto max-md:[&>*]:w-full max-md:[&>*]:max-w-[500px]">
        <div
          className={`min-h-[405px] overflow-hidden rounded-lg border border-[#dfe4df] bg-[#eee8e1] transition-[opacity,translate] delay-75 duration-600 ease-out motion-reduce:transition-none max-md:min-h-0 ${revealClassName}`}
          aria-label="Example Sellza order notification in WhatsApp"
        >
          <div className="flex h-[54px] items-center gap-2 bg-[#075e54] px-3 text-white">
            <span className="grid h-[29px] w-[29px] place-items-center rounded-full border-2 border-[#d7fff0] bg-white font-[750] text-[#15803d]">
              S
            </span>
            <div className="flex flex-1 flex-col">
              <strong className="text-[9px]">Sellza Order Bot</strong>
              <small className="text-[7px] text-[#d6eee5]">
                WhatsApp Business
              </small>
            </div>
            <span className="mt-[9px] self-start text-[7px]">10:42 AM</span>
          </div>
          <div className="flex min-h-[349px] flex-col items-center px-[11px] pb-[10px] pt-[13px] max-md:min-h-0">
            <span className="rounded-[10px] bg-white/75 px-[9px] py-[3px] text-[7px] font-[700] text-[#748075]">
              TODAY
            </span>
            <div className="mt-[11px] w-full max-w-[330px] rounded-[5px] bg-white p-3 text-[9px] text-[#3b453d] shadow-[0_1px_2px_rgb(0_0_0_/_7%)]">
              <strong className="text-[8px] text-[#15803d]">
                ✓ NEW PAID ORDER #1045
              </strong>
              <hr className="my-2 h-px border-0 bg-[#edf0ed]" />
              <p className="my-[5px]">Hi David,</p>
              <p className="my-[5px]">Your order has been confirmed:</p>
              <div className="mt-[9px] grid grid-cols-[1fr_auto] gap-x-[10px] gap-y-[3px] text-[8px]">
                <span className="text-[#6b7280]">Product</span>
                <b className="text-right font-[600]">Vintage Linen Shirt (M)</b>
                <span className="text-[#6b7280]">Amount</span>
                <b className="text-right font-[600]">₦45,000.00 (Paid)</b>
                <span className="text-[#6b7280]">Customer</span>
                <b className="text-right font-[600]">David</b>
                <span className="text-[#6b7280]">Delivery</span>
                <b className="text-right font-[600]">Lagos Island, Lagos</b>
              </div>
              <p className="mt-[10px] border-t border-[#edf0ed] pt-2 text-[8px] text-[#788079]">
                We&apos;re preparing your order now. We&apos;ll notify you when
                it&apos;s ready to ship.
              </p>
              <small className="block text-right text-[7px] text-[#87918a]">
                10:42 AM <span className="text-[#33a6d5]">✓✓</span>
              </small>
            </div>
            <div className="mt-[9px] flex gap-[7px]">
              <span className="rounded-[12px] border border-[#d9e4dd] bg-white px-[9px] py-[5px] text-[7px] font-[600] text-[#217c4a]">
                Track Order
              </span>
              <span className="rounded-[12px] border border-[#d9e4dd] bg-white px-[9px] py-[5px] text-[7px] font-[600] text-[#217c4a]">
                Contact Store
              </span>
            </div>
          </div>
        </div>
        <div
          className={`overflow-hidden rounded-[5px] border border-[#e5e7eb] bg-white transition-[opacity,translate] delay-150 duration-600 ease-out motion-reduce:transition-none ${revealClassName}`}
        >
          <div className="flex min-h-[69px] items-center justify-between gap-[10px] border-b border-[#edf0ed] p-[12px_14px] max-[430px]:items-start max-[430px]:flex-col">
            <div className="min-w-0">
              <strong className="text-[13px]">Order #1045</strong>{" "}
              <span className="whitespace-nowrap rounded-[2px] bg-[#dcfce7] px-[6px] py-[3px] text-[8px] font-[600] text-[#15803d]">
                Paid Online
              </span>
              <small className="mt-[3px] block text-[8px] text-[#6b7280]">
                Placed today at 10:42 AM · Direct Checkout
              </small>
            </div>
            <Link
              className="inline-flex min-h-[30px] items-center justify-center gap-2 rounded-[3px] bg-[#16a34a] px-[9px] text-center text-[8px] font-[650] text-white hover:bg-[#15803d] max-[1024px]:max-w-[205px] max-[1024px]:whitespace-normal max-[430px]:min-h-8 max-[430px]:max-w-none max-[430px]:self-stretch"
              to="/auth"
            >
              <span>◉</span> Send Dispatch Update on WhatsApp
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-[10px] p-[13px_14px] max-[430px]:grid-cols-1">
            <div className="flex min-h-[72px] flex-col gap-[3px] rounded-[3px] border border-[#edf0ed] bg-[#fafbfa] p-[9px] max-[430px]:min-h-0">
              <span className="text-[7px] font-[700] tracking-[.03em] text-[#6c756e]">
                CUSTOMER INFORMATION
              </span>
              <strong className="flex justify-between gap-[5px] text-[9px]">
                David K.{" "}
                <small className="text-[8px] font-[450] text-[#778078]">
                  +234 80 123 45 678
                </small>
              </strong>
              <small className="text-[8px] text-[#778078]">
                14 Adeola Odeku St, VI, Lagos
              </small>
            </div>
            <div className="flex min-h-[72px] flex-col gap-[3px] rounded-[3px] border border-[#edf0ed] bg-[#fafbfa] p-[9px] max-[430px]:min-h-0">
              <span className="text-[7px] font-[700] tracking-[.03em] text-[#6c756e]">
                PAYMENT VERIFICATION
              </span>
              <strong className="text-[9px]">₦45,000.00</strong>
              <small className="text-[8px] text-[#778078]">
                PAID · 10:42 AM
              </small>
              <small className="text-[8px] text-[#778078]">
                Instant settlement to merchant account
              </small>
            </div>
          </div>
          <div className="px-[14px] pb-1 pt-px">
            <strong className="mb-2 block text-[7px] font-[700] tracking-[.03em] text-[#6c756e]">
              COMMUNICATION AUDIT TRAIL
            </strong>
            <div className="flex items-start gap-2 border-b border-[#f0f2f0] py-[6px]">
              <i className="grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full border border-[#bde8c9] text-[8px] not-italic text-[#15803d]">
                ✓
              </i>
              <span className="flex flex-1 flex-col gap-[2px]">
                <b className="text-[8px] font-[600]">
                  Order Placed: Direct Store Checkout
                </b>
                <small className="text-[7px] text-[#858d87]">
                  Receipt confirmed with instant auto-delivery timestamp.
                </small>
              </span>
              <time className="whitespace-nowrap text-[7px] text-[#858d87]">
                10:42 AM
              </time>
            </div>
            <div className="flex items-start gap-2 border-b border-[#f0f2f0] py-[6px]">
              <i className="grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full border border-[#bde8c9] text-[8px] not-italic text-[#15803d]">
                ✓
              </i>
              <span className="flex flex-1 flex-col gap-[2px]">
                <b className="text-[8px] font-[600]">
                  Order Assigned &amp; Dispatched
                </b>
                <small className="text-[7px] text-[#858d87]">
                  Package handed over to Lagos Express Dispatch Tracking:
                  LK9082.
                </small>
              </span>
              <time className="whitespace-nowrap text-[7px] text-[#858d87]">
                10:42 AM
              </time>
            </div>
            <div className="flex items-start gap-2 border-b border-[#f0f2f0] py-[6px]">
              <i className="grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full border border-[#bde8c9] text-[8px] not-italic text-[#15803d]">
                ○
              </i>
              <span className="flex flex-1 flex-col gap-[2px]">
                <b className="text-[8px] font-[600]">
                  Next: Delivery Confirmation Alert
                </b>
                <small className="text-[7px] text-[#858d87]">
                  Customer review request to confirm prompt drop after arrival.
                </small>
              </span>
              <time className="whitespace-nowrap text-[7px] text-[#858d87] max-[430px]:max-w-[68px] max-[430px]:whitespace-normal max-[430px]:text-right">
                Scheduled Tomorrow
              </time>
            </div>
          </div>
          <div className="flex justify-between gap-2 px-[14px] py-[10px] text-[7px] text-[#7b847d] max-[430px]:flex-col max-[430px]:items-start">
            <span>Synced with Sellza WhatsApp Engine</span>
            <a
              className="inline-flex items-center gap-[3px] whitespace-nowrap font-[600] text-[#15803d]"
              href="#get-started"
            >
              View WhatsApp Settings{" "}
              <Mark name="arrow" className="h-[10px] w-[10px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

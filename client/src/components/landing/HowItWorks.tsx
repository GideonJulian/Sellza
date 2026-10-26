import Mark from "./Mark";
import {
  getRevealClassName,
  getStaggerDelayClass,
  useScrollReveal,
} from "./useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Create your store",
    description:
      "Set up your business profile, set your prices, and upload your best products with photos and prices in seconds.",
    note: "Takes under 3 minutes",
  },
  {
    number: "02",
    title: "Share your link",
    description:
      "Share your dedicated store link anywhere: WhatsApp, Instagram, TikTok, or direct message chats.",
    note: "Universal mobile checkout",
  },
  {
    number: "03",
    title: "Get paid",
    description:
      "Customers easily browse, pick variants, checkout with secure payment accounts, and pay via secure local payment rails.",
    note: "Instant bank payouts",
  },
  {
    number: "04",
    title: "Manage every order",
    description:
      "Track orders in your live dashboard and customers receive automatic notifications keeping your buyers delighted.",
    note: "Zero manual DM chasing",
  },
];

export default function HowItWorks() {
  const { elementRef, isRevealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={elementRef}
      className="border-b border-[#edf0ed] py-[57px] pb-[62px] max-md:py-[45px]"
      id="how-it-works"
    >
      <div className="mx-auto mb-[30px] max-w-[690px] px-5 text-center max-md:mb-[22px]">
        <span className="inline-flex min-h-5 items-center justify-center rounded-full bg-[#dcfce7] px-[9px] py-[2px] text-[9px] font-[700] leading-[1.2] tracking-[.035em] text-[#15803d]">
          SIMPLE 4-STEP WORKFLOW
        </span>
        <h2 className="my-[9px] mb-[5px] text-[28px] font-[650] leading-[1.2] tracking-[-.035em] max-md:text-[24px] max-[430px]:text-[22px]">
          From product to payment in minutes.
        </h2>
        <p className="m-0 text-[12px] text-[#6b7280] max-md:text-[11px]">
          A friction-free commerce setup designed for modern sellers. No web
          development required.
        </p>
      </div>
      <div className="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[repeat(4,minmax(0,1fr))] gap-3 max-md:w-[min(calc(100%_-_36px),560px)] max-md:grid-cols-2 max-md:gap-[9px] max-[375px]:w-[calc(100%_-_28px)]">
        {steps.map((step, index) => (
          <article
            className={`min-h-[226px] rounded-[3px] border border-[#e5e7eb] bg-white p-[15px_16px_14px] transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none max-md:min-h-[205px] max-md:p-3 max-[430px]:min-h-[220px] max-[375px]:min-h-[226px] max-[375px]:p-[10px] ${getRevealClassName(isRevealed)} ${getStaggerDelayClass(index)}`}
            key={step.number}
          >
            <div className="mb-4 flex items-center justify-between max-md:mb-3">
              <span className="text-[18px] font-[650] text-[#111827]">
                {step.number}
              </span>
              <i className="grid h-5 min-w-[21px] place-items-center rounded-[2px] bg-[#ecfdf3] px-1 text-[7px] font-[700] not-italic text-[#15803d]">
                {index === 1 ? (
                  "sellza.store"
                ) : index === 2 ? (
                  "₦"
                ) : (
                  <Mark
                    name={index === 0 ? "check" : "chat"}
                    className="h-[13px] w-[13px]"
                  />
                )}
              </i>
            </div>
            <h3 className="mb-[5px] text-[12px] font-[650] max-md:text-[11px]">
              {step.title}
            </h3>
            <p className="m-0 text-[9px] leading-[1.55] text-[#6b7280] max-md:text-[8px]">
              {step.description}
            </p>
            <small className="mt-[14px] block text-[8px] font-[600] text-[#15803d] max-md:mt-[10px] max-md:text-[7px]">
              <span className="text-[10px]">✓</span> {step.note}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}

import Mark from "./Mark";
import {
  getRevealClassName,
  getStaggerDelayClass,
  useScrollReveal,
} from "./useScrollReveal";

const benefits = [
  {
    icon: "store",
    title: "Online Store",
    description:
      "Give customers a simple, lightning-fast place to browse and buy your products without friction or login.",
  },
  {
    icon: "check",
    title: "Order Management",
    description:
      "Keep every customer order organized from the first enquiry to the confirmed dispatch date.",
  },
  {
    icon: "card",
    title: "Secure Payments",
    description:
      "Accept online payments and track payment status in real time with zero risk of fraudulent transfers.",
  },
  {
    icon: "chat",
    title: "WhatsApp Updates",
    description:
      "Keep customers informed with automated order updates directly on their phones. Cut customer support questions by 80%.",
  },
  {
    icon: "inventory",
    title: "Inventory Management",
    description:
      "Know what is available in stock and automatically hide out-of-stock variations to avoid accidental overselling.",
  },
  {
    icon: "chart",
    title: "Business Dashboard",
    description:
      "See total sales, pending orders, and business activity in one clear place on both desktop and mobile.",
  },
];

export default function Features() {
  const { elementRef, isRevealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={elementRef}
      className="bg-white py-[58px] pb-[65px] max-md:py-[45px]"
      id="features"
    >
      <div className="mx-auto mb-7 max-w-[690px] px-5 text-center max-md:mb-[22px]">
        <span className="inline-flex min-h-5 items-center justify-center rounded-full bg-[#dcfce7] px-[9px] py-[2px] text-[9px] font-[700] leading-[1.2] tracking-[.035em] text-[#15803d]">
          BUILT FOR SPEED &amp; CLARITY
        </span>
        <h2 className="my-[9px] mb-[5px] text-[28px] font-[650] leading-[1.2] tracking-[-.035em] max-md:text-[24px] max-[430px]:text-[22px]">
          Everything your business needs to sell better.
        </h2>
        <p className="m-0 text-[12px] text-[#6b7280] max-md:text-[11px]">
          Clean tools engineered to eliminate repetitive administrative work and
          boost sales velocity.
        </p>
      </div>
      <div className="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-3 gap-3 max-md:w-[min(calc(100%_-_36px),560px)] max-md:grid-cols-2 max-md:gap-2 max-[375px]:w-[calc(100%_-_28px)]">
        {benefits.map((benefit, index) => (
          <article
            className={`min-h-[122px] rounded-[4px] border border-[#e9eeea] bg-[#f8faf8] p-[13px_14px] transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none max-md:min-h-[132px] max-md:p-[10px] max-[430px]:min-h-[144px] max-[375px]:min-h-[155px] ${getRevealClassName(isRevealed)} ${getStaggerDelayClass(index)}`}
            key={benefit.title}
          >
            <span className="mb-[7px] grid h-[29px] w-[29px] place-items-center rounded-[3px] border border-[#edf0ed] bg-white text-[#15803d] max-md:h-[25px] max-md:w-[25px]">
              <Mark name={benefit.icon} />
            </span>
            <h3 className="mb-1 text-[12px] font-[650] max-md:text-[11px]">
              {benefit.title}
            </h3>
            <p className="m-0 text-[9px] leading-[1.55] text-[#6b7280] max-md:text-[8px]">
              {benefit.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

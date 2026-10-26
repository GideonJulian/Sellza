import Mark from "./Mark";
import {
  getRevealClassName,
  getStaggerDelayClass,
  useScrollReveal,
} from "./useScrollReveal";

const features = [
  [
    "globe",
    "Online Store",
    "Fast, mobile-ready storefront your customers will love browsing.",
  ],
  [
    "payment",
    "Secure Payments",
    "Accept card, bank transfers & mobile money instantly and safely.",
  ],
  [
    "check",
    "Order Management",
    "Track orders from placement to delivery in one dashboard.",
  ],
  [
    "chat",
    "WhatsApp Updates",
    "Automated real-time notifications for buyers and merchant alike.",
  ],
];

export default function FeatureStrip() {
  const { elementRef, isRevealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={elementRef}
      className="border-b border-[#edf0ed] py-12 max-md:py-[30px]"
      aria-label="Sellza benefits"
    >
      <div className="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[repeat(4,minmax(0,1fr))] gap-3 max-md:w-[min(calc(100%_-_36px),560px)] max-md:grid-cols-2 max-md:gap-2 max-[430px]:w-[calc(100%_-_28px)]">
        {features.map(([icon, title, description], index) => (
          <article
            className={`flex min-h-[106px] gap-[11px] rounded-[3px] border border-[#edf0ed] bg-white p-[17px_15px] transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none max-md:min-h-[97px] max-md:gap-2 max-md:p-[12px_10px] max-[430px]:min-h-[108px] max-[430px]:flex-col max-[430px]:gap-[7px] max-[430px]:p-[10px] ${getRevealClassName(isRevealed)} ${getStaggerDelayClass(index)}`}
            key={title}
          >
            <span className="grid h-[29px] w-[29px] shrink-0 place-items-center rounded-[3px] border border-[#edf0ed] bg-white text-[#15803d] max-md:h-[25px] max-md:w-[25px]">
              <Mark name={icon} />
            </span>
            <div>
              <h2 className="my-[1px] mb-[3px] text-[11px] font-[650] max-md:text-[10px]">
                {title}
              </h2>
              <p className="m-0 text-[9px] leading-[1.5] text-[#6b7280] max-md:text-[8px]">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

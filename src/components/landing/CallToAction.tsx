import { Link } from "react-router-dom";
import Mark from "./Mark";
import { getRevealClassName, useScrollReveal } from "./useScrollReveal";

export default function CallToAction() {
  const { elementRef, isRevealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={elementRef}
      className="px-6 py-[65px] pb-[70px] max-md:px-[18px] max-md:py-[42px] max-md:pb-12"
      id="get-started"
    >
      <div
        className={`mx-auto flex min-h-[254px] w-[min(850px,100%)] flex-col items-center justify-center rounded-[7px] border border-[#e5e7eb] bg-white px-6 py-[35px] text-center transition-[opacity,translate] duration-600 ease-out motion-reduce:transition-none max-md:min-h-[235px] max-md:px-[17px] max-md:py-7 ${getRevealClassName(isRevealed)}`}
      >
        <span className="inline-flex min-h-5 items-center justify-center rounded-full bg-[#dcfce7] px-[9px] py-[2px] text-[9px] font-[700] leading-[1.2] tracking-[.035em] text-[#15803d]">
          START SELLING TODAY
        </span>
        <h2 className="my-[10px] mb-[5px] text-[28px] font-[650] leading-[1.2] tracking-[-.035em] max-md:max-w-[380px] max-md:text-[24px] max-[430px]:text-[22px]">
          Ready to put your business online?
        </h2>
        <p className="mb-[17px] mt-0 text-[12px] text-[#6b7280] max-md:text-[11px]">
          Create your Sellza store and start selling with a simpler
          <br className="max-md:hidden" /> way to manage orders.
        </p>
        <Link
          className="inline-flex min-h-[38px] items-center justify-center gap-2 rounded-[3px] bg-[#16a34a] px-4 text-[12px] font-[650] text-white transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          to="/auth"
        >
          Get started <Mark name="arrow" />
        </Link>
        <small className="mt-[10px] text-[8px] text-[#6b7280]">
          <span className="font-[800] text-[#15803d]">✓</span> No credit card
          required to get started. Set up in under 3 minutes.
        </small>
      </div>
    </section>
  );
}

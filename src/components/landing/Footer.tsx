import Brand from "./Brand";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: "◎" },
  { label: "Facebook", href: "https://facebook.com", icon: "f" },
  { label: "X", href: "https://x.com", icon: "𝕏" },
];

const footerSections = [
  {
    title: "PRODUCT",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#get-started" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white pb-[15px]">
      <div className="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[minmax(220px,2fr)_repeat(3,minmax(100px,.75fr))] gap-[34px] pb-6 pt-[33px] max-md:w-[min(calc(100%_-_36px),560px)] max-md:grid-cols-[1.3fr_1fr_1fr] max-md:gap-[22px_16px] max-md:pb-5 max-md:pt-[27px] max-[375px]:grid-cols-2">
        <div className="max-md:col-span-full">
          <Brand />
          <p className="my-[8px] mb-[10px] text-[9px] text-[#6b7280]">
            Simple tools for businesses that want to sell online.
          </p>
          <div className="flex gap-[6px]" aria-label="Social media">
            {socialLinks.map((link) => (
              <a
                className="grid h-[23px] w-[23px] place-items-center rounded-[3px] border border-[#e5e7eb] text-[12px] font-[650] text-[#526057]"
                href={link.href}
                aria-label={link.label}
                key={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        {footerSections.map((section) => (
          <div
            className="flex flex-col items-start gap-[5px]"
            key={section.title}
          >
            <strong className="mb-[5px] mt-[2px] text-[8px] font-[700] text-[#4c554e]">
              {section.title}
            </strong>
            {section.links.map((link) => (
              <a
                className="text-[9px] text-[#6b7280] hover:text-[#15803d]"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-[min(1120px,calc(100%_-_48px))] justify-between gap-4 border-t border-[#edf0ed] pt-[14px] text-[8px] text-[#818982] max-md:w-[min(calc(100%_-_36px),560px)] max-md:text-[7px] max-[430px]:w-[calc(100%_-_32px)] max-[375px]:w-[calc(100%_-_28px)] max-[375px]:flex-col max-[375px]:gap-1">
        <span>© 2026 Sellza. All rights reserved.</span>
        <span>Infrastructure for modern commerce.</span>
      </div>
    </footer>
  );
}

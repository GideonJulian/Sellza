import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";
import Mark from "./Mark";

const navigationLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#get-started" },
  { label: "Resources", href: "#whatsapp" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-[5] h-[56px] border-b border-[#eef0ee] bg-white max-md:h-[58px]">
      <div className="mx-auto flex h-full w-[min(1120px,calc(100%_-_48px))] items-center justify-between max-md:w-[min(calc(100%_-_36px),560px)] max-[430px]:w-[calc(100%_-_32px)] max-[375px]:w-[calc(100%_-_28px)]">
        <Brand />
        <nav
          className={`absolute right-0 top-[57px] z-10 flex w-full flex-col gap-0 border-b border-[#e5e7eb] bg-white px-[18px] py-[7px] shadow-[0_9px_15px_rgb(17_24_39_/_6%)] md:static md:ml-[72px] md:w-auto md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none max-[1024px]:ml-[30px] max-[1024px]:gap-[22px] ${menuOpen ? "max-md:flex" : "max-md:hidden"}`}
          aria-label="Main navigation"
        >
          {navigationLinks.map((item) => (
            <a
              className="border-b border-[#f0f2f0] px-[2px] py-3 text-[13px] text-[#5f665f] transition-colors hover:text-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803d] md:border-0 md:p-0 md:text-[12px]"
              href={item.href}
              key={item.label}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center justify-between gap-[15px] pt-[14px] md:hidden">
            <Link
              className="text-[12px] text-[#5f665f] hover:text-[#15803d]"
              to="/auth"
              onClick={closeMenu}
            >
              Log in
            </Link>
            <Link
              className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-[3px] bg-[#16a34a] px-4 text-[12px] font-[650] text-white transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              to="/auth"
              onClick={closeMenu}
            >
              Get started <Mark name="arrow" />
            </Link>
          </div>
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <Link
            className="text-[12px] text-[#5f665f] hover:text-[#15803d]"
            to="/auth"
          >
            Log in
          </Link>
          <Link
            className="inline-flex min-h-[31px] items-center justify-center rounded-[3px] bg-[#16a34a] px-[13px] text-[11px] font-[650] text-white transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            to="/auth"
          >
            Get started
          </Link>
          <Link
            className="grid h-[26px] w-[26px] place-items-center rounded-[5px] bg-[#075c39] text-[15px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d]"
            to="/auth"
            aria-label="Log in"
          >
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <button
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[3px] border border-[#e5e7eb] bg-white md:hidden"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`h-[1.5px] w-[15px] bg-[#29352d] transition-transform ${menuOpen ? "translate-y-[3.25px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-[15px] bg-[#29352d] transition-transform ${menuOpen ? "-translate-y-[3.25px] -rotate-45" : ""}`}
          />
        </button>
      </div>
    </header>
  );
}

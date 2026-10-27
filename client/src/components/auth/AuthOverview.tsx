import type { AuthMode } from "./AuthForm";

type AuthOverviewProps = {
  mode: AuthMode;
};

type BenefitIconName = "store" | "payments" | "orders" | "wallet" | "chat";

type Benefit = {
  icon: BenefitIconName;
  title: string;
  description: string;
};

const registrationBenefits: Benefit[] = [
  {
    icon: "store",
    title: "Online storefront",
    description:
      "Launch a fast, lightweight mobile store tailored for your catalog.",
  },
  {
    icon: "payments",
    title: "Secure instant payments",
    description:
      "Accept direct bank transfers, debit cards, and USSD without gateway hassles.",
  },
  {
    icon: "chat",
    title: "WhatsApp order management",
    description:
      "Automated receipts, live inventory sync, and direct customer messaging.",
  },
];

const loginBenefits: Benefit[] = [
  {
    icon: "orders",
    title: "Manage orders",
    description:
      "Track fulfillment pipelines, update dispatches, and auto-notify customers seamlessly.",
  },
  {
    icon: "wallet",
    title: "Track payments",
    description:
      "Direct merchant settlements, instant customer receipts, and auto-reconciled ledgers.",
  },
  {
    icon: "chat",
    title: "Stay connected with customers",
    description:
      "Automated order confirmation dispatch and direct transactional updates.",
  },
];

function BenefitIcon({ name }: { name: BenefitIconName }) {
  const paths: Record<BenefitIconName, string> = {
    store: "M3 10h18M5 10v10h14V10M4 10l1-6h14l1 6M9 20v-6h6v6",
    payments:
      "M3 7h18v13H3zM3 10h18M7 16h3M7 4h10",
    orders:
      "M3 7h11v10H3zM14 11h4l3 3v3h-7zM7 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
    wallet:
      "M3 6h17v14H3zM3 9h17M16 14h4M6 4h12",
    chat:
      "M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.5-.7L4 20l1.2-3.3A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z",
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d={paths[name]}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AuthOverview({ mode }: AuthOverviewProps) {
  const isRegister = mode === "register";
  const benefits = isRegister ? registrationBenefits : loginBenefits;

  return (
    <div className="w-full max-w-[500px]">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#92f5a4]/30 px-3 py-1.5 text-[#007233]">
        <span className="size-2 animate-pulse rounded-full bg-[#006b2c]" />
        <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-wide">
          {isRegister ? "Merchant onboarding" : "Welcome back"}
        </span>
      </div>

      <h1 className="mt-4 font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-10 tracking-[-0.02em] text-[#141b2b]">
        {isRegister
          ? "Start selling online."
          : "Run your business from one place."}
      </h1>
      <p className="mt-2 max-w-md text-base leading-6 text-[#3e4a3d]">
        {isRegister
          ? "Create your Sellza account and build your high-converting online store in minutes."
          : "Manage your products, orders, payments, and customer updates with Sellza."}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className={`flex items-start gap-4 rounded-xl p-4 ${
              isRegister ? "bg-white" : "bg-white shadow-sm"
            }`}
          >
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#92f5a4]/60 text-[#006b2c]">
              <BenefitIcon name={benefit.icon} />
            </span>
            <div>
              <h2 className="text-base font-semibold leading-6 text-[#141b2b]">
                {benefit.title}
              </h2>
              <p className="mt-0.5 text-[13px] leading-[18px] tracking-[0.005em] text-[#3e4a3d]">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isRegister ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#f1f3ff] p-4">
          <div className="flex shrink-0 -space-x-2">
            <span className="grid size-8 place-items-center rounded-full bg-[#006b2c] text-[10px] font-bold text-white">
              AK
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-[#5e7b6a] text-[10px] font-bold text-white">
              MT
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-[#006d30] text-[10px] font-bold text-white">
              +4k
            </span>
          </div>
          <p className="text-[13px] leading-[18px] tracking-[0.005em] text-[#3e4a3d]">
            Join thousands of ambitious African merchants scaling today.
          </p>
        </div>
      ) : (
        <div className="mt-6 flex items-center gap-2 text-xs leading-4 text-[#3e4a3d]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-[18px] text-[#006b2c]"
            fill="none"
          >
            <path
              d="M12 3 19 6v5c0 4.5-2.9 8-7 10-4.1-2-7-5.5-7-10V6l7-3Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="m9 12 2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Secure 256-bit encrypted merchant portal</span>
        </div>
      )}
    </div>
  );
}

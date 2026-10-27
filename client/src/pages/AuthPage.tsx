import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm, { type AuthMode } from "../components/auth/AuthForm";
import AuthOverview from "../components/auth/AuthOverview";

function AuthBrand() {
  return (
    <Link
      to="/"
      aria-label="Sellza home"
      className="group inline-flex items-center gap-2 whitespace-nowrap"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-[#006b2c] font-['Plus_Jakarta_Sans'] text-xl font-bold tracking-tight text-white">
        S
      </span>
      <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold tracking-tight text-[#141b2b] transition-colors group-hover:text-[#006b2c]">
        Sellza
      </span>
    </Link>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("register");

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9ff] text-[#141b2b] antialiased">
      <header className="fixed inset-x-0 top-0 z-50 h-16 bg-[#f9f9ff]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-full w-full max-w-[1000px] items-center justify-between px-4 md:px-6">
          <AuthBrand />
          {mode === "register" ? (
            <div className="hidden items-center gap-6 sm:flex">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3e4a3d]">
                Merchant onboarding
              </span>
              <button
                type="button"
                className="text-sm font-medium text-[#3e4a3d] transition-colors hover:text-[#141b2b]"
                onClick={() => setMode("login")}
              >
                Exit to sign in
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden text-base font-semibold sm:inline">
                Login
              </span>
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-full bg-[#006b2c] text-sm font-semibold text-white"
              >
                S
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="flex flex-1 flex-col pt-16">
        <div className="mx-auto flex w-full max-w-[1180px] flex-1 items-center justify-center px-4 py-8 md:px-8 lg:py-12">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="hidden lg:col-span-6 lg:block">
              <AuthOverview mode={mode} />
            </div>

            <section className="mx-auto w-full max-w-[460px] lg:col-span-6 lg:ml-auto lg:mr-0">
              <div
                className={`rounded-xl bg-white p-5 shadow-sm sm:p-8 ${
                  mode === "login" ? "lg:shadow-md" : ""
                }`}
              >
                <AuthForm
                  key={mode}
                  mode={mode}
                  onModeChange={setMode}
                />
              </div>

              {mode === "login" && (
                <div className="mt-6 flex items-center gap-3.5 rounded-xl bg-[#caead6]/30 p-3.5 lg:hidden">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-[#006b2c]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[18px]"
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
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#141b2b]">
                      Live system operational
                    </p>
                    <p className="truncate text-[11px] leading-[14px] text-[#3e4a3d]">
                      Instant checkout, POS &amp; payout ready
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 animate-pulse rounded-full bg-[#006b2c]"
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full px-4 py-4 text-[#3e4a3d] md:px-8">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="text-xs leading-[18px]">
            © 2026 Sellza Inc. All rights reserved.
          </span>
          <nav
            aria-label="Support and legal"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:justify-end"
          >
            <a className="transition-colors hover:text-[#141b2b]" href="#support">
              Help &amp; Support
            </a>
            <a className="transition-colors hover:text-[#141b2b]" href="#privacy">
              Privacy
            </a>
            <a className="transition-colors hover:text-[#141b2b]" href="#terms">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

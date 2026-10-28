import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import PasswordInput from "../components/auth/PasswordInput";

type Status = "idle" | "loading" | "done";

function Brand() {
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

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9ff] text-[#141b2b] antialiased">
      <header className="h-16 bg-[#f9f9ff]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-full w-full max-w-[1000px] items-center px-4 md:px-6">
          <Brand />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-[460px] rounded-xl bg-white p-5 shadow-sm sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { session, loading, updatePassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>(
    {},
  );
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const nextErrors: { password?: string; confirm?: string } = {};
    if (!password) {
      nextErrors.password = "Enter a new password.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }
    if (confirm !== password) {
      nextErrors.confirm = "Passwords don't match.";
    }

    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      await updatePassword(password);
      setStatus("done");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("idle");
    }
  }

  // Supabase is still reading the recovery link from the URL
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f9f9ff]">
        <span className="size-8 animate-spin rounded-full border-4 border-[#006b2c]/20 border-t-[#006b2c]" />
      </div>
    );
  }

  // No session means the link was invalid, expired, or already used
  if (!session) {
    return (
      <Shell>
        <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-tight">
          Link invalid or expired
        </h1>
        <p className="mt-2 text-sm leading-5 text-[#3e4a3d]">
          This password reset link can&apos;t be used anymore. Request a new one
          from the login page.
        </p>
        <Link
          to="/auth"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#006b2c] px-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#00873a]"
        >
          Back to login
        </Link>
      </Shell>
    );
  }

  if (status === "done") {
    return (
      <Shell>
        <div
          role="status"
          className="rounded-lg border border-[#79db8d] bg-[#f7fff2] px-3 py-3 text-[13px] leading-[18px] text-[#005320]"
        >
          <p className="font-semibold">Password updated</p>
          <p className="mt-1">Your password has been changed successfully.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard", { replace: true })}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#006b2c] px-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#00873a]"
        >
          Continue to dashboard
        </button>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-tight">
        Set a new password
      </h1>
      <p className="mt-2 mb-6 text-sm leading-5 text-[#3e4a3d]">
        Choose a new password for {session.user.email}.
      </p>

      {formError && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-[#ffdad6] bg-[#fff8f7] px-3 py-2.5 text-[13px] leading-[18px] text-[#ba1a1a]"
        >
          {formError}
        </p>
      )}

      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <PasswordInput
          id="new-password"
          label="New password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setErrors((c) => ({ ...c, password: undefined }));
            setFormError("");
          }}
          autoComplete="new-password"
          error={errors.password}
          className="bg-[#f9f9ff]"
        />

        <PasswordInput
          id="confirm-password"
          label="Confirm new password"
          value={confirm}
          onChange={(value) => {
            setConfirm(value);
            setErrors((c) => ({ ...c, confirm: undefined }));
            setFormError("");
          }}
          autoComplete="new-password"
          error={errors.confirm}
          className="bg-[#f9f9ff]"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#006b2c] px-4 text-base font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-[#00873a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005320] disabled:cursor-wait disabled:opacity-75"
        >
          {status === "loading" ? "Please wait..." : "Update password"}
        </button>
      </form>
    </Shell>
  );
}
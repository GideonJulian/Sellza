import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

export type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

type FormValues = {
  fullName: string;
  email: string;
  password: string;
};

type FormField = keyof FormValues;
type ValidationErrors = Partial<Record<FormField, string>>;
type SubmissionState = "idle" | "loading" | "confirm";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  password: "",
};

function validateForm(values: FormValues, mode: AuthMode): ValidationErrors {
  const errors: ValidationErrors = {};

  if (mode === "register" && !values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Enter your password.";
  } else if (mode === "register" && values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  return errors;
}

function errorMessage(err: unknown) {
  return err instanceof Error
    ? err.message
    : "Something went wrong. Please try again.";
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FormDivider() {
  return (
    <div className="relative my-6 flex items-center justify-center">
      <span className="absolute inset-x-0 h-px bg-[#dce2f7]" />
      <span className="relative bg-white px-3 text-[11px] font-semibold uppercase leading-[14px] tracking-wider text-[#6e7b6c]">
        or
      </span>
    </div>
  );
}

function MobileLoginBrand() {
  return (
    <div className="mb-6 flex flex-col items-center justify-center pt-2 lg:hidden">
      <div className="flex items-center gap-2.5">
        <span className="grid size-10 place-items-center rounded-xl bg-[#006b2c] text-white shadow-sm">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-[22px]"
            fill="none"
          >
            <path
              d="M3 10h18M5 10v10h14V10M4 10l1-6h14l1 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-tight text-[#141b2b]">
          Sellza
        </span>
      </div>
      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#92f5a4]/50 px-2.5 py-1 text-[11px] font-semibold leading-[14px] text-[#007233]">
        <span className="size-1.5 rounded-full bg-[#006b2c]" />
        Merchant Workspace
      </span>
    </div>
  );
}

export default function AuthForm({ mode, onModeChange }: AuthFormProps) {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");
  const isRegister = mode === "register";
  const isLoading = submissionState === "loading";

  function updateField(field: FormField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmissionState("idle");
    setNotice("");
    setFormError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    const nextErrors = validateForm(values, mode);
    setErrors(nextErrors);
    setNotice("");
    setFormError("");

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionState("idle");
      return;
    }

    setSubmissionState("loading");

    try {
      const email = values.email.trim();

      if (isRegister) {
        const { needsConfirmation } = await signUp(
          values.fullName.trim(),
          email,
          values.password,
        );

        if (needsConfirmation) {
          setSubmissionState("confirm");
          return;
        }
      } else {
        await signIn(email, values.password);
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setFormError(errorMessage(err));
      setSubmissionState("idle");
    }
  }

  async function handleGoogleClick() {
    setFormError("");
    setNotice("");
    try {
      // Redirects the browser to Google, then back to /dashboard
      await signInWithGoogle();
    } catch (err) {
      setFormError(errorMessage(err));
    }
  }

  async function handleForgotPassword() {
    setFormError("");
    setNotice("");

    const email = values.email.trim();
    if (!EMAIL_PATTERN.test(email)) {
      setErrors((current) => ({
        ...current,
        email: "Enter your email address above first.",
      }));
      return;
    }

    try {
      await resetPassword(email);
      setNotice("If an account exists for that email, we've sent a reset link.");
    } catch (err) {
      setFormError(errorMessage(err));
    }
  }

  const inputSurface = isRegister ? "bg-[#f1f3ff]" : "bg-[#f9f9ff]";

  return (
    <>
      <MobileLoginBrand />

      <AuthHeader
        title={isRegister ? "Create your account" : "Welcome back"}
        description={
          isRegister
            ? "Start your Sellza journey. Create your account and manage your business from one place."
            : "Log in to your Sellza business account."
        }
        mode={mode}
      />

      {formError && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-[#ffdad6] bg-[#fff8f7] px-3 py-2.5 text-[13px] leading-[18px] text-[#ba1a1a]"
        >
          {formError}
        </p>
      )}

      {notice && (
        <p
          role="status"
          className="mb-4 rounded-lg border border-[#bdcaba] bg-[#f1f3ff] px-3 py-2.5 text-[13px] leading-[18px] text-[#3e4a3d]"
        >
          {notice}
        </p>
      )}

      {submissionState === "confirm" && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-[#79db8d] bg-[#f7fff2] px-3 py-3 text-[13px] leading-[18px] text-[#005320]"
        >
          <p className="font-semibold">Check your email</p>
          <p className="mt-1">
            We sent a confirmation link to {values.email.trim()}. Click it to
            activate your account, then log in.
          </p>
        </div>
      )}

      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={handleSubmit}
      >
        {isRegister && (
          <AuthInput
            id="full-name"
            label="Full name"
            placeholder="e.g. Amina Bello"
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            required
            error={errors.fullName}
            className={inputSurface}
          />
        )}

        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@store.com"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          autoComplete="email"
          required
          error={errors.email}
          className={inputSurface}
        />

        <div>
          <PasswordInput
            id="password"
            label="Password"
            value={values.password}
            onChange={(value) => updateField("password", value)}
            autoComplete={isRegister ? "new-password" : "current-password"}
            error={errors.password}
            className={inputSurface}
            labelAction={
              !isRegister ? (
                <button
                  type="button"
                  className="text-xs font-medium leading-4 text-[#006b2c] transition-colors hover:text-[#005320] hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              ) : undefined
            }
          />
          {isRegister && !errors.password && (
            <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-[14px] tracking-[0.02em] text-[#3e4a3d]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mt-px size-[14px] shrink-0 text-[#6e7b6c]"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 11v5m0-8h.01"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span>Use at least 8 characters with numbers or symbols.</span>
            </p>
          )}
        </div>

        {!isRegister && (
          <div className="flex items-center justify-between pt-0.5 lg:hidden">
            <label className="flex min-h-6 cursor-pointer select-none items-center gap-2 text-xs leading-4 text-[#3e4a3d]">
              <input
                type="checkbox"
                defaultChecked
                className="size-4 cursor-pointer accent-[#006b2c]"
              />
              Remember store session
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] leading-[14px] text-[#6e7b6c]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-[14px]"
                fill="none"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
              256-bit
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#006b2c] px-4 text-base font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-[#00873a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005320] disabled:cursor-wait disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4 animate-spin"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeOpacity=".3"
                  strokeWidth="3"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Please wait...
            </>
          ) : (
            <>
              {isRegister ? "Create account" : "Log in"}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-[18px]"
                fill="none"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </form>

      <FormDivider />

      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#f9f9ff] px-4 text-sm font-medium text-[#141b2b] shadow-[inset_0_0_0_1px_#e5e7eb] transition-colors hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006b2c]"
        onClick={handleGoogleClick}
      >
        <GoogleMark />
        Continue with Google
      </button>

      {isRegister && (
        <p className="mt-6 text-center text-[11px] leading-[18px] tracking-[0.02em] text-[#3e4a3d]">
          By creating an account, you agree to Sellza&apos;s{" "}
          <span className="font-medium text-[#006b2c]">Terms of Service</span>{" "}
          and <span className="font-medium text-[#006b2c]">Privacy Policy</span>.
        </p>
      )}

      <div className="mt-6 rounded-lg bg-[#f1f3ff]/60 p-3 text-center text-[13px] leading-[18px] text-[#3e4a3d]">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="font-semibold text-[#006b2c] transition-colors hover:text-[#005320] hover:underline"
          onClick={() => onModeChange(isRegister ? "login" : "register")}
        >
          {isRegister ? "Log in" : "Create account"}
        </button>
      </div>
    </>
  );
}
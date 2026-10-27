import { useState } from "react";
import type { ReactNode } from "react";
import AuthInput from "./AuthInput";

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
  labelAction?: ReactNode;
  className?: string;
};

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete,
  error,
  labelAction,
  className,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <AuthInput
        id={id}
        label={label}
        type={isVisible ? "text" : "password"}
        labelAction={labelAction}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required
        error={error}
        className={className}
        suffix={
          <button
            type="button"
            className="absolute inset-y-0 right-0 inline-flex min-w-11 items-center justify-center rounded-r-lg text-[#6e7b6c] transition hover:text-[#141b2b] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#006b2c]"
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            onClick={() => setIsVisible((visible) => !visible)}
          >
            {isVisible ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
              >
                <path
                  d="M3 3 21 21M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.7 10.7 0 0 1 12 5c5.5 0 9 7 9 7a14.5 14.5 0 0 1-3.2 3.8M6.2 6.2C3.9 7.8 3 12 3 12s3.5 7 9 7c1.1 0 2.2-.3 3.1-.7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
              >
                <path
                  d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
            )}
          </button>
        }
      />
    </div>
  );
}

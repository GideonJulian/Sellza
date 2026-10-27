import type { InputHTMLAttributes, ReactNode } from "react";

type AuthInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
> & {
  id: string;
  label: string;
  type?: "email" | "text" | "password";
  error?: string;
  labelAction?: ReactNode;
  suffix?: ReactNode;
};

export default function AuthInput({
  id,
  label,
  type = "text",
  error,
  labelAction,
  suffix,
  className = "",
  ...inputProps
}: AuthInputProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-5 text-[#141b2b]"
        >
          {label}
        </label>
        {labelAction}
      </div>
      <div className="relative">
        <input
          {...inputProps}
          id={id}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-lg px-3.5 text-sm leading-5 text-[#141b2b] outline-none transition-colors placeholder:text-[#6e7b6c] focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#006b2c] disabled:cursor-not-allowed disabled:opacity-70 shadow-[inset_0_0_0_1px_#e5e7eb] ${
            error
              ? "shadow-[inset_0_0_0_1.5px_#ba1a1a]"
              : ""
          } ${suffix ? "pr-12" : ""} ${className}`}
        />
        {suffix}
      </div>
      {error && (
        <p id={errorId} className="text-xs leading-4 text-[#ba1a1a]">
          {error}
        </p>
      )}
    </div>
  );
}

type AuthHeaderProps = {
  title: string;
  description: string;
  mode: "login" | "register";
};

export default function AuthHeader({
  title,
  description,
  mode,
}: AuthHeaderProps) {
  return (
    <div className="mb-5">
      <h1
        className={`font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#141b2b] ${
          mode === "register"
            ? "text-[26px] leading-[34px] lg:text-xl lg:leading-7"
            : "text-xl leading-7 lg:text-2xl lg:leading-8"
        }`}
      >
        {title}
      </h1>
      <p className="mt-1 text-[13px] leading-[18px] tracking-[0.005em] text-[#3e4a3d]">
        {description}
      </p>
    </div>
  );
}

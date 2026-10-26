import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link
      className="inline-flex items-center gap-[7px] whitespace-nowrap text-[14px] font-[750] text-[#101713]"
      to="/"
      aria-label="Sellza home"
    >
      <span
        className="grid h-[15px] w-[15px] rotate-[-12deg] place-items-center rounded-[50%_50%_50%_2px] bg-[#16a34a]"
        aria-hidden="true"
      >
        <span className="h-[5px] w-[5px] rounded-full border border-white" />
      </span>
      <span>Sellza</span>
    </Link>
  );
}

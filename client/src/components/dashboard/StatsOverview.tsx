const stats = [
  { label: "Sales", value: "₦0" },
  { label: "Orders", value: "0" },
  { label: "Products", value: "0" },
  { label: "Pending", value: "0" },
];

export default function StatsOverview() {
  return (
    <section
      aria-label="Store overview"
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col justify-between gap-1 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-none sm:p-4 sm:shadow-sm"
        >
          <span className="text-[13px] font-medium leading-5 text-[#6b7280]">
            {stat.label}
          </span>
          <span className="mt-1 text-2xl font-bold leading-8 tabular-nums text-[#111827]">
            {stat.value}
          </span>
        </div>
      ))}
    </section>
  );
}

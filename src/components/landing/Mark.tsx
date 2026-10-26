type MarkProps = {
  name: string;
  className?: string;
};

export default function Mark({
  name,
  className = "h-[15px] w-[15px] shrink-0",
}: MarkProps) {
  const paths: Record<string, string> = {
    store: "M3 10.5 12 4l9 6.5V21H3V10.5ZM8 21v-7h8v7",
    check: "m5 12 4 4L19 6M4 4h9M4 8h4",
    card: "M3 6h18v12H3zM3 10h18",
    chat: "M4 5h16v12H9l-5 4V5Z",
    inventory: "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm-8 4.5 8 4.5 8-4.5M12 12v9",
    chart: "M4 20V10m6 10V4m6 16v-7m6 7H2",
    globe:
      "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3a14 14 0 0 1 0 18m0-18a14 14 0 0 0 0 18",
    payment: "M3 6h18v12H3zM3 10h18m-14 4h4",
    clock: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    box: "m12 3 9 5v9l-9 5-9-5V8l9-5Zm-9 5 9 5 9-5m-9 5v9",
    arrow: "M5 12h14m-6-6 6 6-6 6",
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d={paths[name] ?? paths.check}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

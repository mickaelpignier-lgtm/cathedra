interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y border-white/12"
      style={{ background: "var(--acc)" }}
    >
      <div
        className="marquee-track flex w-[200%] gap-9 py-2.5 font-display uppercase leading-none text-[#F2EFE9]"
        style={{ fontSize: "clamp(15px,2vw,22px)", letterSpacing: ".02em" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

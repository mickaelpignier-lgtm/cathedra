interface SubNavItem {
  id: string;
  label: string;
}

interface StadiumSubNavProps {
  items: SubNavItem[];
}

export function StadiumSubNav({ items }: StadiumSubNavProps) {
  return (
    <nav
      className="sticky top-14 z-[60] flex overflow-x-auto border-b border-white/12 bg-[rgba(11,11,12,.92)] backdrop-blur-[10px]"
      style={{ scrollbarWidth: "none" }}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="whitespace-nowrap border-r border-white/8 px-[clamp(12px,2vw,20px)] py-[13px] font-mono text-[10.5px] uppercase tracking-[.18em] text-[#8E8E88] transition-colors hover:bg-white/6 hover:text-[#f2efe9]"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

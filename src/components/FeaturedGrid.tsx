import Image from "next/image";
import type { Stadium } from "@/lib/stadiums";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

interface FeaturedGridProps {
  stadiums: Stadium[];
}

const LAYOUT = [
  { col: "col-span-12 lg:col-span-7", ratio: "aspect-[4/3]", title: "text-[clamp(26px,3.4vw,52px)]" },
  { col: "col-span-12 lg:col-span-5", ratio: "aspect-[4/3] lg:aspect-[3/4]", title: "text-[clamp(22px,2.4vw,34px)]" },
  { col: "col-span-12", ratio: "aspect-[4/3] lg:aspect-[21/9]", title: "text-[clamp(22px,2.4vw,34px)]" },
];

export function FeaturedGrid({ stadiums }: FeaturedGridProps) {
  return (
    <Reveal>
      <div className="grid grid-cols-12 gap-[clamp(10px,1.4vw,18px)]">
        {stadiums.map((stadium, i) => {
          const layout = LAYOUT[i] ?? LAYOUT[LAYOUT.length - 1];
          return (
            <Link
              key={stadium.slug}
              href={`/stades/${stadium.slug}`}
              className={layout.col}
            >
              <article className={`group relative overflow-hidden ${layout.ratio}`}>
                <Image
                  src={stadium.heroImage.src}
                  alt={stadium.heroImage.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 bg-[#0b0b0c] px-2 py-1 font-mono text-[10px] tracking-[.16em]" style={{ color: "var(--acc)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="absolute inset-x-0 bottom-0 h-[55%]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,12,0), rgba(11,11,12,.85))",
                  }}
                />
                <div className="absolute inset-x-3.5 bottom-3">
                  <div className={`font-display uppercase leading-[.92] ${layout.title}`}>
                    {stadium.name}
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-[rgba(242,239,233,.62)]">
                    {stadium.city}, {stadium.country} — {stadium.league}
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </Reveal>
  );
}

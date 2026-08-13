import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Stadium } from "@/lib/stadiums";
import { projectCoordinates } from "@/lib/format";
import { Reveal } from "./Reveal";

interface WorldMapPreviewProps {
  stadiums: Stadium[];
}

export function WorldMapPreview({ stadiums }: WorldMapPreviewProps) {
  const t = useTranslations("home");

  const countryCounts = new Map<string, number>();
  stadiums.forEach((s) => {
    countryCounts.set(s.country, (countryCounts.get(s.country) ?? 0) + 1);
  });

  return (
    <section
      className="px-[clamp(14px,3vw,34px)] py-[clamp(48px,7vw,110px)]"
      style={{ background: "#F2EFE9", color: "#0B0B0C" }}
    >
      <div className="max-w-[44ch]">
        <div
          className="font-mono text-[11px] uppercase tracking-[.22em]"
          style={{ color: "#5E5E58" }}
        >
          {t("mapKicker")}
        </div>
        <h2
          className="my-3 font-display uppercase leading-[.9]"
          style={{ fontSize: "clamp(34px,6vw,78px)" }}
        >
          {t("mapTitle")}
        </h2>
        <p className="mb-5 text-[16px] leading-[1.55]" style={{ color: "#3A3A36" }}>
          {t("mapSubtitle")}
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from(countryCounts.entries()).map(([country, count]) => (
            <div
              key={country}
              className="flex cursor-pointer gap-2 rounded-full border px-3.5 py-2 text-[12px] tracking-[.06em] transition-colors hover:bg-[#0b0b0c] hover:text-[#f2efe9]"
              style={{ borderColor: "rgba(11,11,12,.2)" }}
            >
              <span>{country}</span>
              <span className="font-mono opacity-50">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-8">
        <div
          id="map"
          className="dot-grid relative aspect-video overflow-hidden"
          style={{ background: "#0B0B0C" }}
        >
          {stadiums.map((stadium) => {
            const { x, y } = projectCoordinates(
              stadium.coordinates.lat,
              stadium.coordinates.lng
            );
            return (
              <Link
                key={stadium.slug}
                href={`/stades/${stadium.slug}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className="block h-3.5 w-3.5 rounded-full"
                  style={{
                    background: "var(--acc)",
                    boxShadow: "0 0 0 8px color-mix(in srgb, var(--acc) 22%, transparent)",
                  }}
                />
                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap bg-[#0B0B0C] px-2 py-1 font-mono text-[10px] uppercase tracking-[.1em] text-[#F2EFE9] opacity-0 transition-opacity group-hover:opacity-100">
                  {stadium.name}
                </span>
              </Link>
            );
          })}
          <div className="absolute bottom-3 left-3.5 font-mono text-[10px] uppercase tracking-[.18em] text-[rgba(242,239,233,.4)]">
            {stadiums.length} {t("statsStadiums")}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

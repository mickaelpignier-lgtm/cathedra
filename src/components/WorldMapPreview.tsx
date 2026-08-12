import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Stadium } from "@/lib/stadiums";
import { projectCoordinates } from "@/lib/format";

interface WorldMapPreviewProps {
  stadiums: Stadium[];
}

export function WorldMapPreview({ stadiums }: WorldMapPreviewProps) {
  const t = useTranslations("home");

  return (
    <section aria-labelledby="map-title">
      <div className="flex flex-col gap-2 text-center">
        <h2 id="map-title" className="text-2xl font-bold text-white sm:text-3xl">
          {t("mapTitle")}
        </h2>
        <p className="text-slate-400">{t("mapSubtitle")}</p>
      </div>
      <div
        className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 sm:aspect-[21/9]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(52,211,153,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />
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
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/60 group-hover:bg-emerald-300/80" />
                <span className="relative h-2.5 w-2.5 rounded-full border border-slate-950 bg-emerald-400 group-hover:bg-emerald-300" />
              </span>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {stadium.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

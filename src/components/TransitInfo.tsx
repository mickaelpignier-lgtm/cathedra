import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";

interface TransitInfoProps {
  stadium: Stadium;
}

const icons = {
  plane: (
    <path d="M10.5 21 9 20l1.5-4.5L4 17l-1-1.5L7.5 12 3 8l1-1.5 6 2L11.5 3l1.5.5-1 6 5.5-2 1 1.5-6 4 4.5 3.5-1 1.5-6.5-2L11 21Z" />
  ),
  transit: (
    <path d="M12 2c-4.4 0-8 .5-8 4v10c0 1.5 1 3 2.5 3l-1.5 1.5V21h2.7l2-2h4.6l2 2H19v-.5L17.5 19c1.5 0 2.5-1.5 2.5-3V6c0-3.5-3.6-4-8-4Zm-4.5 12A1.5 1.5 0 1 1 7.5 11a1.5 1.5 0 0 1 0 3Zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18 9H6V6h12v3Z" />
  ),
  route: (
    <path d="M14 3v2h3.6l-8.2 8.2 1.4 1.4L19 6.4V10h2V3h-7ZM5 5h5V3H3v7h2V5Zm0 14v-5H3v7h7v-2H5Zm14-5v5h-5v2h7v-7h-2Z" />
  ),
} as const;

export function TransitInfo({ stadium }: TransitInfoProps) {
  const t = useTranslations("stadium");

  const items = [
    {
      icon: icons.plane,
      label: t("nearestAirport"),
      value: `${stadium.howToGetThere.nearestAirport} · ${stadium.howToGetThere.airportDistanceKm} km`,
    },
    {
      icon: icons.route,
      label: t("fromAirport"),
      value: stadium.howToGetThere.fromAirport,
    },
    {
      icon: icons.transit,
      label: t("publicTransport"),
      value: stadium.howToGetThere.publicTransport,
    },
  ];

  return (
    <section
      aria-labelledby="how-to-get-there"
      className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-6 sm:p-8"
    >
      <h2
        id="how-to-get-there"
        className="flex items-center gap-2 text-xl font-bold text-white"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            {icons.route}
          </svg>
        </span>
        {t("howToGetThereTitle")}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                {item.icon}
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {item.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-200">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-slate-950/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
          {t("bestTimeTitle")}
        </p>
        <p className="mt-1 text-sm text-slate-200">{stadium.bestTimeToVisit}</p>
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import { contrastTextColor } from "@/lib/format";

interface TravelSectionProps {
  stadium: Stadium;
}

const GLYPHS = [
  "rounded-full border-2 border-[#0b0b0c]",
  "border-2 border-[#0b0b0c]",
  "rotate-45 border-2 border-[#0b0b0c]",
];

export function TravelSection({ stadium }: TravelSectionProps) {
  const t = useTranslations("stadium");

  const cards = [
    {
      title: t("nearestAirport"),
      body: `${stadium.howToGetThere.nearestAirport} — ${stadium.howToGetThere.airportDistanceKm} km`,
      note: stadium.howToGetThere.fromAirport,
    },
    {
      title: t("publicTransport"),
      body: stadium.howToGetThere.publicTransport,
      note: null,
    },
  ];

  return (
    <section
      id="yaller"
      className="scroll-mt-[110px] px-[clamp(14px,3vw,34px)] py-[clamp(46px,6vw,100px)]"
      style={{ background: "#F2EFE9", color: "#0B0B0C" }}
    >
      <div className="mb-[clamp(22px,3vw,44px)] flex flex-wrap items-baseline justify-between gap-4">
        <h2
          className="m-0 font-display uppercase leading-[.88]"
          style={{ fontSize: "clamp(34px,6.5vw,84px)" }}
        >
          {t("howToGetThereTitle")}
        </h2>
      </div>

      <div className="grid gap-px border border-[rgba(11,11,12,.16)] bg-[rgba(11,11,12,.16)] sm:grid-cols-2">
        {cards.map((card, i) => (
          <div key={card.title} style={{ background: "#F2EFE9" }} className="p-[clamp(20px,2.2vw,30px)]">
            <div className="flex items-center gap-3">
              <div className={`h-[34px] w-[34px] flex-none ${GLYPHS[i]}`} />
              <div className="font-display text-[clamp(20px,2.4vw,28px)] uppercase leading-none">
                {card.title}
              </div>
            </div>
            <p className="mt-4 text-[14.5px] leading-[1.5]">{card.body}</p>
            {card.note && (
              <p className="mt-2 text-[13.5px] leading-[1.55]" style={{ color: "#3A3A36" }}>
                {card.note}
              </p>
            )}
            {i === 1 && stadium.transitLines.length > 0 && (
              <div className="mt-3.5 flex flex-wrap gap-2">
                {stadium.transitLines.map((line) => (
                  <span
                    key={line.label + line.network}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{
                      background: line.color,
                      color: contrastTextColor(line.color),
                    }}
                    title={line.network}
                  >
                    <span className="font-display text-[12px] uppercase leading-none">
                      {line.label}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3.5 border border-[rgba(11,11,12,.2)] px-[18px] py-4">
        <div className="mt-1.5 h-2.5 w-2.5 flex-none" style={{ background: "var(--acc)" }} />
        <p className="m-0 text-[14px] leading-[1.55]" style={{ color: "#3A3A36" }}>
          <strong className="text-[#0B0B0C]">{t("whenToComeTag")} — </strong>
          {stadium.bestTimeToVisit}
        </p>
      </div>
    </section>
  );
}

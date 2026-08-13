import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import type { NearbyPlace } from "@/db/schema";
import { priceTierLabel } from "@/lib/format";

interface NearbySectionProps {
  stadium: Stadium;
}

function NearbyGroup({
  title,
  places,
  currency,
}: {
  title: string;
  places: NearbyPlace[];
  currency: string;
}) {
  return (
    <div>
      <div className="font-mono text-[10.5px] uppercase tracking-[.2em] text-[#8E8E88]">
        {title}
      </div>
      <ul className="mt-3 space-y-0">
        {places.map((place) => (
          <li
            key={place.name}
            className="flex items-center justify-between gap-3 border-t border-white/12 py-3 first:border-t-0"
          >
            <span className="text-[14px] leading-tight text-[#F2EFE9]">
              {place.name}
            </span>
            <span className="flex shrink-0 flex-col items-end gap-0.5">
              <span
                className="font-mono text-[12px]"
                style={{ color: "var(--acc)" }}
              >
                {priceTierLabel(place.tier, currency)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[.1em] text-[#8E8E88]">
                {place.distanceLabel}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NearbySection({ stadium }: NearbySectionProps) {
  const t = useTranslations("stadium");

  return (
    <section
      id="dormir"
      className="scroll-mt-[110px] px-[clamp(14px,3vw,34px)] py-[clamp(46px,6vw,100px)]"
    >
      <div className="mb-[clamp(20px,2.6vw,36px)] flex flex-wrap items-baseline justify-between gap-4">
        <h2
          className="m-0 font-display uppercase leading-[.88]"
          style={{ fontSize: "clamp(34px,6.5vw,84px)" }}
        >
          {t("nearbyTitle")}
        </h2>
        <span className="font-mono text-[10.5px] uppercase tracking-[.18em] text-[#8E8E88]">
          {t("nearbyPriceHint")}
        </span>
      </div>
      <div className="grid gap-x-[clamp(20px,2.6vw,40px)] gap-y-8 sm:grid-cols-3">
        <NearbyGroup
          title={t("nearbyHotels")}
          places={stadium.nearbyHotels}
          currency={stadium.tickets.currency}
        />
        <NearbyGroup
          title={t("nearbyAirbnbs")}
          places={stadium.nearbyAirbnbs}
          currency={stadium.tickets.currency}
        />
        <NearbyGroup
          title={t("nearbyRestaurants")}
          places={stadium.nearbyRestaurants}
          currency={stadium.tickets.currency}
        />
      </div>
      <p
        className="mt-[clamp(20px,2.6vw,36px)] max-w-[70ch] text-[12.5px] leading-[1.5]"
        style={{ color: "#8E8E88" }}
      >
        {t("nearbyDisclaimer")}
      </p>
    </section>
  );
}

import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";

interface LocationSectionProps {
  stadium: Stadium;
}

export function LocationSection({ stadium }: LocationSectionProps) {
  const t = useTranslations("stadium");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${stadium.coordinates.lat},${stadium.coordinates.lng}`;

  return (
    <section
      id="carte"
      className="scroll-mt-[110px] px-[clamp(14px,3vw,34px)] pb-[clamp(60px,8vw,120px)] pt-[clamp(44px,6vw,96px)]"
    >
      <div className="grid items-center gap-[clamp(16px,2.5vw,36px)] sm:grid-cols-2">
        <div>
          <h2
            className="m-0 mb-3.5 font-display uppercase leading-[.9]"
            style={{ fontSize: "clamp(30px,5vw,62px)" }}
          >
            {t("location")}
          </h2>
          <p
            className="m-0 mb-4.5 max-w-[42ch] text-[15px] leading-[1.6]"
            style={{ color: "rgba(242,239,233,.7)" }}
          >
            {stadium.howToGetThere.publicTransport}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border px-5 py-3 text-[12px] uppercase tracking-[.18em] transition-colors"
            style={{ borderColor: "var(--acc)", color: "var(--acc)" }}
          >
            {t("openDirections")}
          </a>
        </div>
        <div
          className="line-grid relative aspect-[4/3] border"
          style={{ background: "#111214", borderColor: "rgba(242,239,233,.14)" }}
        >
          <div
            className="absolute left-[52%] top-[46%] h-[26px] w-[26px] rounded-full"
            style={{
              background: "var(--acc)",
              boxShadow: "0 0 0 10px color-mix(in srgb, var(--acc) 22%, transparent)",
            }}
          />
          <div className="absolute bottom-3 left-3.5 font-mono text-[10px] uppercase tracking-[.18em] text-[rgba(242,239,233,.4)]">
            {stadium.city} — {stadium.coordinates.lat.toFixed(4)} / {stadium.coordinates.lng.toFixed(4)}
          </div>
        </div>
      </div>
    </section>
  );
}

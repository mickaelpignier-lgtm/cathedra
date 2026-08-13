import { useTranslations, useLocale } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { formatNumber, formatPrice, contrastTextColor } from "@/lib/format";
import { clubBadges } from "@/lib/clubBadges";
import { ParallaxImage } from "./ParallaxImage";
import { ShareButtons } from "./ShareButtons";

interface StadiumHeroProps {
  stadium: Stadium;
}

export function StadiumHero({ stadium }: StadiumHeroProps) {
  const t = useTranslations("stadium");
  const locale = useLocale() as Locale;

  const stats = [
    { label: t("capacity"), value: formatNumber(stadium.capacity, locale) },
    { label: t("opened"), value: String(stadium.yearOpened) },
    {
      label: t("guidedTour"),
      value: formatPrice(
        stadium.tickets.guidedTourPriceFrom,
        stadium.tickets.currency,
        locale
      ),
    },
    { label: stadium.league, value: stadium.club },
  ];

  return (
    <section className="relative -mt-[99px] flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden">
      <ParallaxImage src={stadium.heroImage.src} alt={stadium.heroImage.alt} priority />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 10%, rgba(46,91,255,.16), transparent 60%), linear-gradient(180deg, rgba(11,11,12,.7) 0%, rgba(11,11,12,.05) 42%, rgba(11,11,12,.96) 92%)",
        }}
      />

      <div className="relative px-[clamp(14px,3vw,34px)] pb-[clamp(20px,3vw,34px)]">
        <div
          className="mb-3.5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em]"
          style={{ color: "var(--acc)" }}
        >
          <span
            className="pulse-dot h-[7px] w-[7px] rounded-full"
            style={{ background: "var(--acc)" }}
          />
          <span>
            {stadium.country} · {stadium.league} · {stadium.city}
          </span>
        </div>
        <h1
          className="font-display uppercase leading-[.8] tracking-[-.02em]"
          style={{ fontSize: "clamp(58px,15vw,220px)" }}
        >
          {stadium.name}
        </h1>
        <div
          className="mt-3.5 flex items-center gap-2.5 text-[clamp(13px,1.6vw,17px)]"
          style={{ color: "rgba(242,239,233,.62)" }}
        >
          {(clubBadges[stadium.slug] ?? []).map((badge) => (
            <span
              key={badge.initials}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[8px] font-semibold"
              style={{
                background: badge.color,
                color: contrastTextColor(badge.color),
              }}
              title={badge.initials}
            >
              {badge.initials.slice(0, 3)}
            </span>
          ))}
          <span>{stadium.club}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-[clamp(18px,4vw,54px)] border-t border-white/16 pt-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8E8E88]">
                {s.label}
              </div>
              <div className="mt-1 font-display text-[clamp(19px,2.6vw,28px)] uppercase">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <a
            href="#billets"
            className="px-6 py-3.5 text-[12.5px] font-semibold uppercase tracking-[.16em] transition-colors"
            style={{ background: "var(--acc)", color: "#F2EFE9" }}
          >
            {t("heroCtaPrimary")}
          </a>
          <a
            href="#boutique"
            className="border border-white/35 px-6 py-3.5 text-[12.5px] font-semibold uppercase tracking-[.16em] text-[#F2EFE9] transition-colors hover:border-white hover:bg-white/8"
          >
            {t("heroCtaSecondary")}
          </a>
        </div>

        <div className="mt-5">
          <ShareButtons title={stadium.name} />
        </div>
      </div>
    </section>
  );
}

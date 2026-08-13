import { useTranslations } from "next-intl";
import { ParallaxImage } from "./ParallaxImage";

interface HomeHeroProps {
  stadiumCount: number;
  countryCount: number;
}

export function HomeHero({ stadiumCount, countryCount }: HomeHeroProps) {
  const t = useTranslations("home");

  return (
    <section className="relative flex h-[100svh] min-h-[560px] flex-col justify-end overflow-hidden">
      <ParallaxImage
        src="/images/home/maracana-hero.jpg"
        alt=""
        priority
        factor={0.22}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,12,.55) 0%, rgba(11,11,12,.1) 38%, rgba(11,11,12,.94) 88%)",
        }}
      />

      <div className="relative px-[clamp(14px,3vw,34px)] pb-[clamp(18px,3vw,30px)]">
        <div
          className="mb-3.5 font-mono text-[11px] uppercase tracking-[.22em]"
          style={{ color: "var(--acc)" }}
        >
          {t("heroKicker")}
        </div>
        <h1
          className="max-w-[14ch] font-display uppercase leading-[.84] tracking-[-.015em]"
          style={{ fontSize: "clamp(52px,13.5vw,190px)" }}
        >
          {t("heroTitle")}
        </h1>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-white/16 pt-4">
          <p
            className="m-0 max-w-[46ch] text-[clamp(14px,1.6vw,17px)] leading-[1.5]"
            style={{ color: "rgba(242,239,233,.74)" }}
          >
            {t("heroSubtitle")}
          </p>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[.14em] text-[#8E8E88]">
            <span>
              {stadiumCount} {t("statsStadiums")}
            </span>
            <span>
              {countryCount} {t("statsCountries")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

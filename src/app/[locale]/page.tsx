import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getAllStadiums } from "@/lib/stadiums";
import { HomeHero } from "@/components/HomeHero";
import { Marquee } from "@/components/Marquee";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { WorldMapPreview } from "@/components/WorldMapPreview";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("home");
  const stadiums = await getAllStadiums(locale as Locale);
  const countryCount = new Set(stadiums.map((s) => s.country)).size;
  const featured = stadiums.slice(0, 3);

  return (
    <>
      <HomeHero stadiumCount={stadiums.length} countryCount={countryCount} />

      <Marquee items={stadiums.map((s) => s.name)} />

      <section className="px-[clamp(14px,3vw,34px)] py-[clamp(48px,7vw,110px)]">
        <div className="mb-[clamp(22px,3vw,44px)] flex flex-wrap items-end justify-between gap-4">
          <h2
            className="m-0 font-display uppercase leading-[.9]"
            style={{ fontSize: "clamp(34px,6.5vw,86px)" }}
          >
            {t("featuredTitle")}
          </h2>
          <div className="font-mono text-[11px] uppercase tracking-[.16em] text-[#8E8E88]">
            {t("featuredSubtitle")}
          </div>
        </div>
        <FeaturedGrid stadiums={featured} />
      </section>

      <WorldMapPreview stadiums={stadiums} />

      <Footer variant="home" />
    </>
  );
}

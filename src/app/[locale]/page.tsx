import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getAllStadiums } from "@/lib/stadiums";
import { HomeHero } from "@/components/HomeHero";
import { StadiumCard } from "@/components/StadiumCard";
import { WorldMapPreview } from "@/components/WorldMapPreview";

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
  const stadiums = getAllStadiums(locale as Locale);
  const featured = stadiums.slice(0, 3);

  const steps = [
    {
      title: t("howItWorksStep1Title"),
      body: t("howItWorksStep1Body"),
    },
    {
      title: t("howItWorksStep2Title"),
      body: t("howItWorksStep2Body"),
    },
    {
      title: t("howItWorksStep3Title"),
      body: t("howItWorksStep3Body"),
    },
  ];

  return (
    <>
      <HomeHero />

      <section className="border-b border-white/10 bg-slate-900/50">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-4 py-8 text-center sm:px-6">
          <div>
            <p className="text-3xl font-bold text-emerald-400">
              {stadiums.length}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-400 sm:text-sm">
              {t("statsStadiums")}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-400">
              {new Set(stadiums.map((s) => s.country)).size}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-400 sm:text-sm">
              {t("statsCountries")}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-400">4</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-400 sm:text-sm">
              {t("statsLanguages")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("featuredTitle")}
            </h2>
            <p className="mt-1 text-slate-400">{t("featuredSubtitle")}</p>
          </div>
          <Link
            href="/stades"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            {t("exploreAll")} &rarr;
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((stadium, index) => (
            <StadiumCard
              key={stadium.slug}
              stadium={stadium}
              priority={index === 0}
            />
          ))}
        </div>
      </section>

      <section id="map" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <WorldMapPreview stadiums={stadiums} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          {t("howItWorksTitle")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-bold text-emerald-400">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

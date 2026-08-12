import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getStadiumBySlug, getStadiumSlugs } from "@/lib/stadiums";
import { StadiumHero } from "@/components/StadiumHero";
import { TransitInfo } from "@/components/TransitInfo";
import { WhatToSee } from "@/components/WhatToSee";
import { TicketsCard } from "@/components/TicketsCard";
import { ShopSection } from "@/components/ShopSection";
import { StadiumGallery } from "@/components/StadiumGallery";
import { InsiderTip } from "@/components/InsiderTip";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cathedra.vercel.app";

interface StadiumPageParams {
  locale: string;
  slug: string;
}

export function generateStaticParams() {
  const slugs = getStadiumSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<StadiumPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const stadium = getStadiumBySlug(slug, locale as Locale);

  if (!stadium) {
    return {};
  }

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/stades/${slug}`])
  );

  const title = `${stadium.name} — ${stadium.club}`;
  const description = stadium.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/stades/${slug}`,
      languages: {
        ...languages,
        "x-default": `${siteUrl}/${routing.defaultLocale}/stades/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/stades/${slug}`,
      images: [{ url: stadium.heroImage.src }],
      locale,
      type: "article",
    },
  };
}

export default async function StadiumPage({
  params,
}: {
  params: Promise<StadiumPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const stadium = getStadiumBySlug(slug, locale as Locale);
  const t = await getTranslations("stadium");

  if (!stadium) {
    notFound();
  }

  return (
    <div className="pb-16">
      <StadiumHero stadium={stadium} />

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TransitInfo stadium={stadium} />
          <WhatToSee stadium={stadium} />
          <ShopSection stadium={stadium} />
          <StadiumGallery stadium={stadium} />
        </div>
        <div className="space-y-6">
          <TicketsCard stadium={stadium} />
          <InsiderTip tip={stadium.insiderTip} />
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t("practicalInfoTitle")}
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">{t("club")}</dt>
                <dd className="text-right text-white">{stadium.club}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">{t("location")}</dt>
                <dd className="text-right text-white">
                  {stadium.city}, {stadium.country}
                </dd>
              </div>
            </dl>
            <a
              href={stadium.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              {t("officialWebsite")} &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getStadiumBySlug, getStadiumSlugs } from "@/lib/stadiums";
import { StadiumHero } from "@/components/StadiumHero";
import { StadiumSubNav } from "@/components/StadiumSubNav";
import { StadiumGallery } from "@/components/StadiumGallery";
import { TravelSection } from "@/components/TravelSection";
import { TicketsCard } from "@/components/TicketsCard";
import { WhatToSee } from "@/components/WhatToSee";
import { HistorySection } from "@/components/HistorySection";
import { NearbySection } from "@/components/NearbySection";
import { ShopSection } from "@/components/ShopSection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cathedra.vercel.app";

interface StadiumPageParams {
  locale: string;
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await getStadiumSlugs();
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
  const stadium = await getStadiumBySlug(slug, locale as Locale);

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

  const stadium = await getStadiumBySlug(slug, locale as Locale);
  const t = await getTranslations("stadium");

  if (!stadium) {
    notFound();
  }

  const navItems = [
    { id: "galerie", label: t("navGallery") },
    { id: "yaller", label: t("navTravel") },
    { id: "billets", label: t("navTickets") },
    { id: "voir", label: t("navSee") },
    { id: "dormir", label: t("navStay") },
    { id: "boutique", label: t("navShop") },
    { id: "carte", label: t("navMap") },
  ];

  return (
    <>
      <StadiumSubNav items={navItems} />
      <StadiumHero stadium={stadium} />
      <StadiumGallery stadium={stadium} />
      <TravelSection stadium={stadium} />
      <TicketsCard stadium={stadium} />
      <WhatToSee stadium={stadium} />
      <HistorySection stadium={stadium} />
      <NearbySection stadium={stadium} />
      <ShopSection stadium={stadium} />
      <LocationSection stadium={stadium} />
      <Footer variant="page" meta={stadium.name} />
    </>
  );
}

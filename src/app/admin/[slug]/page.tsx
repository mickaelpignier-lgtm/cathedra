import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { stadiums, stadiumTranslations } from "@/db/schema";
import { locales, type Locale } from "@/i18n/routing";
import { StadiumForm } from "@/components/admin/StadiumForm";
import type { StadiumFormData, TranslationFormData } from "@/app/admin/actions";

export default async function EditStadiumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = getDb();

  const [stadium] = await db.select().from(stadiums).where(eq(stadiums.slug, slug));
  if (!stadium) notFound();

  const translationRows = await db
    .select()
    .from(stadiumTranslations)
    .where(eq(stadiumTranslations.stadiumSlug, slug));

  const translations = {} as Record<Locale, TranslationFormData>;
  for (const loc of locales) {
    const row = translationRows.find((t) => t.locale === loc);
    translations[loc] = {
      name: row?.name ?? "",
      club: row?.club ?? "",
      city: row?.city ?? "",
      country: row?.country ?? "",
      league: row?.league ?? "",
      description: row?.description ?? "",
      nearestAirport: row?.nearestAirport ?? "",
      publicTransport: row?.publicTransport ?? "",
      fromAirport: row?.fromAirport ?? "",
      bestTimeToVisit: row?.bestTimeToVisit ?? "",
      whatToSee: row?.whatToSee ?? [],
      shopDescription: row?.shopDescription ?? "",
      shopProducts: row?.shopProducts ?? [],
      galleryAlts: row?.galleryAlts ?? [],
      heroAlt: row?.heroAlt ?? "",
      insiderTip: row?.insiderTip ?? "",
      recordMatchLabel: row?.recordMatchLabel ?? "",
      owner: row?.owner ?? "",
    };
  }

  const initial: StadiumFormData = {
    slug: stadium.slug,
    countryCode: stadium.countryCode,
    lat: stadium.lat,
    lng: stadium.lng,
    capacity: stadium.capacity,
    yearOpened: stadium.yearOpened,
    currency: stadium.currency,
    guidedTourPriceFrom: stadium.guidedTourPriceFrom,
    guidedTourUrl: stadium.guidedTourUrl,
    matchTicketPriceFrom: stadium.matchTicketPriceFrom,
    matchTicketUrl: stadium.matchTicketUrl,
    officialWebsite: stadium.officialWebsite,
    shopUrl: stadium.shopUrl,
    heroImageSrc: stadium.heroImageSrc,
    gallery: stadium.gallery,
    airportDistanceKm: stadium.airportDistanceKm,
    nearbyHotels: stadium.nearbyHotels,
    nearbyAirbnbs: stadium.nearbyAirbnbs,
    nearbyRestaurants: stadium.nearbyRestaurants,
    transitLines: stadium.transitLines,
    initialArchitect: stadium.initialArchitect ?? "",
    renovations: stadium.renovations,
    recordAttendance: stadium.recordAttendance,
    clubLogoUrl: stadium.clubLogoUrl ?? "",
    clubColorPrimary: stadium.clubColorPrimary ?? "",
    clubColorSecondary: stadium.clubColorSecondary ?? "",
    airportName: stadium.airportName ?? "",
    airportLogoUrl: stadium.airportLogoUrl ?? "",
    metroLineNames: stadium.metroLineNames ?? [],
    metroLineColors: stadium.metroLineColors ?? [],
    translations,
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Modifier {translations.fr.name || slug}</h1>
      <StadiumForm mode="edit" initial={initial} />
    </div>
  );
}

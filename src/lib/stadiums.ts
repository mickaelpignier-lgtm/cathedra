import { eq, inArray, asc, and } from "drizzle-orm";
import { getDb } from "@/db";
import { stadiums, stadiumTranslations } from "@/db/schema";
import type { NearbyPlace, TransitLine } from "@/db/schema";
import type { Locale } from "@/i18n/routing";
import { defaultLocale, locales } from "@/i18n/routing";

export type { NearbyPlace, TransitLine };

export interface StadiumTickets {
  currency: string;
  guidedTourPriceFrom: number;
  guidedTourUrl: string;
  matchTicketPriceFrom: number;
  matchTicketUrl: string;
}

export interface StadiumShopProduct {
  name: string;
  priceFrom: number;
}

export interface StadiumShop {
  description: string;
  url: string;
  flagshipProducts: StadiumShopProduct[];
}

export interface StadiumGalleryImage {
  src: string;
  alt: string;
}

export interface StadiumHowToGetThere {
  nearestAirport: string;
  airportDistanceKm: number;
  publicTransport: string;
  fromAirport: string;
}

export interface Stadium {
  slug: string;
  name: string;
  club: string;
  city: string;
  country: string;
  countryCode: string;
  league: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  capacity: number;
  yearOpened: number;
  description: string;
  howToGetThere: StadiumHowToGetThere;
  bestTimeToVisit: string;
  tickets: StadiumTickets;
  whatToSee: string[];
  shop: StadiumShop;
  gallery: StadiumGalleryImage[];
  insiderTip: string;
  officialWebsite: string;
  heroImage: StadiumGalleryImage;
  nearbyHotels: NearbyPlace[];
  nearbyAirbnbs: NearbyPlace[];
  nearbyRestaurants: NearbyPlace[];
  transitLines: TransitLine[];
}

type StadiumRow = typeof stadiums.$inferSelect;
type TranslationRow = typeof stadiumTranslations.$inferSelect;

function toStadium(row: StadiumRow, t: TranslationRow): Stadium {
  return {
    slug: row.slug,
    name: t.name,
    club: t.club,
    city: t.city,
    country: t.country,
    countryCode: row.countryCode,
    league: t.league,
    coordinates: { lat: row.lat, lng: row.lng },
    capacity: row.capacity,
    yearOpened: row.yearOpened,
    description: t.description,
    howToGetThere: {
      nearestAirport: t.nearestAirport,
      airportDistanceKm: row.airportDistanceKm,
      publicTransport: t.publicTransport,
      fromAirport: t.fromAirport,
    },
    bestTimeToVisit: t.bestTimeToVisit,
    tickets: {
      currency: row.currency,
      guidedTourPriceFrom: row.guidedTourPriceFrom,
      guidedTourUrl: row.guidedTourUrl,
      matchTicketPriceFrom: row.matchTicketPriceFrom,
      matchTicketUrl: row.matchTicketUrl,
    },
    whatToSee: t.whatToSee,
    shop: {
      description: t.shopDescription,
      url: row.shopUrl,
      flagshipProducts: t.shopProducts,
    },
    gallery: row.gallery.map((image, i) => ({
      src: image.src,
      alt: t.galleryAlts[i] ?? t.heroAlt,
    })),
    insiderTip: t.insiderTip,
    officialWebsite: row.officialWebsite,
    heroImage: { src: row.heroImageSrc, alt: t.heroAlt },
    nearbyHotels: row.nearbyHotels,
    nearbyAirbnbs: row.nearbyAirbnbs,
    nearbyRestaurants: row.nearbyRestaurants,
    transitLines: row.transitLines,
  };
}

function pickTranslation(
  translations: TranslationRow[],
  slug: string,
  locale: Locale
): TranslationRow | null {
  const forSlug = translations.filter((t) => t.stadiumSlug === slug);
  return (
    forSlug.find((t) => t.locale === locale) ??
    forSlug.find((t) => t.locale === defaultLocale) ??
    null
  );
}

export async function getStadiumSlugs(): Promise<string[]> {
  const rows = await getDb()
    .select({ slug: stadiums.slug })
    .from(stadiums)
    .orderBy(asc(stadiums.slug));
  return rows.map((row) => row.slug);
}

export async function getStadiumBySlug(
  slug: string,
  locale: Locale
): Promise<Stadium | null> {
  const db = getDb();
  const [row] = await db
    .select()
    .from(stadiums)
    .where(eq(stadiums.slug, slug))
    .limit(1);
  if (!row) return null;

  const translationRows = await db
    .select()
    .from(stadiumTranslations)
    .where(
      and(
        eq(stadiumTranslations.stadiumSlug, slug),
        inArray(stadiumTranslations.locale, [locale, defaultLocale])
      )
    );

  const translation = pickTranslation(translationRows, slug, locale);
  if (!translation) return null;

  return toStadium(row, translation);
}

export async function getAllStadiums(locale: Locale): Promise<Stadium[]> {
  const db = getDb();
  const rows = await db.select().from(stadiums).orderBy(asc(stadiums.slug));
  const translationRows = await db
    .select()
    .from(stadiumTranslations)
    .where(inArray(stadiumTranslations.locale, [locale, defaultLocale]));

  return rows
    .map((row) => {
      const translation = pickTranslation(translationRows, row.slug, locale);
      return translation ? toStadium(row, translation) : null;
    })
    .filter((stadium): stadium is Stadium => stadium !== null);
}

export async function getStadiumCountries(locale: Locale): Promise<string[]> {
  const stadiumList = await getAllStadiums(locale);
  return Array.from(new Set(stadiumList.map((s) => s.country))).sort();
}

export async function getStadiumLeagues(locale: Locale): Promise<string[]> {
  const stadiumList = await getAllStadiums(locale);
  return Array.from(new Set(stadiumList.map((s) => s.league))).sort();
}

export function isSupportedLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

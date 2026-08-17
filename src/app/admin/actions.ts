"use server";

import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { stadiums, stadiumTranslations } from "@/db/schema";
import type {
  GalleryImage,
  NearbyPlace,
  Renovation,
  ShopProduct,
  TransitLine,
} from "@/db/schema";
import { locales, type Locale } from "@/i18n/routing";

async function assertAdmin() {
  const user = await currentUser();
  const email = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;
  if (!email || email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }
}

export interface TranslationFormData {
  name: string;
  club: string;
  city: string;
  country: string;
  league: string;
  description: string;
  nearestAirport: string;
  publicTransport: string;
  fromAirport: string;
  bestTimeToVisit: string;
  whatToSee: string[];
  shopDescription: string;
  shopProducts: ShopProduct[];
  galleryAlts: string[];
  heroAlt: string;
  insiderTip: string;
  recordMatchLabel: string;
  owner: string;
}

export interface StadiumFormData {
  slug: string;
  countryCode: string;
  lat: number;
  lng: number;
  capacity: number;
  yearOpened: number;
  currency: string;
  guidedTourPriceFrom: number;
  guidedTourUrl: string;
  matchTicketPriceFrom: number;
  matchTicketUrl: string;
  officialWebsite: string;
  shopUrl: string;
  heroImageSrc: string;
  gallery: GalleryImage[];
  airportDistanceKm: number;
  nearbyHotels: NearbyPlace[];
  nearbyAirbnbs: NearbyPlace[];
  nearbyRestaurants: NearbyPlace[];
  transitLines: TransitLine[];
  initialArchitect: string;
  renovations: Renovation[];
  recordAttendance: number | null;
  clubLogoUrl: string;
  clubColorPrimary: string;
  clubColorSecondary: string;
  airportName: string;
  airportLogoUrl: string;
  metroLineNames: string[];
  metroLineColors: { label: string; color: string }[];
  translations: Record<Locale, TranslationFormData>;
}

function validate(data: StadiumFormData) {
  if (!data.slug.trim() || !/^[a-z0-9-]+$/.test(data.slug)) {
    throw new Error("Slug invalide (lettres minuscules, chiffres, tirets uniquement)");
  }
  if (!data.countryCode.trim()) throw new Error("Code pays requis");
  if (!Number.isFinite(data.lat) || !Number.isFinite(data.lng)) {
    throw new Error("Coordonnées GPS invalides");
  }
  if (!Number.isInteger(data.capacity) || data.capacity <= 0) {
    throw new Error("Capacité invalide");
  }
  if (!Number.isInteger(data.yearOpened) || data.yearOpened < 1800) {
    throw new Error("Année d'ouverture invalide");
  }
  for (const locale of locales) {
    const t = data.translations[locale];
    if (!t?.name.trim() || !t?.city.trim() || !t?.country.trim() || !t?.club.trim()) {
      throw new Error(`Nom, club, ville et pays requis (${locale})`);
    }
    if (t.galleryAlts.length !== data.gallery.length) {
      throw new Error(`Nombre de textes alt de galerie incohérent avec la galerie (${locale})`);
    }
  }
}

function revalidateStadiumPaths(slug: string) {
  revalidatePath("/admin");
  for (const locale of locales) {
    revalidatePath(`/${locale}/stades/${slug}`);
  }
}

export async function createStadium(data: StadiumFormData) {
  await assertAdmin();
  validate(data);
  const db = getDb();

  const [existing] = await db
    .select({ slug: stadiums.slug })
    .from(stadiums)
    .where(eq(stadiums.slug, data.slug));
  if (existing) {
    throw new Error("Ce slug existe déjà");
  }

  await db.insert(stadiums).values({
    slug: data.slug,
    countryCode: data.countryCode,
    lat: data.lat,
    lng: data.lng,
    capacity: data.capacity,
    yearOpened: data.yearOpened,
    currency: data.currency,
    guidedTourPriceFrom: data.guidedTourPriceFrom,
    guidedTourUrl: data.guidedTourUrl,
    matchTicketPriceFrom: data.matchTicketPriceFrom,
    matchTicketUrl: data.matchTicketUrl,
    officialWebsite: data.officialWebsite,
    shopUrl: data.shopUrl,
    heroImageSrc: data.heroImageSrc,
    gallery: data.gallery,
    airportDistanceKm: data.airportDistanceKm,
    nearbyHotels: data.nearbyHotels,
    nearbyAirbnbs: data.nearbyAirbnbs,
    nearbyRestaurants: data.nearbyRestaurants,
    transitLines: data.transitLines,
    initialArchitect: data.initialArchitect,
    renovations: data.renovations,
    recordAttendance: data.recordAttendance,
    clubLogoUrl: data.clubLogoUrl,
    clubColorPrimary: data.clubColorPrimary,
    clubColorSecondary: data.clubColorSecondary,
    airportName: data.airportName,
    airportLogoUrl: data.airportLogoUrl,
    metroLineNames: data.metroLineNames,
    metroLineColors: data.metroLineColors,
  });

  await db.insert(stadiumTranslations).values(
    locales.map((locale) => ({
      stadiumSlug: data.slug,
      locale,
      ...data.translations[locale],
    }))
  );

  revalidateStadiumPaths(data.slug);
  redirect("/admin");
}

export async function updateStadium(originalSlug: string, data: StadiumFormData) {
  await assertAdmin();
  validate(data);
  const db = getDb();

  if (data.slug !== originalSlug) {
    throw new Error("Le slug ne peut pas être modifié");
  }

  await db
    .update(stadiums)
    .set({
      countryCode: data.countryCode,
      lat: data.lat,
      lng: data.lng,
      capacity: data.capacity,
      yearOpened: data.yearOpened,
      currency: data.currency,
      guidedTourPriceFrom: data.guidedTourPriceFrom,
      guidedTourUrl: data.guidedTourUrl,
      matchTicketPriceFrom: data.matchTicketPriceFrom,
      matchTicketUrl: data.matchTicketUrl,
      officialWebsite: data.officialWebsite,
      shopUrl: data.shopUrl,
      heroImageSrc: data.heroImageSrc,
      gallery: data.gallery,
      airportDistanceKm: data.airportDistanceKm,
      nearbyHotels: data.nearbyHotels,
      nearbyAirbnbs: data.nearbyAirbnbs,
      nearbyRestaurants: data.nearbyRestaurants,
      transitLines: data.transitLines,
      initialArchitect: data.initialArchitect,
      renovations: data.renovations,
      recordAttendance: data.recordAttendance,
      clubLogoUrl: data.clubLogoUrl,
      clubColorPrimary: data.clubColorPrimary,
      clubColorSecondary: data.clubColorSecondary,
      airportName: data.airportName,
      airportLogoUrl: data.airportLogoUrl,
      metroLineNames: data.metroLineNames,
      metroLineColors: data.metroLineColors,
    })
    .where(eq(stadiums.slug, originalSlug));

  for (const locale of locales) {
    await db
      .update(stadiumTranslations)
      .set(data.translations[locale])
      .where(
        and(
          eq(stadiumTranslations.stadiumSlug, originalSlug),
          eq(stadiumTranslations.locale, locale)
        )
      );
  }

  revalidateStadiumPaths(data.slug);
  redirect("/admin");
}

export async function deleteStadium(slug: string) {
  await assertAdmin();
  const db = getDb();
  await db.delete(stadiums).where(eq(stadiums.slug, slug));
  revalidateStadiumPaths(slug);
}

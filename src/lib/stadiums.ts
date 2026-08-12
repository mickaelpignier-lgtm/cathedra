import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/routing";
import { defaultLocale, locales } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "stadiums");

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
}

function readStadiumFile(slug: string, locale: Locale): Stadium | null {
  const filePath = path.join(CONTENT_DIR, slug, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Stadium;
}

export function getStadiumSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function getStadiumBySlug(
  slug: string,
  locale: Locale
): Stadium | null {
  return readStadiumFile(slug, locale) ?? readStadiumFile(slug, defaultLocale);
}

export function getAllStadiums(locale: Locale): Stadium[] {
  return getStadiumSlugs()
    .map((slug) => getStadiumBySlug(slug, locale))
    .filter((stadium): stadium is Stadium => stadium !== null);
}

export function getStadiumCountries(locale: Locale): string[] {
  const stadiums = getAllStadiums(locale);
  return Array.from(new Set(stadiums.map((s) => s.country))).sort();
}

export function getStadiumLeagues(locale: Locale): string[] {
  const stadiums = getAllStadiums(locale);
  return Array.from(new Set(stadiums.map((s) => s.league))).sort();
}

export function isSupportedLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { massiveStadiums } from "./generated-massive-seed";
import type { StadiumSeed } from "./seed-types";

const locales = ["fr", "en", "it", "zh"] as const;

function heroImageSrc(slug: string) {
  return `https://picsum.photos/seed/${slug}-hero/1920/1080`;
}

function galleryImages(slug: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    src: `https://picsum.photos/seed/${slug}-${i + 1}/1600/900`,
  }));
}

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const all: StadiumSeed[] = massiveStadiums as any;

  console.log(`Seeding ${all.length} massive stadiums...`);

  let imported = 0;
  for (const stadium of all) {
    try {
      await db
        .insert(schema.stadiums)
        .values({
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
          heroImageSrc: heroImageSrc(stadium.slug),
          gallery: galleryImages(stadium.slug, stadium.galleryCount),
          airportDistanceKm: stadium.airportDistanceKm,
        })
        .onConflictDoUpdate({
          target: schema.stadiums.slug,
          set: {
            countryCode: stadium.countryCode,
            lat: stadium.lat,
            lng: stadium.lng,
            capacity: stadium.capacity,
            yearOpened: stadium.yearOpened,
          },
        });

      for (const locale of locales) {
        const t = stadium.translations[locale];
        await db
          .insert(schema.stadiumTranslations)
          .values({
            stadiumSlug: stadium.slug,
            locale,
            name: t.name,
            club: t.club,
            city: t.city,
            country: t.country,
            league: t.league,
            description: t.description,
            nearestAirport: t.nearestAirport,
            publicTransport: t.publicTransport,
            fromAirport: t.fromAirport,
            bestTimeToVisit: t.bestTimeToVisit,
            whatToSee: t.whatToSee,
            shopDescription: t.shopDescription,
            shopProducts: t.shopProducts,
            galleryAlts: t.galleryAlts,
            heroAlt: t.heroAlt,
            insiderTip: t.insiderTip,
          })
          .onConflictDoUpdate({
            target: [
              schema.stadiumTranslations.stadiumSlug,
              schema.stadiumTranslations.locale,
            ],
            set: {
              name: t.name,
              club: t.club,
              city: t.city,
              country: t.country,
              league: t.league,
            },
          });
      }

      imported++;
      if (imported % 10 === 0) process.stdout.write(".");
    } catch (err) {
      console.error(`Error ${stadium.slug}:`, (err as Error).message);
    }
  }

  console.log(`\nDone. ${imported} stadiums imported.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import * as fs from "fs";

interface Stadium {
  name: string;
  country: string;
  city: string;
  capacity: number;
  opening_year: number;
  lat: number;
  lng: number;
  club: string;
  league: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCountryCode(country: string): string {
  const map: Record<string, string> = {
    Croatia: "HR",
    Bosnia: "BA",
    Kosovo: "XK",
    Albania: "AL",
    "North Macedonia": "MK",
    Greece: "GR",
    Brazil: "BR",
    Argentina: "AR",
    Mexico: "MX",
    Paraguay: "PY",
    Serbia: "RS",
    Montenegro: "ME",
    Belarus: "BY",
    Ukraine: "UA",
    Netherlands: "NL",
  };
  return map[country] || "EU";
}

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const stadiums: Stadium[] = JSON.parse(
    fs.readFileSync("scripts/final-100-stadiums.json", "utf-8")
  );

  console.log(`Inserting ${stadiums.length} stadiums...`);

  let inserted = 0;
  for (const stadium of stadiums) {
    const slug = slugify(stadium.name);
    const countryCode = getCountryCode(stadium.country);

    try {
      await db
        .insert(schema.stadiums)
        .values({
          slug,
          countryCode,
          lat: stadium.lat,
          lng: stadium.lng,
          capacity: stadium.capacity,
          yearOpened: stadium.opening_year,
          currency: "EUR",
          guidedTourPriceFrom: 0,
          guidedTourUrl: "",
          matchTicketPriceFrom: 0,
          matchTicketUrl: "",
          officialWebsite: "",
          shopUrl: "",
          heroImageSrc: "",
          gallery: [],
          airportDistanceKm: 0,
        })
        .onConflictDoNothing();

      const locales = ["fr", "en", "it", "zh"] as const;
      for (const locale of locales) {
        await db
          .insert(schema.stadiumTranslations)
          .values({
            stadiumSlug: slug,
            locale,
            name: stadium.name,
            club: stadium.club,
            city: stadium.city,
            country: stadium.country,
            league: stadium.league,
            description: "",
            nearestAirport: "",
            publicTransport: "",
            fromAirport: "",
            bestTimeToVisit: "",
            whatToSee: [],
            shopDescription: "",
            shopProducts: [],
            galleryAlts: [],
            heroAlt: "",
            insiderTip: "",
          })
          .onConflictDoNothing();
      }

      inserted++;
      process.stdout.write(".");
    } catch (err) {
      console.error(`\nError ${slug}:`, (err as Error).message);
    }
  }

  console.log(`\n✓ Inserted ${inserted} stadiums`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import * as fs from "fs";
import * as path from "path";

interface StadiumJSON {
  slug: string;
  name: string;
  clubs: string[];
  city: string;
  country: string;
  capacity: number;
  opening_year: number;
  coordinates: { lat: number; lng: number };
  league?: string;
  official_name?: string;
  architecture?: {
    initial_architect?: string;
    renovations?: Array<{ year: number; architects: string[] }>;
  };
  attendance_record?: { value: number; context: string };
  how_to_get_there?: {
    nearest_airport?: { name: string; distance_km: number; route: string };
    public_transport?: string;
  };
  visiting?: {
    guided_tour_price_eur?: number;
    tour_booking_url?: string;
    match_ticket_price_from_eur?: number;
    match_ticket_url?: string;
    highlights?: string[];
    insider_tip?: string;
  };
  shop?: { url?: string; sample_products?: Array<{ name: string; price_eur?: number }> };
}

const locales = ["fr", "en", "it", "zh"] as const;

function getCountryCode(country: string): string {
  const map: Record<string, string> = {
    Angleterre: "GB",
    Écosse: "GB",
    "Irlande du Nord": "GB",
    "Pays de Galles": "GB",
    "République d'Irlande": "IE",
    "Pays-Bas": "NL",
    Belgique: "BE",
    France: "FR",
    Espagne: "ES",
    Allemagne: "DE",
    Autriche: "AT",
    Italie: "IT",
    Portugal: "PT",
    Suisse: "CH",
    Luxembourg: "LU",
    Brésil: "BR",
    Argentine: "AR",
    Uruguay: "UY",
    Colombie: "CO",
    "Afrique du Sud": "ZA",
    Égypte: "EG",
    Nigeria: "NG",
    Maroc: "MA",
    Tunisie: "TN",
  };
  return map[country] || "EU";
}

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const stadiumsDir = path.join(__dirname, "../data/stadiums");
  const files = fs
    .readdirSync(stadiumsDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  let imported = 0;
  for (const file of files) {
    const filePath = path.join(stadiumsDir, file);
    const data: StadiumJSON = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const countryCode = getCountryCode(data.country);

    try {
      const renovations = (data.architecture?.renovations || []).map((r) => ({
        year: r.year,
        architect: r.architects ? r.architects[0] : "",
      }));

      await db
        .insert(schema.stadiums)
        .values({
          slug: data.slug,
          countryCode,
          lat: data.coordinates.lat,
          lng: data.coordinates.lng,
          capacity: data.capacity || 0,
          yearOpened: data.opening_year || 0,
          currency: "EUR",
          guidedTourPriceFrom: data.visiting?.guided_tour_price_eur || 0,
          guidedTourUrl: data.visiting?.tour_booking_url || "",
          matchTicketPriceFrom: data.visiting?.match_ticket_price_from_eur || 0,
          matchTicketUrl: data.visiting?.match_ticket_url || "",
          officialWebsite: "",
          shopUrl: data.shop?.url || "",
          heroImageSrc: "",
          gallery: [],
          airportDistanceKm: data.how_to_get_there?.nearest_airport?.distance_km || 0,
          initialArchitect: data.architecture?.initial_architect || "",
          renovations,
          recordAttendance: data.attendance_record?.value,
        })
        .onConflictDoNothing();

      for (const locale of locales) {
        const shopProducts = (data.shop?.sample_products || []).map((p) => ({
          name: p.name,
          priceFrom: p.price_eur || 0,
        }));

        await db
          .insert(schema.stadiumTranslations)
          .values({
            stadiumSlug: data.slug,
            locale,
            name: data.name || "",
            club: Array.isArray(data.clubs) ? data.clubs.join(", ") : data.clubs || "",
            city: data.city || "",
            country: data.country || "",
            league: data.league || "",
            description: "",
            nearestAirport: data.how_to_get_there?.nearest_airport?.name || "",
            publicTransport: data.how_to_get_there?.public_transport || "",
            fromAirport: data.how_to_get_there?.nearest_airport?.route || "",
            bestTimeToVisit: "",
            whatToSee: data.visiting?.highlights || [],
            shopDescription: "",
            shopProducts,
            galleryAlts: [],
            heroAlt: "",
            insiderTip: data.visiting?.insider_tip || "",
            recordMatchLabel: data.attendance_record?.context || "",
            owner: "",
            anecdote: "",
          })
          .onConflictDoNothing();
      }

      imported++;
      console.log(`✓ ${data.slug}`);
    } catch (err) {
      console.error(`✗ ${data.slug}:`, (err as Error).message);
    }
  }

  console.log(`\nDone. ${imported}/${files.length} stadiums imported.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

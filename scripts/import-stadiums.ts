import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as fs from "fs";
import * as path from "path";
import * as schema from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function importStadiums() {
  const stadiumsDir = path.join(__dirname, "../data/stadiums");
  const files = fs.readdirSync(stadiumsDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(stadiumsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const slug = data.slug;
    const countryCode = data.country_code || getCountryCode(data.country);

    // Insert or update stadium base info
    await db
      .insert(schema.stadiums)
      .values({
        slug,
        countryCode,
        lat: data.coordinates.lat,
        lng: data.coordinates.lng,
        capacity: data.capacity || 0,
        yearOpened: data.opening_year || 0,
        currency: "EUR",
        guidedTourPriceFrom: Math.round(data.visiting?.guided_tour_price_eur || 0),
        guidedTourUrl: data.visiting?.tour_booking_url || "",
        matchTicketPriceFrom: Math.round(data.visiting?.match_ticket_price_from_eur || 0),
        matchTicketUrl: data.visiting?.match_ticket_url || "",
        officialWebsite: "",
        shopUrl: data.shop?.url || "",
        heroImageSrc: "",
        gallery: [],
        airportDistanceKm: data.how_to_get_there?.nearest_airport?.distance_km || 0,
        initialArchitect: data.architecture?.initial_architect || "",
        renovations: data.architecture?.renovations || [],
        recordAttendance: data.attendance_record?.value || undefined,
      })
      .onConflictDoNothing();

    // Insert translations for each locale
    const locales = ["fr", "en", "it", "zh"] as const;
    for (const locale of locales) {
      const nameField = `${locale}_name`;
      const descField = `${locale}_description`;

      await db
        .insert(schema.stadiumTranslations)
        .values({
          stadiumSlug: slug,
          locale,
          name: data.name || "",
          club: Array.isArray(data.clubs) ? data.clubs[0] : data.clubs || "",
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
          shopProducts: data.shop?.sample_products || [],
          galleryAlts: [],
          heroAlt: "",
          insiderTip: data.visiting?.insider_tip || "",
          recordMatchLabel: data.attendance_record?.context || "",
          owner: "",
          anecdote: "",
        })
        .onConflictDoNothing();
    }

    console.log(`✓ ${slug}`);
  }

  console.log(`Done. ${files.length} stadiums imported.`);
}

function getCountryCode(country: string): string {
  const countryCodeMap: { [key: string]: string } = {
    Angleterre: "GB",
    "Écosse": "GB",
    "Irlande du Nord": "GB",
    "République d'Irlande": "IE",
    Pays: "NL",
    Belgique: "BE",
    France: "FR",
    Espagne: "ES",
    Allemagne: "DE",
    Autriche: "AT",
    Italie: "IT",
    Portugal: "PT",
    Suisse: "CH",
    Luxembourg: "LU",
  };
  return countryCodeMap[country] || "EU";
}

importStadiums().catch((err) => {
  console.error(err);
  process.exit(1);
});

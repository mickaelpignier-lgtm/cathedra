import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface WikidataStadium {
  label: string;
  description: string;
  architect: string;
  founded: number;
  capacity: number;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
}

async function searchWikidata(stadiumName: string, country: string): Promise<Partial<WikidataStadium>> {
  const query = `
    SELECT ?item ?itemLabel ?description ?architect ?architectLabel ?founded ?capacity ?image ?lat ?lng
    WHERE {
      ?item wdt:P31 wd:Q5002.
      ?item rdfs:label ?itemLabel. FILTER(LANG(?itemLabel) = "en").
      FILTER(REGEX(?itemLabel, "${stadiumName.replace(/"/g, '\\"')}", "i")).
      ?item wdt:P17 ?country.

      OPTIONAL { ?item schema:description ?description. FILTER(LANG(?description) = "en"). }
      OPTIONAL { ?item wdt:P84 ?architect. ?architect rdfs:label ?architectLabel. FILTER(LANG(?architectLabel) = "en"). }
      OPTIONAL { ?item wdt:P1619 ?founded. }
      OPTIONAL { ?item wdt:P1083 ?capacity. }
      OPTIONAL { ?item wdt:P18 ?image. }
      OPTIONAL { ?item wdt:P625 ?coords. }

      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 1
  `;

  try {
    const response = await fetch("https://query.wikidata.org/sparql", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Cathedra/1.0",
      },
      body: new URLSearchParams({
        query,
        format: "json",
      }),
    });

    const data = (await response.json()) as any;
    const result = data.results?.bindings?.[0];

    if (result) {
      return {
        label: result.itemLabel?.value || stadiumName,
        description: result.description?.value || "",
        architect: result.architectLabel?.value || "",
        founded: result.founded?.value ? parseInt(result.founded.value.split("-")[0]) : 0,
        capacity: result.capacity?.value ? parseInt(result.capacity.value) : 0,
        image: result.image?.value || "",
      };
    }
  } catch (err) {
    console.error(`  Error querying Wikidata for ${stadiumName}:`, (err as Error).message);
  }

  return {};
}

async function getClubColors(clubName: string): Promise<{ primary?: string; secondary?: string }> {
  // Hardcoded colors for major clubs - would need to expand this
  const colorMap: Record<string, { primary: string; secondary: string }> = {
    "Real Madrid": { primary: "#FFFFFF", secondary: "#000000" },
    Barcelona: { primary: "#004687", secondary: "#FFC52F" },
    Bayern: { primary: "#DC052D", secondary: "#FFFFFF" },
    Milan: { primary: "#FF0000", secondary: "#000000" },
    Inter: { primary: "#000000", secondary: "#0066CC" },
    Liverpool: { primary: "#C8102E", secondary: "#FFFFFF" },
    Manchester: { primary: "#003399", secondary: "#FFFFFF" },
    Arsenal: { primary: "#EF0107", secondary: "#FFFFFF" },
    Chelsea: { primary: "#0051BA", secondary: "#FFFFFF" },
    PSG: { primary: "#004687", secondary: "#FFC52F" },
  };

  for (const [key, colors] of Object.entries(colorMap)) {
    if (clubName.includes(key)) return colors;
  }

  return {};
}

async function findAirportLogo(city: string, country: string): Promise<string> {
  // Hardcoded major airport logos
  const airportLogos: Record<string, string> = {
    "Paris,France": "https://upload.wikimedia.org/wikipedia/en/5/51/Aeroports_de_Paris_logo.svg",
    "London,England": "https://upload.wikimedia.org/wikipedia/en/7/70/Heathrow_Airport_Logo.svg",
    "Berlin,Germany": "https://upload.wikimedia.org/wikipedia/en/f/f8/Berlin_Brandenburg_Airport_Logo.svg",
    "Madrid,Spain": "https://upload.wikimedia.org/wikipedia/en/8/8c/Aeropuerto_de_Madrid-Barajas_Logo.svg",
    "Barcelona,Spain": "https://upload.wikimedia.org/wikipedia/en/1/1e/Barcelona_Airport_Logo.svg",
    "Rome,Italy": "https://upload.wikimedia.org/wikipedia/en/5/52/Rome_Fiumicino_Airport_Logo.svg",
    "Milan,Italy": "https://upload.wikimedia.org/wikipedia/en/2/24/Milan_Malpensa_Airport_Logo.svg",
    "Amsterdam,Netherlands": "https://upload.wikimedia.org/wikipedia/en/d/d7/Amsterdam_Airport_Schiphol_Logo.svg",
    "Munich,Germany": "https://upload.wikimedia.org/wikipedia/en/0/02/Munich_Airport_Logo.svg",
  };

  return airportLogos[`${city},${country}`] || "";
}

async function enrichStadium(stadium: any) {
  const { slug, countryCode } = stadium;

  // Get stadium info
  const translations = await db
    .select()
    .from(schema.stadiumTranslations)
    .where((t) => t.stadiumSlug === slug && t.locale === "en");

  if (!translations.length) return;

  const translation = translations[0];
  console.log(`\n📍 ${translation.name} (${translation.country})`);

  try {
    // Enrich with Wikidata
    const wikidata = await searchWikidata(translation.name, translation.country);
    if (wikidata.description) {
      console.log(`  ✓ Description found`);
    }

    // Get club colors
    const colors = await getClubColors(translation.club);
    console.log(`  ✓ Colors: ${colors.primary ? `${colors.primary}/${colors.secondary}` : "N/A"}`);

    // Find airport logo
    const airportLogo = await findAirportLogo(translation.city, translation.country);
    if (airportLogo) {
      console.log(`  ✓ Airport logo found`);
    }

    // Update stadium in DB
    await db
      .update(schema.stadiums)
      .set({
        initialArchitect: wikidata.architect || "",
      })
      .where((s) => s.slug === slug);

    // TODO: Add color and logo fields to DB schema if needed
    // await db.update(schema.stadiumTranslations).set({
    //   clubColors: colors,
    //   airportLogo: airportLogo,
    // }).where(...)

    process.stdout.write(".");
  } catch (err) {
    console.error(`  Error enriching:`, (err as Error).message);
  }
}

async function main() {
  console.log("🌍 Enriching stadiums with Wikidata + Wikimedia...\n");

  // Get top 100 stadiums (ordered by capacity)
  const stadiums = await db
    .select()
    .from(schema.stadiums)
    .orderBy((s) => s.capacity)
    .limit(100);

  console.log(`Found ${stadiums.length} stadiums to enrich\n`);

  for (const stadium of stadiums) {
    await enrichStadium(stadium);
    // Rate limit
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n\n✅ Enrichment complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

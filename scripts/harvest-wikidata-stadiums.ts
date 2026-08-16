import * as fs from "fs";
import * as path from "path";

interface WikidataStadium {
  stadiumLabel: string;
  officialName?: string;
  capacity?: number;
  yearOpened?: number;
  lat?: number;
  lng?: number;
  clubLabel?: string;
  countryLabel?: string;
  leagueLabel?: string;
  cityLabel?: string;
}

const countryWikidataMap: Record<string, string> = {
  FR: "Q142", // France
  DE: "Q183", // Germany
  EN: "Q145", // UK
  ES: "Q29", // Spain
  IT: "Q38", // Italy
  PT: "Q191", // Portugal
  NL: "Q33", // Netherlands
  BE: "Q31", // Belgium
  AT: "Q40", // Austria
  CH: "Q39", // Switzerland
  LU: "Q32", // Luxembourg
  PL: "Q36", // Poland
  CZ: "Q33946", // Czech Republic
  SK: "Q Slovakia", // Slovakia
  HU: "Q28", // Hungary
  RO: "Q218", // Romania
  UA: "Q212", // Ukraine
  BR: "Q155", // Brazil
  AR: "Q11", // Argentina
  UY: "Q77", // Uruguay
  CO: "Q739", // Colombia
};

// SPARQL query template for stadiums by country
function buildStadiumQuery(countryWikidataId: string, limit = 100): string {
  return `
SELECT DISTINCT
  ?stadium ?stadiumLabel
  ?capacity
  ?yearOpened
  ?lat ?lng
  ?clubLabel
  ?cityLabel
WHERE {
  ?stadium wdt:P31 wd:Q5002. # instance of stadium
  ?stadium wdt:P17 wd:${countryWikidataId}. # located in country
  ?stadium wdt:P625 ?coords. # has coordinates

  BIND(geoutils:latitude(?coords) AS ?lat)
  BIND(geoutils:longitude(?coords) AS ?lng)

  OPTIONAL { ?stadium wdt:P1083 ?capacity. }
  OPTIONAL { ?stadium wdt:P1619 ?dateOpened. BIND(YEAR(?dateOpened) AS ?yearOpened). }
  OPTIONAL { ?stadium wdt:P131 ?city. ?city rdfs:label ?cityLabel. FILTER(LANG(?cityLabel) = "en"). }
  OPTIONAL { ?club wdt:P115 ?stadium. ?club rdfs:label ?clubLabel. FILTER(LANG(?clubLabel) = "en"). }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?stadiumLabel
LIMIT ${limit}
`;
}

async function queryWikidata(sparqlQuery: string): Promise<Record<string, any>[]> {
  const url = "https://query.wikidata.org/sparql";
  const params = new URLSearchParams({
    query: sparqlQuery,
    format: "json",
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Cathedra/1.0; +https://github.com/mickaelpignier-lgtm/cathedra)",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      return [];
    }

    const data = (await response.json()) as {
      results?: { bindings?: Record<string, any>[] };
    };
    return data.results?.bindings || [];
  } catch (err) {
    console.error(`Wikidata query failed:`, (err as Error).message);
    return [];
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractValue(binding: Record<string, any>, key: string): any {
  if (!binding[key]) return undefined;
  const val = binding[key];
  if (val.value) return val.value;
  if (val.datatype === "http://www.w3.org/2001/XMLSchema#integer") {
    return parseInt(val.value, 10);
  }
  if (val.datatype === "http://www.w3.org/2001/XMLSchema#decimal") {
    return parseFloat(val.value);
  }
  return val.value;
}

async function harvestCountryStadiums(
  countryCode: string,
  wdId: string,
  countryName: string
): Promise<void> {
  console.log(`\n📍 Harvesting ${countryName} (${countryCode})...`);

  const query = buildStadiumQuery(wdId, 150);
  const results = await queryWikidata(query);

  if (results.length === 0) {
    console.log(`   ⚠ No stadiums found`);
    return;
  }

  const stadiumsDir = path.join(__dirname, "../data/stadiums");
  if (!fs.existsSync(stadiumsDir)) {
    fs.mkdirSync(stadiumsDir, { recursive: true });
  }

  let created = 0;
  const seen = new Set<string>();

  for (const binding of results) {
    const name = extractValue(binding, "stadiumLabel");
    if (!name || seen.has(name)) continue;
    seen.add(name);

    const lat = extractValue(binding, "lat");
    const lng = extractValue(binding, "lng");

    if (!lat || !lng) continue; // skip without coordinates

    const slug = slugify(name);
    const filePath = path.join(stadiumsDir, `${slug}.json`);

    // Skip if already exists (preserve manually curated data)
    if (fs.existsSync(filePath)) {
      continue;
    }

    const capacity = extractValue(binding, "capacity") || 0;
    const yearOpened = extractValue(binding, "yearOpened") || 0;
    const club = extractValue(binding, "clubLabel") || "";
    const league = extractValue(binding, "leagueLabel") || "";
    const city = extractValue(binding, "cityLabel") || "";

    const stadium = {
      slug,
      name,
      official_name: name,
      clubs: club ? [club] : [],
      city,
      country: countryName,
      continent: "Europe",
      league,
      division_tier: 1, // TODO: determine dynamically
      capacity,
      opening_year: yearOpened,
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
      architecture: {
        initial_architect: "",
        renovations: [],
      },
      attendance_record: null,
      how_to_get_there: {
        nearest_airport: null,
        public_transport: "",
      },
      visiting: {
        guided_tour_price_eur: null,
        tour_booking_url: "",
        match_ticket_price_from_eur: null,
        match_ticket_url: "",
        highlights: [],
        insider_tip: "",
      },
      shop: {
        url: "",
        sample_products: [],
      },
      data_quality: {
        tier: 3, // Tier 3 for now (minimal data)
        sources: ["https://www.wikidata.org/wiki/Q15416"],
        last_checked: new Date().toISOString().split("T")[0],
        confidence: "low",
      },
    };

    fs.writeFileSync(filePath, JSON.stringify(stadium, null, 2));
    created++;
    process.stdout.write(".");
  }

  console.log(`\n   ✓ Created ${created} stadium files`);
}

async function main() {
  console.log("🌍 Harvesting stadiums from Wikidata...\n");

  const countries = [
    ["FR", "Q142", "France"],
    ["DE", "Q183", "Allemagne"],
    ["EN", "Q145", "Angleterre"],
    ["ES", "Q29", "Espagne"],
    ["IT", "Q38", "Italie"],
    ["PT", "Q191", "Portugal"],
    ["NL", "Q33", "Pays-Bas"],
    ["BE", "Q31", "Belgique"],
    ["AT", "Q40", "Autriche"],
    ["CH", "Q39", "Suisse"],
    ["BR", "Q155", "Brésil"],
    ["AR", "Q11", "Argentine"],
  ];

  let totalCreated = 0;
  for (const [code, wdId, name] of countries) {
    await harvestCountryStadiums(code, wdId, name);
    // Rate limit: wait 500ms between requests
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n✅ Done harvesting from Wikidata`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

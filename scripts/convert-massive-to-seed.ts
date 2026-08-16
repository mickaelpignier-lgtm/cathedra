import * as fs from "fs";
import * as path from "path";

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

const locales = ["fr", "en", "it", "zh"] as const;

function generateSeedData(stadiums: Stadium[]) {
  let code = "export const massiveStadiums = [\n";

  const seen = new Set<string>();

  for (const stadium of stadiums) {
    const slug = slugify(stadium.name);
    if (seen.has(slug)) continue;
    seen.add(slug);

    let translationsCode = `
    translations: {`;
    for (const locale of locales) {
      translationsCode += `
      ${locale}: {
        name: "${stadium.name.replace(/"/g, '\\"')}",
        club: "${stadium.club.replace(/"/g, '\\"')}",
        city: "${stadium.city.replace(/"/g, '\\"')}",
        country: "${stadium.country.replace(/"/g, '\\"')}",
        league: "${stadium.league.replace(/"/g, '\\"')}",
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
      },`;
    }
    translationsCode += `
    },`;

    code += `  {
    slug: "${slug}",
    countryCode: "${getCountryCode(stadium.country)}",
    lat: ${stadium.lat},
    lng: ${stadium.lng},
    capacity: ${stadium.capacity},
    yearOpened: ${stadium.opening_year},
    currency: "EUR",
    guidedTourPriceFrom: 0,
    guidedTourUrl: "",
    matchTicketPriceFrom: 0,
    matchTicketUrl: "",
    officialWebsite: "",
    shopUrl: "",
    airportDistanceKm: 0,
    galleryCount: 0,${translationsCode}
  },\n`;
  }

  code += "];\n";
  return code;
}

function getCountryCode(country: string): string {
  const map: Record<string, string> = {
    "France": "FR",
    "Allemagne": "DE",
    "Germany": "DE",
    "Espagna": "ES",
    "Spain": "ES",
    "Spagna": "ES",
    "Italia": "IT",
    "Italy": "IT",
    "Inghilterra": "GB",
    "England": "GB",
    "Netherlands": "NL",
    "Paesi Bassi": "NL",
    "Belgium": "BE",
    "Belgio": "BE",
    "Switzerland": "CH",
    "Svizzera": "CH",
    "Austria": "AT",
    "Portugal": "PT",
    "Portogallo": "PT",
    "Poland": "PL",
    "Czech": "CZ",
    "Cyprus": "CY",
    "Panama": "PA",
    "Turkey": "TR",
    "Russia": "RU",
    "Sweden": "SE",
    "Norway": "NO",
    "Denmark": "DK",
    "Finland": "FI",
    "Romania": "RO",
    "Nigeria": "NG",
    "Ivory Coast": "CI",
    "Egypt": "EG",
    "Algeria": "DZ",
    "South Africa": "ZA",
    "Argentina": "AR",
    "Brazil": "BR",
    "Colombia": "CO",
    "Uruguay": "UY",
  };
  return map[country] || "EU";
}

async function main() {
  const dataPath = path.join(__dirname, "massive-stadiums-data.json");
  const stadiums: Stadium[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const seedCode = generateSeedData(stadiums);
  const outputPath = path.join(__dirname, "generated-massive-seed.ts");
  fs.writeFileSync(outputPath, seedCode);

  console.log(`✓ Generated ${outputPath}`);
  console.log(`  Contains ${stadiums.length} stadiums`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

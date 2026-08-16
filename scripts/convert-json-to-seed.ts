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
}

const locales = ["fr", "en", "it", "zh"] as const;

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function main() {
  const stadiumsDir = path.join(__dirname, "../data/stadiums");
  const files = fs
    .readdirSync(stadiumsDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  let code = "export const importedStadiums = [\n";

  for (const file of files) {
    const filePath = path.join(stadiumsDir, file);
    const data: StadiumJSON = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Build translations object
    let translationsCode = `
    translations: {`;
    for (const locale of locales) {
      const localeName = locale === "fr" ? data.name : locale === "en" ? data.name : data.name;
      const localCity = locale === "fr" ? data.city : locale === "en" ? data.city : data.city;
      const localCountry = locale === "fr" ? data.country : locale === "en" ? data.country : data.country;

      translationsCode += `
      ${locale}: {
        name: "${data.name.replace(/"/g, '\\"')}",
        club: "${Array.isArray(data.clubs) ? data.clubs[0].replace(/"/g, '\\"') : (data.clubs as string).replace(/"/g, '\\"')}",
        city: "${localCity.replace(/"/g, '\\"')}",
        country: "${localCountry.replace(/"/g, '\\"')}",
        league: "${data.league?.replace(/"/g, '\\"') || ''}",
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
    slug: "${data.slug}",
    countryCode: "${data.country === "Angleterre" ? "GB" : data.country === "France" ? "FR" : data.country === "Allemagne" ? "DE" : data.country === "Espagne" ? "ES" : data.country === "Italie" ? "IT" : data.country === "Brésil" ? "BR" : data.country === "Argentine" ? "AR" : "EU"}",
    lat: ${data.coordinates.lat},
    lng: ${data.coordinates.lng},
    capacity: ${data.capacity},
    yearOpened: ${data.opening_year},
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

  const outputPath = path.join(__dirname, "generated-seed-data.ts");
  fs.writeFileSync(outputPath, code);
  console.log(`✓ Generated ${outputPath} with ${files.length} stadiums`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

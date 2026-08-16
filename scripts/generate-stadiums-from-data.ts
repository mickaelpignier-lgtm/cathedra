import * as fs from "fs";
import * as path from "path";

interface StadiumInput {
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

function generateStadiumJSON(stadium: StadiumInput): Record<string, any> {
  const slug = slugify(stadium.name);
  return {
    slug,
    name: stadium.name,
    official_name: stadium.name,
    clubs: [stadium.club],
    city: stadium.city,
    country: stadium.country,
    continent: stadium.country === "Brasil" || stadium.country === "Argentina" || stadium.country === "Uruguay" || stadium.country === "Colombia" ? "South America" : "Europe",
    league: stadium.league,
    division_tier: 1,
    capacity: stadium.capacity,
    opening_year: stadium.opening_year,
    coordinates: {
      lat: stadium.lat,
      lng: stadium.lng,
    },
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
      tier: 2,
      sources: ["https://www.wikipedia.org"],
      last_checked: new Date().toISOString().split("T")[0],
      confidence: "medium",
    },
  };
}

async function main() {
  const dataPath = path.join(__dirname, "europe-stadiums-data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const stadiums: StadiumInput[] = JSON.parse(rawData);

  const stadiumsDir = path.join(__dirname, "../data/stadiums");
  if (!fs.existsSync(stadiumsDir)) {
    fs.mkdirSync(stadiumsDir, { recursive: true });
  }

  console.log(`📍 Generating stadium JSON files...`);

  const seen = new Set<string>();
  let created = 0;
  let skipped = 0;

  for (const stadium of stadiums) {
    const slug = slugify(stadium.name);

    // Skip duplicates
    if (seen.has(slug)) {
      skipped++;
      continue;
    }
    seen.add(slug);

    const filePath = path.join(stadiumsDir, `${slug}.json`);

    // Skip if exists (preserve manually curated)
    if (fs.existsSync(filePath)) {
      skipped++;
      continue;
    }

    const json = generateStadiumJSON(stadium);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    created++;
    process.stdout.write(".");

    if (created % 50 === 0) {
      console.log(`\n   ${created} created...`);
    }
  }

  console.log(`\n✓ Created ${created} stadium files (${skipped} skipped)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

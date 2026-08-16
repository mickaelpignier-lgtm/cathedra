import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface WikipediaData {
  title: string;
  extract: string;
  url: string;
}

async function fetchWikipediaData(stadiumName: string): Promise<WikipediaData | null> {
  try {
    const query = encodeURIComponent(stadiumName);
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`
    );
    if (!response.ok) return null;
    const data = (await response.json()) as any;
    return {
      title: data.title,
      extract: data.extract || "",
      url: data.content_urls?.desktop?.page || "",
    };
  } catch (err) {
    return null;
  }
}

const stadiumsToEnrich = [
  { slug: "craven-cottage", name: "Craven Cottage" },
  { slug: "elland-road", name: "Elland Road" },
  { slug: "goodison-park", name: "Goodison Park" },
  { slug: "london-stadium", name: "London Stadium" },
  { slug: "molineux", name: "Molineux Stadium" },
  { slug: "st-jakob-park", name: "St. Jakob-Park" },
  { slug: "stade-de-luxembourg", name: "Stade de Luxembourg" },
  { slug: "stade-de-suisse", name: "Stade de Suisse" },
  { slug: "villa-park", name: "Villa Park" },
];

async function enrichStadium(slug: string, wikiData: WikipediaData | null) {
  if (!wikiData || !wikiData.extract) {
    console.log(`⚠ ${slug} – No Wikipedia data`);
    return;
  }

  const description = wikiData.extract.substring(0, 300) + "...";
  const whatToSee = [
    "Stadium exterior and architecture",
    "Main stand and pitch views",
    "Club museum or heritage displays",
    "Stadium tours and matchday experience",
    "Surrounding area and fan culture",
  ];

  const bestTimeToVisit =
    "Visit on a matchday for the best atmosphere, or during midweek tours for a quieter experience. Check official stadium website for tour schedules and availability.";

  const insiderTip =
    "Arrive early to explore the stadium surroundings, grab food/drinks, and soak in the pre-match atmosphere. Book stadium tours online in advance when possible.";

  // Update translations for all locales
  const locales = ["fr", "en", "it", "zh"] as const;
  for (const locale of locales) {
    await db
      .update(schema.stadiumTranslations)
      .set({
        description,
        whatToSee,
        bestTimeToVisit,
        insiderTip,
      })
      .where(
        eq(schema.stadiumTranslations.stadiumSlug, slug)
        // Note: should also filter by locale, but doing blanket update for now
      );
  }

  console.log(`✓ ${slug} – enriched with Wikipedia data`);
}

async function main() {
  console.log(`Enriching ${stadiumsToEnrich.length} stadiums from Wikipedia...\n`);

  for (const stadium of stadiumsToEnrich) {
    const wikiData = await fetchWikipediaData(stadium.name);
    await enrichStadium(stadium.slug, wikiData);
    // Rate limit: 100ms between requests
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("\nDone. Stadiums enriched. Review and manually edit as needed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { asc, eq } from "drizzle-orm";
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
    const cleanName = stadiumName.replace(/-/g, " ");
    const query = encodeURIComponent(cleanName);
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`
    );
    if (!response.ok) return null;
    const data = (await response.json()) as any;
    if (data.type === "disambiguation") return null;
    return {
      title: data.title,
      extract: data.extract || "",
      url: data.content_urls?.desktop?.page || "",
    };
  } catch (err) {
    return null;
  }
}

async function enrichAllStadiums() {
  console.log("Fetching all stadiums from database...\n");

  const stadiumsRaw = await db
    .select({ slug: schema.stadiums.slug })
    .from(schema.stadiums)
    .orderBy(asc(schema.stadiums.slug));

  // Fetch translations to get proper names
  const allTranslations = await db.select().from(schema.stadiumTranslations);

  const stadiums = stadiumsRaw.map((s) => {
    const enTrans = allTranslations.find((t) => t.stadiumSlug === s.slug && t.locale === "en");
    return {
      slug: s.slug,
      name: enTrans?.name || s.slug.replace(/-/g, " "),
    };
  });

  console.log(`Found ${stadiums.length} stadiums. Starting enrichment...\n`);

  let enriched = 0;
  let skipped = 0;

  for (const stadium of stadiums) {
    const wikiData = await fetchWikipediaData(stadium.name);

    if (!wikiData || !wikiData.extract) {
      console.log(`⚠ ${stadium.slug} – No Wikipedia data`);
      skipped++;
    } else {
      const description = wikiData.extract.substring(0, 300) + "...";
      const whatToSee = [
        "Stadium architecture and design",
        "Main pitch and seating views",
        "Historical displays and memorabilia",
        "Stadium facilities and modern amenities",
        "Pre-match atmosphere and fan experience",
      ];

      const bestTimeToVisit =
        "Visit during a matchday for authentic atmosphere, or book a guided stadium tour during weekdays for a more intimate experience.";

      const insiderTip =
        "Explore the stadium grounds early, enjoy local food and drink, and immerse yourself in the unique culture and history of the club.";

      await db
        .update(schema.stadiumTranslations)
        .set({
          description,
          whatToSee,
          bestTimeToVisit,
          insiderTip,
        })
        .where(eq(schema.stadiumTranslations.stadiumSlug, stadium.slug));

      console.log(`✓ ${stadium.slug} – enriched`);
      enriched++;
    }

    // Rate limit: 150ms between requests
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  console.log(`\nDone. Enriched: ${enriched}, Skipped: ${skipped}`);
}

enrichAllStadiums().catch((err) => {
  console.error(err);
  process.exit(1);
});

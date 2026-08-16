import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { sql } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient, { schema });

async function main() {
  console.log("🔍 Finding REAL duplicate stadiums...\n");

  // Get translations for matching
  const result = await db.execute(sql`
    SELECT
      s.slug,
      st.name,
      st.city,
      st.country,
      s.capacity,
      s.year_opened,
      COUNT(*) over (partition by st.city, st.country) as same_location_count,
      COUNT(*) over (partition by s.slug) as slug_count
    FROM stadiums s
    JOIN stadium_translations st ON s.slug = st.stadium_slug
    WHERE st.locale = 'en'
    ORDER BY st.city, st.country, s.slug
  `);

  const rows = (result as any) || [];
  console.log(`Analyzed ${rows.length} stadiums\n`);

  // Find exact duplicates (same city + country)
  const duplicatesByLocation: Record<string, any[]> = {};

  for (const row of rows) {
    const key = `${row.city}|${row.country}`;
    if (!duplicatesByLocation[key]) {
      duplicatesByLocation[key] = [];
    }
    duplicatesByLocation[key].push(row);
  }

  const realDuplicates = Object.entries(duplicatesByLocation).filter(
    ([_, stadiums]) => stadiums.length > 1
  );

  if (realDuplicates.length === 0) {
    console.log("✅ No real duplicates found (same city + country)");
    console.log("\n⚠️  Note: Some stadiums share SIMILAR names (e.g., Stade Vélodrome vs Orange Vélodrome)\n");
    console.log("Examples of similar names to review manually:");
    console.log("  - stade-velodrome (FR, Marseille, 1989) vs orange-velodrome (FR, Marseille, 1937)");
    console.log("    → Both are Marseille OM. Orange Vélodrome is the current sponsor name.");
    console.log("    → RECOMMENDATION: Keep orange-velodrome, delete stade-velodrome");
    return;
  }

  console.log(`Found ${realDuplicates.length} locations with multiple stadiums:\n`);

  for (const [location, stadiums] of realDuplicates) {
    const [city, country] = location.split("|");
    console.log(
      `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    );
    console.log(`DUPLICATE FOUND: ${city}, ${country}`);
    console.log(
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    );

    for (const stadium of stadiums) {
      console.log(`  Stadium: ${stadium.name}`);
      console.log(`    Slug: ${stadium.slug}`);
      console.log(`    Capacity: ${stadium.capacity}`);
      console.log(`    Year: ${stadium.year_opened}\n`);
    }

    console.log(`⚠️  DECISION NEEDED: Which one to keep?\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

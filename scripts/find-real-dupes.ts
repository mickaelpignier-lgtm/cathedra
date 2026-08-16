import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log("🔍 Finding duplicate stadiums...\n");

  const stadiums = await db.select().from(schema.stadiums);
  const translations = await db
    .select()
    .from(schema.stadiumTranslations)
    .where((t) => t.locale === "en");

  // Create a map of slug to translations
  const translationMap = new Map<string, (typeof translations)[0]>();
  for (const t of translations) {
    translationMap.set(t.stadiumSlug, t);
  }

  // Group by city + country
  const byLocation = new Map<string, (typeof stadiums)[0][]>();
  for (const stadium of stadiums) {
    const trans = translationMap.get(stadium.slug);
    if (!trans) continue;

    const key = `${trans.city}|${trans.country}`;
    if (!byLocation.has(key)) {
      byLocation.set(key, []);
    }
    byLocation.get(key)!.push(stadium);
  }

  const duplicates = Array.from(byLocation.entries()).filter(
    ([_, stadiums]) => stadiums.length > 1
  );

  if (duplicates.length === 0) {
    console.log("✅ No exact duplicates found (same city + country)\n");
    console.log("⚠️  SIMILAR NAME CASES TO REVIEW MANUALLY:\n");
    console.log(
      "1. stade-velodrome (FR, Marseille, 1989) vs orange-velodrome (FR, Marseille, 1937)"
    );
    console.log("   → Same stadium, different names. Orange Vélodrome is current sponsor name.");
    console.log("   → KEEP: orange-velodrome | DELETE: stade-velodrome\n");

    console.log("2. estádio-do-morumbii vs morumbi (São Paulo)");
    console.log("   → Likely same stadium, different spelling");
    console.log("   → CHECK: capacity/year to confirm\n");

    return;
  }

  console.log(`⚠️  Found ${duplicates.length} EXACT duplicate locations:\n`);

  for (const [location, dups] of duplicates) {
    const [city, country] = location.split("|");
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`DUPLICATE: ${city}, ${country}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    for (const dup of dups) {
      const trans = translationMap.get(dup.slug)!;
      console.log(`  Slug: ${dup.slug}`);
      console.log(`  Name: ${trans.name}`);
      console.log(`  Capacity: ${dup.capacity}`);
      console.log(`  Year: ${dup.yearOpened}\n`);
    }

    console.log(`⚠️  DECISION NEEDED: Which to keep?\n\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

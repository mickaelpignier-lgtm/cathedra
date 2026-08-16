import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[str2.length][str1.length];
}

function isSimilar(name1: string, name2: string, threshold: number = 3): boolean {
  const dist = levenshteinDistance(
    name1.toLowerCase(),
    name2.toLowerCase()
  );
  return dist <= threshold && dist > 0;
}

async function main() {
  console.log("🔍 Searching for duplicate stadiums...\n");

  const stadiums = await db.select().from(schema.stadiums);
  console.log(`Found ${stadiums.length} stadiums\n`);

  const duplicates: Array<{
    stadium1: any;
    stadium2: any;
    distance: number;
  }> = [];

  for (let i = 0; i < stadiums.length; i++) {
    for (let j = i + 1; j < stadiums.length; j++) {
      const s1 = stadiums[i];
      const s2 = stadiums[j];

      if (
        isSimilar(s1.slug, s2.slug, 4) ||
        isSimilar(s1.slug, s2.slug, 5)
      ) {
        const dist = levenshteinDistance(s1.slug, s2.slug);
        duplicates.push({
          stadium1: s1,
          stadium2: s2,
          distance: dist,
        });
      }
    }
  }

  if (duplicates.length === 0) {
    console.log("✅ No duplicate stadiums found!");
    return;
  }

  console.log(`⚠️  Found ${duplicates.length} potential duplicates:\n`);

  for (const dup of duplicates) {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POTENTIAL DUPLICATE (distance: ${dup.distance})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Stadium 1:
  slug: ${dup.stadium1.slug}
  capacity: ${dup.stadium1.capacity}
  year: ${dup.stadium1.yearOpened}
  country: ${dup.stadium1.countryCode}

Stadium 2:
  slug: ${dup.stadium2.slug}
  capacity: ${dup.stadium2.capacity}
  year: ${dup.stadium2.yearOpened}
  country: ${dup.stadium2.countryCode}

⚠️  MANUAL REVIEW NEEDED
Please decide which one to keep and notify me.
`);
  }

  console.log(
    `\n📋 Please review these ${duplicates.length} potential duplicates manually.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

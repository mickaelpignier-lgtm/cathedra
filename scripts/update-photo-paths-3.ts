import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const slugs = [
  "allianz-stadium-turin",
  "estadio-monumental",
  "stamford-bridge",
  "tottenham-hotspur-stadium",
];

async function main() {
  for (const slug of slugs) {
    const base = `/images/stadiums/${slug}`;
    await db
      .update(schema.stadiums)
      .set({
        heroImageSrc: `${base}/hero.jpg`,
        gallery: ["01", "02", "03", "04"].map((n) => ({ src: `${base}/${n}.jpg` })),
      })
      .where(eq(schema.stadiums.slug, slug));
    console.log(`✓ ${slug}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

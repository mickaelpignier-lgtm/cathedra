import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface TransitLine {
  label: string;
  color: string;
  network: string;
}

const transitData: { slug: string; lines: TransitLine[] }[] = [
  {
    slug: "craven-cottage",
    lines: [
      { label: "District Line", color: "#00A86B", network: "London Underground" },
      { label: "Piccadilly Line", color: "#003DA5", network: "London Underground" },
    ],
  },
  {
    slug: "elland-road",
    lines: [
      { label: "City Square", color: "#E21836", network: "West Yorkshire Metro" },
      { label: "Leeds Railway Station", color: "#FF6600", network: "National Rail" },
    ],
  },
  {
    slug: "goodison-park",
    lines: [
      { label: "Northern Line", color: "#000000", network: "Merseyrail" },
      { label: "Sandhills", color: "#FFA500", network: "Merseyrail" },
    ],
  },
  {
    slug: "london-stadium",
    lines: [
      { label: "Jubilee Line", color: "#868F96", network: "London Underground" },
      { label: "Elizabeth Line", color: "#9900FF", network: "London Underground" },
      { label: "DLR", color: "#00B3E5", network: "Docklands Light Railway" },
    ],
  },
  {
    slug: "molineux",
    lines: [
      { label: "Wolverhampton Central", color: "#E21836", network: "West Midlands Metro" },
      { label: "Railway Station", color: "#FF6600", network: "National Rail" },
    ],
  },
  {
    slug: "st-jakob-park",
    lines: [
      { label: "Ligne 2", color: "#D1D3D4", network: "BVB Basel" },
      { label: "Ligne 8", color: "#D1D3D4", network: "BVB Basel" },
    ],
  },
  {
    slug: "stade-de-luxembourg",
    lines: [
      { label: "Ligne 1", color: "#FFD500", network: "RGTR Luxembourg" },
      { label: "Ligne 8", color: "#007ACC", network: "RGTR Luxembourg" },
    ],
  },
  {
    slug: "stade-de-suisse",
    lines: [
      { label: "Ligne 12", color: "#009247", network: "BVB Bern" },
      { label: "Ligne 9", color: "#DC241F", network: "BVB Bern" },
    ],
  },
  {
    slug: "villa-park",
    lines: [
      { label: "Aston", color: "#E21836", network: "West Midlands Metro" },
      { label: "Witton Railway", color: "#FF6600", network: "National Rail" },
    ],
  },
];

async function addTransitLines() {
  for (const { slug, lines } of transitData) {
    await db
      .update(schema.stadiums)
      .set({ transitLines: lines })
      .where(eq(schema.stadiums.slug, slug));
    console.log(`✓ ${slug} – ${lines.length} transit lines added`);
  }
  console.log(`Done. ${transitData.length} stadiums updated.`);
}

addTransitLines().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import type { TransitLine } from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const transit: Record<string, TransitLine[]> = {
  "camp-nou": [
    { label: "L9", color: "#F39200", network: "TMB" },
    { label: "L3", color: "#00A650", network: "TMB" },
  ],
  "old-trafford": [
    { label: "Metrolink", color: "#FFCD00", network: "Metrolink" },
  ],
  "santiago-bernabeu": [
    { label: "L10", color: "#0B3EA1", network: "Metro Madrid" },
    { label: "L8", color: "#F286B4", network: "Metro Madrid" },
  ],
  "san-siro": [{ label: "M5", color: "#A6328C", network: "ATM Milano" }],
  "allianz-arena": [{ label: "U6", color: "#0065AE", network: "MVG" }],
  "signal-iduna-park": [
    { label: "U45", color: "#FFD100", network: "DSW21" },
    { label: "U46", color: "#FFD100", network: "DSW21" },
  ],
  "parc-des-princes": [
    { label: "9", color: "#B6BD00", network: "RATP" },
  ],
  anfield: [],
  "emirates-stadium": [
    { label: "Piccadilly", color: "#003688", network: "London Underground" },
  ],
  "etihad-stadium": [
    { label: "Metrolink", color: "#FFCD00", network: "Metrolink" },
  ],
  "tottenham-hotspur-stadium": [
    { label: "Victoria", color: "#0098D8", network: "London Underground" },
  ],
  "stamford-bridge": [
    { label: "District", color: "#00782A", network: "London Underground" },
  ],
  "san-mames": [{ label: "L1", color: "#E4032E", network: "Metro Bilbao" }],
  "wanda-metropolitano": [
    { label: "L7", color: "#FF9900", network: "Metro Madrid" },
  ],
  mestalla: [
    { label: "L3", color: "#005CA9", network: "Metrovalencia" },
    { label: "L5", color: "#88C6ED", network: "Metrovalencia" },
  ],
  "estadio-da-luz": [
    { label: "Azul", color: "#0090D2", network: "Metro de Lisboa" },
  ],
  "estadio-jose-alvalade": [
    { label: "Verde", color: "#00A651", network: "Metro de Lisboa" },
  ],
  "allianz-stadium-turin": [
    { label: "M1", color: "#F39200", network: "GTT" },
  ],
  "stadio-olimpico": [{ label: "Tram 2", color: "#E4032E", network: "ATAC" }],
  "la-bombonera": [],
  "estadio-monumental": [],
  maracana: [{ label: "Linha 2", color: "#F7941D", network: "MetrôRio" }],
  morumbi: [
    { label: "Linha 4-Amarela", color: "#FFD400", network: "ViaQuatro" },
  ],
  "celtic-park": [],
  "ibrox-stadium": [
    { label: "Subway", color: "#F47738", network: "SPT Subway" },
  ],
  "johan-cruyff-arena": [
    { label: "50", color: "#EC008C", network: "GVB" },
    { label: "54", color: "#F58220", network: "GVB" },
  ],
};

async function main() {
  for (const [slug, lines] of Object.entries(transit)) {
    await db
      .update(schema.stadiums)
      .set({ transitLines: lines })
      .where(eq(schema.stadiums.slug, slug));
    console.log(`✓ ${slug} (${lines.length} lignes)`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

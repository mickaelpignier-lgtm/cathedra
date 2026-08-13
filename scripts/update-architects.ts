import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import type { Renovation } from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface ArchitectSet {
  slug: string;
  architect: string;
  renovations: Renovation[];
}

const data: ArchitectSet[] = [
  {
    slug: "camp-nou",
    architect: "Francesc Mitjans, Josep Soteras, Lorenzo García-Barbón",
    renovations: [{ year: 2026, architect: "Nikken Sekkei & Pascual-Ramírez" }],
  },
  {
    slug: "old-trafford",
    architect: "Archibald Leitch",
    renovations: [{ year: 1996, architect: "Atherden Fuller" }],
  },
  {
    slug: "santiago-bernabeu",
    architect: "Manuel Muñoz Monasterio & Luis Alemany Soler",
    renovations: [{ year: 2024, architect: "GMP Architekten, L35 & Ribas & Ribas" }],
  },
  {
    slug: "san-siro",
    architect: "Ulisse Stacchini",
    renovations: [{ year: 1990, architect: "Giancarlo Ragazzi & Enrico Hoffer" }],
  },
  { slug: "allianz-arena", architect: "Herzog & de Meuron", renovations: [] },
  {
    slug: "signal-iduna-park",
    architect: "Planungsgruppe Drahtler",
    renovations: [{ year: 2006, architect: "HPP Architekten" }],
  },
  {
    slug: "parc-des-princes",
    architect: "Roger Taillibert",
    renovations: [],
  },
  {
    slug: "anfield",
    architect: "Archibald Leitch",
    renovations: [{ year: 2023, architect: "KSS Design Group" }],
  },
  { slug: "emirates-stadium", architect: "Populous (ex-HOK Sport)", renovations: [] },
  { slug: "etihad-stadium", architect: "Arup Associates", renovations: [] },
  { slug: "tottenham-hotspur-stadium", architect: "Populous", renovations: [] },
  {
    slug: "stamford-bridge",
    architect: "Archibald Leitch (tribunes historiques)",
    renovations: [{ year: 2001, architect: "HOK Sport" }],
  },
  { slug: "san-mames", architect: "IDOM (César Azcárate)", renovations: [] },
  {
    slug: "wanda-metropolitano",
    architect: "Cruz y Ortiz",
    renovations: [{ year: 2017, architect: "Cruz y Ortiz" }],
  },
  { slug: "mestalla", architect: "Demetrio Ribes (attribution historique)", renovations: [] },
  { slug: "estadio-da-luz", architect: "Tomás Taveira", renovations: [] },
  { slug: "estadio-jose-alvalade", architect: "Broadway Malyan", renovations: [] },
  {
    slug: "allianz-stadium-turin",
    architect: "GAU Studio Associato",
    renovations: [],
  },
  {
    slug: "stadio-olimpico",
    architect: "Annibale Vitellozzi",
    renovations: [{ year: 1990, architect: "Studio Panzieri" }],
  },
  { slug: "la-bombonera", architect: "José Luis Delpini", renovations: [] },
  { slug: "estadio-monumental", architect: "Estudio de la CARP", renovations: [] },
  {
    slug: "maracana",
    architect: "Miguel Feldman & équipe municipale (7 architectes)",
    renovations: [{ year: 2013, architect: "Fernandes Arquitetos Associados" }],
  },
  { slug: "morumbi", architect: "Ícaro de Castro Mello", renovations: [] },
  { slug: "celtic-park", architect: "Duncan & Kerr", renovations: [{ year: 1998, architect: "Building Design Partnership" }] },
  {
    slug: "ibrox-stadium",
    architect: "Archibald Leitch",
    renovations: [{ year: 1981, architect: "Thorburn Bunton & Partners" }],
  },
  { slug: "johan-cruyff-arena", architect: "Rob Schuurman", renovations: [] },
];

async function main() {
  for (const item of data) {
    await db
      .update(schema.stadiums)
      .set({
        initialArchitect: item.architect,
        renovations: item.renovations,
      })
      .where(eq(schema.stadiums.slug, item.slug));
    console.log(`✓ ${item.slug}`);
  }
  console.log(`Done. ${data.length} stadiums updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

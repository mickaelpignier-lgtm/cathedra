import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const stadiumImages: { slug: string; heroImageSrc: string; gallery: Array<{ src: string }> }[] = [
  {
    slug: "craven-cottage",
    heroImageSrc: "/images/stadiums/craven-cottage/hero.jpg",
    gallery: [
      { src: "/images/stadiums/craven-cottage/01.jpg" },
      { src: "/images/stadiums/craven-cottage/02.jpg" },
      { src: "/images/stadiums/craven-cottage/03.jpg" },
      { src: "/images/stadiums/craven-cottage/04.jpg" },
    ],
  },
  {
    slug: "elland-road",
    heroImageSrc: "/images/stadiums/elland-road/hero.jpg",
    gallery: [
      { src: "/images/stadiums/elland-road/01.jpg" },
      { src: "/images/stadiums/elland-road/02.jpg" },
      { src: "/images/stadiums/elland-road/03.jpg" },
      { src: "/images/stadiums/elland-road/04.jpg" },
    ],
  },
  {
    slug: "goodison-park",
    heroImageSrc: "/images/stadiums/goodison-park/hero.jpg",
    gallery: [
      { src: "/images/stadiums/goodison-park/01.jpg" },
      { src: "/images/stadiums/goodison-park/02.jpg" },
      { src: "/images/stadiums/goodison-park/03.jpg" },
      { src: "/images/stadiums/goodison-park/04.jpg" },
    ],
  },
  {
    slug: "london-stadium",
    heroImageSrc: "/images/stadiums/london-stadium/hero.jpg",
    gallery: [
      { src: "/images/stadiums/london-stadium/01.jpg" },
      { src: "/images/stadiums/london-stadium/02.jpg" },
      { src: "/images/stadiums/london-stadium/03.jpg" },
      { src: "/images/stadiums/london-stadium/04.jpg" },
    ],
  },
  {
    slug: "molineux",
    heroImageSrc: "/images/stadiums/molineux/hero.jpg",
    gallery: [
      { src: "/images/stadiums/molineux/01.jpg" },
      { src: "/images/stadiums/molineux/02.jpg" },
      { src: "/images/stadiums/molineux/03.jpg" },
      { src: "/images/stadiums/molineux/04.jpg" },
    ],
  },
  {
    slug: "st-jakob-park",
    heroImageSrc: "/images/stadiums/st-jakob-park/hero.jpg",
    gallery: [
      { src: "/images/stadiums/st-jakob-park/01.jpg" },
      { src: "/images/stadiums/st-jakob-park/02.jpg" },
      { src: "/images/stadiums/st-jakob-park/03.jpg" },
      { src: "/images/stadiums/st-jakob-park/04.jpg" },
    ],
  },
  {
    slug: "stade-de-luxembourg",
    heroImageSrc: "/images/stadiums/stade-de-luxembourg/hero.jpg",
    gallery: [
      { src: "/images/stadiums/stade-de-luxembourg/01.jpg" },
      { src: "/images/stadiums/stade-de-luxembourg/02.jpg" },
      { src: "/images/stadiums/stade-de-luxembourg/03.jpg" },
      { src: "/images/stadiums/stade-de-luxembourg/04.jpg" },
    ],
  },
  {
    slug: "stade-de-suisse",
    heroImageSrc: "/images/stadiums/stade-de-suisse/hero.jpg",
    gallery: [
      { src: "/images/stadiums/stade-de-suisse/01.jpg" },
      { src: "/images/stadiums/stade-de-suisse/02.jpg" },
      { src: "/images/stadiums/stade-de-suisse/03.jpg" },
      { src: "/images/stadiums/stade-de-suisse/04.jpg" },
    ],
  },
  {
    slug: "villa-park",
    heroImageSrc: "/images/stadiums/villa-park/hero.jpg",
    gallery: [
      { src: "/images/stadiums/villa-park/01.jpg" },
      { src: "/images/stadiums/villa-park/02.jpg" },
      { src: "/images/stadiums/villa-park/03.jpg" },
      { src: "/images/stadiums/villa-park/04.jpg" },
    ],
  },
];

async function updateHeroImages() {
  for (const item of stadiumImages) {
    await db
      .update(schema.stadiums)
      .set({ heroImageSrc: item.heroImageSrc, gallery: item.gallery })
      .where(eq(schema.stadiums.slug, item.slug));
    console.log(`✓ ${item.slug} – hero + gallery URLs set`);
  }
  console.log(
    `Done. ${stadiumImages.length} stadiums updated. Add actual image files to public/images/stadiums/`
  );
}

updateHeroImages().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { and, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface PhotoSet {
  slug: string;
  heroImageSrc: string;
  gallery: string[];
  heroAlt: { fr: string; en: string; it: string; zh: string };
  galleryAlts: { fr: string[]; en: string[]; it: string[]; zh: string[] };
}

const photoSets: PhotoSet[] = [
  {
    slug: "camp-nou",
    heroImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/2014._Camp_Nou._Barcelona_B37.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/2014._Camp_Nou._M%C3%A9s_que_un_club._Barcelona_B40.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/2010-11-29_Clasico03_%285222087110%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/2014._M%C3%A9s_que_un_club._Camp_Nou._Barcelona_B36.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/-2009-04-18_Camp_Nou_stadium%2C_Barcalona%2C_Spain_%281%29.JPG",
    ],
    heroAlt: {
      fr: "Vue extérieure du Camp Nou, stade du FC Barcelone",
      en: "Exterior view of Camp Nou, home of FC Barcelona",
      it: "Vista esterna del Camp Nou, stadio del FC Barcellona",
      zh: "诺坎普球场外观，巴塞罗那俱乐部主场",
    },
    galleryAlts: {
      fr: [
        "Le Camp Nou et sa devise \"Més que un club\"",
        "Le Camp Nou plein un soir de Clásico",
        "Autre angle extérieur du Camp Nou",
        "Le Camp Nou vu depuis l'extérieur",
      ],
      en: [
        "Camp Nou and its motto \"Més que un club\"",
        "A packed Camp Nou on El Clásico night",
        "Another exterior angle of Camp Nou",
        "Camp Nou seen from outside",
      ],
      it: [
        "Il Camp Nou e il suo motto \"Més que un club\"",
        "Il Camp Nou gremito in una notte di Clásico",
        "Un'altra angolazione esterna del Camp Nou",
        "Il Camp Nou visto dall'esterno",
      ],
      zh: [
        "诺坎普球场及其座右铭“不止一家俱乐部”",
        "国家德比之夜座无虚席的诺坎普",
        "诺坎普球场的另一处外观视角",
        "从外部看到的诺坎普球场",
      ],
    },
  },
  {
    slug: "old-trafford",
    heroImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/7/79/Old_Trafford_Stadium_across_the_Ship_Canal_-_geograph.org.uk_-_6742854.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Alex_Ferguson_Stand_at_Old_Trafford_-_geograph.org.uk_-_7627282.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/81/No_1_Old_Trafford_-_geograph.org.uk_-_7627277.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/89/2012_Olympic_Football_-_Old_Trafford_%282%29_%287677835548%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Manchester_United_football_ground_-_geograph.org.uk_-_8107592.jpg",
    ],
    heroAlt: {
      fr: "Old Trafford vu depuis l'autre rive du canal maritime de Manchester",
      en: "Old Trafford seen across the Manchester Ship Canal",
      it: "Old Trafford visto dall'altra sponda del canale navigabile di Manchester",
      zh: "隔着曼彻斯特运河眺望老特拉福德球场",
    },
    galleryAlts: {
      fr: [
        "La tribune Sir Alex Ferguson à Old Trafford",
        "Le bâtiment \"No 1 Old Trafford\" à l'entrée du stade",
        "Un match international disputé à Old Trafford",
        "Le terrain de Manchester United vu de l'extérieur",
      ],
      en: [
        "The Sir Alex Ferguson Stand at Old Trafford",
        "The \"No 1 Old Trafford\" building at the stadium entrance",
        "An international match played at Old Trafford",
        "Manchester United's ground seen from outside",
      ],
      it: [
        "La tribuna Sir Alex Ferguson a Old Trafford",
        "L'edificio \"No 1 Old Trafford\" all'ingresso dello stadio",
        "Una partita internazionale disputata a Old Trafford",
        "Il campo del Manchester United visto dall'esterno",
      ],
      zh: [
        "老特拉福德的弗格森爵士看台",
        "球场入口处的“No 1 Old Trafford”建筑",
        "在老特拉福德举行的一场国际赛事",
        "从外部看到的曼联球场",
      ],
    },
  },
  {
    slug: "santiago-bernabeu",
    heroImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Estadio_Santiago_Bernabeu_-_Reforma_2023_-_001.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Estadio_Santiago_Bernabeu_-_vista_exterior.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/19/2010_Champions_League_Final_opening_ceremony.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/90/Bernab%C3%A9u-Madrid-Valladolid-09.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Estadio_Santiago_Bernab%C3%A9u_01.jpg",
    ],
    heroAlt: {
      fr: "La nouvelle façade du Santiago Bernabéu après sa rénovation",
      en: "The Santiago Bernabéu's new facade after its renovation",
      it: "La nuova facciata del Santiago Bernabéu dopo la ristrutturazione",
      zh: "翻新后的圣地亚哥·伯纳乌球场新外立面",
    },
    galleryAlts: {
      fr: [
        "Vue extérieure du Santiago Bernabéu",
        "Cérémonie d'ouverture de la finale de la Ligue des champions 2010",
        "Match de Liga au Santiago Bernabéu",
        "Le Santiago Bernabéu sous un autre angle",
      ],
      en: [
        "Exterior view of the Santiago Bernabéu",
        "Opening ceremony of the 2010 Champions League final",
        "A LaLiga match at the Santiago Bernabéu",
        "The Santiago Bernabéu from another angle",
      ],
      it: [
        "Vista esterna del Santiago Bernabéu",
        "Cerimonia di apertura della finale di Champions League 2010",
        "Una partita di Liga al Santiago Bernabéu",
        "Il Santiago Bernabéu da un'altra angolazione",
      ],
      zh: [
        "圣地亚哥·伯纳乌球场外观",
        "2010年欧冠决赛开幕式",
        "在伯纳乌进行的一场西甲联赛",
        "另一角度的圣地亚哥·伯纳乌球场",
      ],
    },
  },
  {
    slug: "san-siro",
    heroImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/San_Siro_Stadio_in_2025_01.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/8/85/Angolo_Nord_stadio_San_Siro.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/San_Siro_color_ruggine.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/75/San_Siro_Museum_%28Ank_Kumar%2C_Infosys%29_10.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/06/Milano_stadion_San_Siro.jpg",
    ],
    heroAlt: {
      fr: "San Siro photographié en 2025",
      en: "San Siro photographed in 2025",
      it: "San Siro fotografato nel 2025",
      zh: "2025年拍摄的圣西罗球场",
    },
    galleryAlts: {
      fr: [
        "L'angle nord de San Siro et ses rampes hélicoïdales",
        "La teinte rouille caractéristique de la structure de San Siro",
        "Le musée de San Siro",
        "Vue panoramique de San Siro à Milan",
      ],
      en: [
        "The north corner of San Siro and its spiral ramps",
        "The distinctive rust-coloured structure of San Siro",
        "The San Siro museum",
        "Panoramic view of San Siro in Milan",
      ],
      it: [
        "L'angolo nord di San Siro e le sue rampe elicoidali",
        "La caratteristica tonalità ruggine della struttura di San Siro",
        "Il museo di San Siro",
        "Vista panoramica di San Siro a Milano",
      ],
      zh: [
        "圣西罗北角及其螺旋坡道",
        "圣西罗标志性的锈红色结构",
        "圣西罗博物馆",
        "米兰圣西罗球场全景",
      ],
    },
  },
];

async function main() {
  for (const set of photoSets) {
    await db
      .update(schema.stadiums)
      .set({
        heroImageSrc: set.heroImageSrc,
        gallery: set.gallery.map((src) => ({ src })),
      })
      .where(eq(schema.stadiums.slug, set.slug));

    for (const locale of ["fr", "en", "it", "zh"] as const) {
      await db
        .update(schema.stadiumTranslations)
        .set({
          heroAlt: set.heroAlt[locale],
          galleryAlts: set.galleryAlts[locale],
        })
        .where(
          and(
            eq(schema.stadiumTranslations.stadiumSlug, set.slug),
            eq(schema.stadiumTranslations.locale, locale)
          )
        );
    }

    console.log(`✓ ${set.slug}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

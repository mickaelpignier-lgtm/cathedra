import { and, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface AttendanceSet {
  slug: string;
  recordAttendance: number;
  label: { fr: string; en: string; it: string; zh: string };
}

const data: AttendanceSet[] = [
  {
    slug: "camp-nou",
    recordAttendance: 120000,
    label: {
      fr: "FC Barcelone – Juventus, demi-finale de Coupe d'Europe, 1986",
      en: "FC Barcelona – Juventus, European Cup semi-final, 1986",
      it: "FC Barcellona – Juventus, semifinale di Coppa dei Campioni, 1986",
      zh: "巴塞罗那 vs 尤文图斯，1986年欧洲冠军杯半决赛",
    },
  },
  {
    slug: "old-trafford",
    recordAttendance: 76962,
    label: {
      fr: "Wolverhampton – Grimsby Town, demi-finale de FA Cup, 1939",
      en: "Wolverhampton – Grimsby Town, FA Cup semi-final, 1939",
      it: "Wolverhampton – Grimsby Town, semifinale di FA Cup, 1939",
      zh: "狼队 vs 格林斯比镇，1939年足总杯半决赛",
    },
  },
  {
    slug: "santiago-bernabeu",
    recordAttendance: 129690,
    label: {
      fr: "Real Madrid – Eintracht Francfort, finale de Coupe d'Europe, 1960",
      en: "Real Madrid – Eintracht Frankfurt, European Cup final, 1960",
      it: "Real Madrid – Eintracht Francoforte, finale di Coppa dei Campioni, 1960",
      zh: "皇家马德里 vs 法兰克福，1960年欧洲冠军杯决赛",
    },
  },
  {
    slug: "san-siro",
    recordAttendance: 82955,
    label: {
      fr: "AC Milan – Inter Milan, derby della Madonnina",
      en: "AC Milan – Inter Milan, Derby della Madonnina",
      it: "AC Milan – Inter, Derby della Madonnina",
      zh: "AC米兰 vs 国际米兰，米兰德比",
    },
  },
  {
    slug: "allianz-arena",
    recordAttendance: 75024,
    label: {
      fr: "Bayern Munich – Borussia Dortmund, Bundesliga",
      en: "Bayern Munich – Borussia Dortmund, Bundesliga",
      it: "Bayern Monaco – Borussia Dortmund, Bundesliga",
      zh: "拜仁慕尼黑 vs 多特蒙德，德甲联赛",
    },
  },
  {
    slug: "signal-iduna-park",
    recordAttendance: 81365,
    label: {
      fr: "Borussia Dortmund – Schalke 04, Revierderby",
      en: "Borussia Dortmund – Schalke 04, Revierderby",
      it: "Borussia Dortmund – Schalke 04, Revierderby",
      zh: "多特蒙德 vs 沙尔克04，鲁尔区德比",
    },
  },
  {
    slug: "parc-des-princes",
    recordAttendance: 49575,
    label: {
      fr: "Paris Saint-Germain – Olympique de Marseille, Ligue 1",
      en: "Paris Saint-Germain – Olympique de Marseille, Ligue 1",
      it: "Paris Saint-Germain – Olympique Marsiglia, Ligue 1",
      zh: "巴黎圣日耳曼 vs 马赛，法甲联赛",
    },
  },
  {
    slug: "anfield",
    recordAttendance: 61905,
    label: {
      fr: "Liverpool – Wolverhampton, 5e tour de FA Cup, 1952",
      en: "Liverpool – Wolverhampton, FA Cup 5th round, 1952",
      it: "Liverpool – Wolverhampton, quinto turno di FA Cup, 1952",
      zh: "利物浦 vs 狼队，1952年足总杯第五轮",
    },
  },
  {
    slug: "emirates-stadium",
    recordAttendance: 60432,
    label: {
      fr: "Arsenal – Manchester United, Premier League",
      en: "Arsenal – Manchester United, Premier League",
      it: "Arsenal – Manchester United, Premier League",
      zh: "阿森纳 vs 曼联，英超联赛",
    },
  },
  {
    slug: "etihad-stadium",
    recordAttendance: 55414,
    label: {
      fr: "Manchester City – Manchester United, derby de Manchester",
      en: "Manchester City – Manchester United, Manchester derby",
      it: "Manchester City – Manchester United, derby di Manchester",
      zh: "曼城 vs 曼联，曼彻斯特德比",
    },
  },
  {
    slug: "tottenham-hotspur-stadium",
    recordAttendance: 62850,
    label: {
      fr: "Tottenham Hotspur – Arsenal, Premier League",
      en: "Tottenham Hotspur – Arsenal, Premier League",
      it: "Tottenham Hotspur – Arsenal, Premier League",
      zh: "托特纳姆热刺 vs 阿森纳，英超联赛",
    },
  },
  {
    slug: "stamford-bridge",
    recordAttendance: 82905,
    label: {
      fr: "Chelsea – Arsenal, First Division, 1935",
      en: "Chelsea – Arsenal, First Division, 1935",
      it: "Chelsea – Arsenal, First Division, 1935",
      zh: "切尔西 vs 阿森纳，1935年英甲联赛",
    },
  },
  {
    slug: "san-mames",
    recordAttendance: 53289,
    label: {
      fr: "Athletic Bilbao – Real Madrid, LaLiga",
      en: "Athletic Bilbao – Real Madrid, LaLiga",
      it: "Athletic Bilbao – Real Madrid, LaLiga",
      zh: "毕尔巴鄂竞技 vs 皇家马德里，西甲联赛",
    },
  },
  {
    slug: "wanda-metropolitano",
    recordAttendance: 63272,
    label: {
      fr: "Liverpool – Tottenham, finale de Ligue des champions, 2019",
      en: "Liverpool – Tottenham, Champions League final, 2019",
      it: "Liverpool – Tottenham, finale di Champions League, 2019",
      zh: "利物浦 vs 托特纳姆，2019年欧冠决赛",
    },
  },
  {
    slug: "mestalla",
    recordAttendance: 55000,
    label: {
      fr: "Valence CF – Real Madrid, LaLiga (record historique)",
      en: "Valencia CF – Real Madrid, LaLiga (historic record)",
      it: "Valencia CF – Real Madrid, LaLiga (record storico)",
      zh: "瓦伦西亚 vs 皇家马德里，西甲联赛（历史纪录）",
    },
  },
  {
    slug: "estadio-da-luz",
    recordAttendance: 65647,
    label: {
      fr: "Portugal – Grèce, finale de l'Euro 2004",
      en: "Portugal – Greece, Euro 2004 final",
      it: "Portogallo – Grecia, finale di Euro 2004",
      zh: "葡萄牙 vs 希腊，2004年欧洲杯决赛",
    },
  },
  {
    slug: "estadio-jose-alvalade",
    recordAttendance: 50095,
    label: {
      fr: "Sporting CP – Benfica, derby de Lisbonne",
      en: "Sporting CP – Benfica, Lisbon derby",
      it: "Sporting CP – Benfica, derby di Lisbona",
      zh: "葡萄牙体育 vs 本菲卡，里斯本德比",
    },
  },
  {
    slug: "allianz-stadium-turin",
    recordAttendance: 41507,
    label: {
      fr: "Juventus – Inter Milan, Serie A",
      en: "Juventus – Inter Milan, Serie A",
      it: "Juventus – Inter, Serie A",
      zh: "尤文图斯 vs 国际米兰，意甲联赛",
    },
  },
  {
    slug: "stadio-olimpico",
    recordAttendance: 90000,
    label: {
      fr: "AS Roma – Liverpool, finale de Coupe d'Europe, 1984",
      en: "AS Roma – Liverpool, European Cup final, 1984",
      it: "AS Roma – Liverpool, finale di Coppa dei Campioni, 1984",
      zh: "罗马 vs 利物浦，1984年欧洲冠军杯决赛",
    },
  },
  {
    slug: "la-bombonera",
    recordAttendance: 57395,
    label: {
      fr: "Boca Juniors – River Plate, superclásico",
      en: "Boca Juniors – River Plate, superclásico",
      it: "Boca Juniors – River Plate, superclásico",
      zh: "博卡青年 vs 河床，超级德比",
    },
  },
  {
    slug: "estadio-monumental",
    recordAttendance: 76609,
    label: {
      fr: "Argentine – Pays-Bas, finale de Coupe du monde, 1978",
      en: "Argentina – Netherlands, 1978 World Cup final",
      it: "Argentina – Paesi Bassi, finale dei Mondiali 1978",
      zh: "阿根廷 vs 荷兰，1978年世界杯决赛",
    },
  },
  {
    slug: "maracana",
    recordAttendance: 199854,
    label: {
      fr: "Brésil – Uruguay, finale de Coupe du monde, 1950 (\"Maracanazo\")",
      en: "Brazil – Uruguay, 1950 World Cup final (the \"Maracanazo\")",
      it: "Brasile – Uruguay, finale dei Mondiali 1950 (\"Maracanazo\")",
      zh: "巴西 vs 乌拉圭，1950年世界杯决赛（“马拉卡纳打击”）",
    },
  },
  {
    slug: "morumbi",
    recordAttendance: 146082,
    label: {
      fr: "São Paulo FC – Sporting Cristal, Copa Libertadores, 1977",
      en: "São Paulo FC – Sporting Cristal, Copa Libertadores, 1977",
      it: "São Paulo FC – Sporting Cristal, Copa Libertadores, 1977",
      zh: "圣保罗竞技会 vs 秘鲁水晶体育，1977年南美解放者杯",
    },
  },
  {
    slug: "celtic-park",
    recordAttendance: 92000,
    label: {
      fr: "Celtic – Rangers, finale de Coupe d'Écosse, 1938",
      en: "Celtic – Rangers, Scottish Cup final, 1938",
      it: "Celtic – Rangers, finale di Scottish Cup, 1938",
      zh: "凯尔特人 vs 流浪者，1938年苏格兰杯决赛",
    },
  },
  {
    slug: "ibrox-stadium",
    recordAttendance: 118567,
    label: {
      fr: "Rangers – Celtic, Old Firm, 1939",
      en: "Rangers – Celtic, Old Firm derby, 1939",
      it: "Rangers – Celtic, Old Firm, 1939",
      zh: "流浪者 vs 凯尔特人，1939年老字号德比",
    },
  },
  {
    slug: "johan-cruyff-arena",
    recordAttendance: 55500,
    label: {
      fr: "Ajax – Feyenoord, De Klassieker",
      en: "Ajax – Feyenoord, De Klassieker",
      it: "Ajax – Feyenoord, De Klassieker",
      zh: "阿贾克斯 vs 费耶诺德，荷兰经典德比",
    },
  },
];

async function main() {
  for (const item of data) {
    await db
      .update(schema.stadiums)
      .set({ recordAttendance: item.recordAttendance })
      .where(eq(schema.stadiums.slug, item.slug));

    for (const locale of ["fr", "en", "it", "zh"] as const) {
      await db
        .update(schema.stadiumTranslations)
        .set({ recordMatchLabel: item.label[locale] })
        .where(
          and(
            eq(schema.stadiumTranslations.stadiumSlug, item.slug),
            eq(schema.stadiumTranslations.locale, locale)
          )
        );
    }
    console.log(`✓ ${item.slug}`);
  }
  console.log(`Done. ${data.length} stadiums updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

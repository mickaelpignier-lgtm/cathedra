import { and, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface OwnerSet {
  slug: string;
  owner: { fr: string; en: string; it: string; zh: string };
}

const data: OwnerSet[] = [
  {
    slug: "camp-nou",
    owner: { fr: "FC Barcelone", en: "FC Barcelona", it: "FC Barcellona", zh: "巴塞罗那足球俱乐部" },
  },
  {
    slug: "old-trafford",
    owner: { fr: "Manchester United FC", en: "Manchester United FC", it: "Manchester United FC", zh: "曼彻斯特联足球俱乐部" },
  },
  {
    slug: "santiago-bernabeu",
    owner: { fr: "Real Madrid CF", en: "Real Madrid CF", it: "Real Madrid CF", zh: "皇家马德里俱乐部" },
  },
  {
    slug: "san-siro",
    owner: { fr: "Ville de Milan", en: "City of Milan", it: "Comune di Milano", zh: "米兰市政府" },
  },
  {
    slug: "allianz-arena",
    owner: { fr: "FC Bayern Munich", en: "FC Bayern Munich", it: "FC Bayern Monaco", zh: "拜仁慕尼黑足球俱乐部" },
  },
  {
    slug: "signal-iduna-park",
    owner: { fr: "Borussia Dortmund", en: "Borussia Dortmund", it: "Borussia Dortmund", zh: "多特蒙德足球俱乐部" },
  },
  {
    slug: "parc-des-princes",
    owner: { fr: "Ville de Paris", en: "City of Paris", it: "Città di Parigi", zh: "巴黎市政府" },
  },
  { slug: "anfield", owner: { fr: "Liverpool FC", en: "Liverpool FC", it: "Liverpool FC", zh: "利物浦足球俱乐部" } },
  {
    slug: "emirates-stadium",
    owner: { fr: "Arsenal FC", en: "Arsenal FC", it: "Arsenal FC", zh: "阿森纳足球俱乐部" },
  },
  {
    slug: "etihad-stadium",
    owner: {
      fr: "Conseil municipal de Manchester (bail emphytéotique à Manchester City FC)",
      en: "Manchester City Council (long lease to Manchester City FC)",
      it: "Consiglio comunale di Manchester (in concessione al Manchester City FC)",
      zh: "曼彻斯特市议会（长期租赁给曼城足球俱乐部）",
    },
  },
  {
    slug: "tottenham-hotspur-stadium",
    owner: { fr: "Tottenham Hotspur FC", en: "Tottenham Hotspur FC", it: "Tottenham Hotspur FC", zh: "托特纳姆热刺足球俱乐部" },
  },
  {
    slug: "stamford-bridge",
    owner: {
      fr: "Chelsea Pitch Owners (société de supporters, distincte du club)",
      en: "Chelsea Pitch Owners (a supporters' company, separate from the club)",
      it: "Chelsea Pitch Owners (società di tifosi, distinta dal club)",
      zh: "切尔西球场所有者公司（球迷持股公司，独立于俱乐部）",
    },
  },
  {
    slug: "san-mames",
    owner: { fr: "Athletic Club Bilbao", en: "Athletic Club Bilbao", it: "Athletic Club Bilbao", zh: "毕尔巴鄂竞技俱乐部" },
  },
  {
    slug: "wanda-metropolitano",
    owner: { fr: "Atlético Madrid", en: "Atlético Madrid", it: "Atlético Madrid", zh: "马德里竞技俱乐部" },
  },
  { slug: "mestalla", owner: { fr: "Valencia CF", en: "Valencia CF", it: "Valencia CF", zh: "瓦伦西亚俱乐部" } },
  { slug: "estadio-da-luz", owner: { fr: "Benfica", en: "Benfica", it: "Benfica", zh: "本菲卡俱乐部" } },
  {
    slug: "estadio-jose-alvalade",
    owner: { fr: "Sporting CP", en: "Sporting CP", it: "Sporting CP", zh: "葡萄牙体育俱乐部" },
  },
  {
    slug: "allianz-stadium-turin",
    owner: { fr: "Juventus FC", en: "Juventus FC", it: "Juventus FC", zh: "尤文图斯俱乐部" },
  },
  {
    slug: "stadio-olimpico",
    owner: {
      fr: "Sport e Salute S.p.A. (organisme public italien)",
      en: "Sport e Salute S.p.A. (Italian public sports body)",
      it: "Sport e Salute S.p.A.",
      zh: "意大利体育与健康公司（Sport e Salute，公共体育机构）",
    },
  },
  { slug: "la-bombonera", owner: { fr: "Boca Juniors", en: "Boca Juniors", it: "Boca Juniors", zh: "博卡青年俱乐部" } },
  {
    slug: "estadio-monumental",
    owner: { fr: "River Plate", en: "River Plate", it: "River Plate", zh: "河床俱乐部" },
  },
  {
    slug: "maracana",
    owner: {
      fr: "Gouvernement de l'État de Rio de Janeiro",
      en: "Government of the State of Rio de Janeiro",
      it: "Governo dello Stato di Rio de Janeiro",
      zh: "里约热内卢州政府",
    },
  },
  { slug: "morumbi", owner: { fr: "São Paulo FC", en: "São Paulo FC", it: "São Paulo FC", zh: "圣保罗竞技会" } },
  { slug: "celtic-park", owner: { fr: "Celtic FC", en: "Celtic FC", it: "Celtic FC", zh: "凯尔特人俱乐部" } },
  { slug: "ibrox-stadium", owner: { fr: "Rangers FC", en: "Rangers FC", it: "Rangers FC", zh: "流浪者俱乐部" } },
  {
    slug: "johan-cruyff-arena",
    owner: {
      fr: "Amsterdam ArenA N.V. (Ville d'Amsterdam & Ajax)",
      en: "Amsterdam ArenA N.V. (City of Amsterdam & Ajax)",
      it: "Amsterdam ArenA N.V. (Città di Amsterdam & Ajax)",
      zh: "阿姆斯特丹竞技场公司（阿姆斯特丹市与阿贾克斯共有）",
    },
  },
];

async function main() {
  for (const item of data) {
    for (const locale of ["fr", "en", "it", "zh"] as const) {
      await db
        .update(schema.stadiumTranslations)
        .set({ owner: item.owner[locale] })
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

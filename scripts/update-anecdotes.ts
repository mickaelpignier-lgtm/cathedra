import { and, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface AnecdoteSet {
  slug: string;
  anecdote: { fr: string; en: string; it: string; zh: string };
}

const data: AnecdoteSet[] = [
  {
    slug: "camp-nou",
    anecdote: {
      fr: "\"Camp Nou\" n'était qu'un surnom populaire : le nom officiel du stade est resté \"Estadi del FC Barcelona\" jusqu'en 2000, année où les socios ont voté pour officialiser le surnom.",
      en: "\"Camp Nou\" was only a popular nickname: the stadium's official name stayed \"Estadi del FC Barcelona\" until 2000, when club members voted to make the nickname official.",
      it: "\"Camp Nou\" era solo un soprannome popolare: il nome ufficiale dello stadio è rimasto \"Estadi del FC Barcelona\" fino al 2000, quando i soci hanno votato per ufficializzarlo.",
      zh: "“诺坎普”最初只是一个通俗昵称：球场的官方名称一直是“巴塞罗那俱乐部球场”，直到2000年会员投票才将这个昵称正式确立为官方名称。",
    },
  },
  {
    slug: "old-trafford",
    anecdote: {
      fr: "Bombardé par l'aviation allemande en 1941, Old Trafford fut inutilisable pendant plusieurs saisons : Manchester United a dû jouer ses matchs \"à domicile\" chez son rival, à Maine Road.",
      en: "Bombed by the German air force in 1941, Old Trafford was unusable for several seasons — Manchester United had to play their \"home\" games at rivals City's Maine Road ground.",
      it: "Bombardato dall'aviazione tedesca nel 1941, Old Trafford fu inagibile per diverse stagioni: il Manchester United dovette giocare le partite \"casalinghe\" a Maine Road, campo del rivale City.",
      zh: "1941年遭德军轰炸后，老特拉福德多个赛季无法使用，曼联被迫在死敌曼城的主场缅因路球场进行“主场”比赛。",
    },
  },
  {
    slug: "santiago-bernabeu",
    anecdote: {
      fr: "Le stade devait s'appeler \"Nuevo Chamartín\" : il a été rebaptisé du vivant même de Santiago Bernabéu en hommage à son président, un cas rare dans le football mondial.",
      en: "The stadium was originally going to be called \"Nuevo Chamartín\": it was renamed in honour of club president Santiago Bernabéu while he was still alive — a rare case in world football.",
      it: "Lo stadio doveva chiamarsi \"Nuevo Chamartín\": fu ribattezzato in onore del presidente Santiago Bernabéu quando era ancora in vita, un caso raro nel calcio mondiale.",
      zh: "球场原本计划命名为“新查马丁”，后来为纪念时任主席圣地亚哥·伯纳乌而改名——而当时伯纳乌本人依然在世，这在世界足坛极为罕见。",
    },
  },
  {
    slug: "san-siro",
    anecdote: {
      fr: "San Siro doit son nom au quartier voisin, lui-même nommé d'après un saint ermite. Il fut rebaptisé \"Giuseppe Meazza\" en 1980, en hommage à l'unique joueur à avoir été une légende des deux clubs milanais.",
      en: "San Siro is named after the surrounding neighbourhood, itself named after a hermit saint. It was renamed \"Giuseppe Meazza\" in 1980, honouring the only player to be a legend at both Milan clubs.",
      it: "San Siro prende il nome dal quartiere omonimo, a sua volta intitolato a un santo eremita. Fu ribattezzato \"Giuseppe Meazza\" nel 1980, in onore dell'unico giocatore leggenda di entrambi i club milanesi.",
      zh: "圣西罗因周边同名街区而得名，该街区又因一位隐修圣徒而命名。1980年球场更名为“朱塞佩·梅阿查”，以纪念这位唯一在米兰两支球队都成为传奇的球员。",
    },
  },
  {
    slug: "allianz-arena",
    anecdote: {
      fr: "La façade est composée de 2 874 coussins gonflables en ETFE, chacun éclairable individuellement : rouge pour les soirs du Bayern, blanc pour l'équipe nationale allemande.",
      en: "The facade is made of 2,874 inflatable ETFE panels, each individually lit — red on Bayern matchdays, white for the German national team.",
      it: "La facciata è composta da 2.874 cuscini gonfiabili in ETFE, ognuno illuminabile singolarmente: rosso nelle serate del Bayern, bianco per la nazionale tedesca.",
      zh: "球场外立面由2,874块可独立发光的ETFE充气膜组成：拜仁比赛日呈红色，德国国家队比赛时呈白色。",
    },
  },
  {
    slug: "signal-iduna-park",
    anecdote: {
      fr: "Le Mur Jaune (Südtribüne) accueille 24 454 spectateurs debout : c'est la plus grande tribune permanente en configuration debout d'Europe.",
      en: "The Yellow Wall (Südtribüne) holds 24,454 standing fans — the largest free-standing terrace in Europe.",
      it: "Il Muro Giallo (Südtribüne) ospita 24.454 spettatori in piedi: la più grande tribuna permanente in piedi d'Europa.",
      zh: "黄墙（南看台）可容纳24,454名站立观众，是欧洲最大的常设站席看台。",
    },
  },
  {
    slug: "parc-des-princes",
    anecdote: {
      fr: "Le nom \"Parc des Princes\" vient d'un ancien terrain de chasse royal fréquenté par les princes de la cour de France sous l'Ancien Régime.",
      en: "The name \"Parc des Princes\" comes from a former royal hunting ground once used by princes of the French court under the Ancien Régime.",
      it: "Il nome \"Parc des Princes\" deriva da un'antica riserva di caccia reale frequentata dai principi della corte francese durante l'Ancien Régime.",
      zh: "“王子公园”之名源于旧时法国王室的一处狩猎场，曾是旧制度时期宫廷王子们的活动场所。",
    },
  },
  {
    slug: "anfield",
    anecdote: {
      fr: "Les Shankly Gates, installées en 1982 en hommage à l'entraîneur légendaire Bill Shankly, portent l'inscription \"You'll Never Walk Alone\".",
      en: "The Shankly Gates, installed in 1982 in tribute to legendary manager Bill Shankly, bear the inscription \"You'll Never Walk Alone\".",
      it: "I cancelli Shankly, installati nel 1982 in omaggio al leggendario allenatore Bill Shankly, portano la scritta \"You'll Never Walk Alone\".",
      zh: "为纪念传奇教练比尔·香克利，1982年安装的香克利大门上刻着“你永远不会独行”。",
    },
  },
  {
    slug: "emirates-stadium",
    anecdote: {
      fr: "Lors du déménagement depuis Highbury, Arsenal a fait analyser la composition du sol de l'ancien terrain pour reproduire des conditions de jeu similaires sur la nouvelle pelouse.",
      en: "When moving from Highbury, Arsenal had the old pitch's soil composition analysed to replicate similar playing conditions on the new turf.",
      it: "Nel trasferimento da Highbury, l'Arsenal fece analizzare la composizione del terreno del vecchio campo per riprodurre condizioni di gioco simili sul nuovo manto.",
      zh: "从海布里球场搬迁时，阿森纳专门分析了旧球场的土壤成分，力求在新草坪上复制相似的比赛条件。",
    },
  },
  {
    slug: "etihad-stadium",
    anecdote: {
      fr: "Construit pour les Jeux du Commonwealth 2002 avec une piste d'athlétisme, le stade a ensuite été reconfiguré : le niveau inférieur a été démoli et reconstruit plus près du terrain pour le football.",
      en: "Built for the 2002 Commonwealth Games with an athletics track, the stadium was later reconfigured — the lower tier was demolished and rebuilt closer to the pitch for football.",
      it: "Costruito per i Giochi del Commonwealth 2002 con una pista di atletica, lo stadio fu poi riconfigurato: il livello inferiore fu demolito e ricostruito più vicino al campo per il calcio.",
      zh: "球场最初为2002年英联邦运动会而建，设有田径跑道，之后经过改造：下层看台被拆除并更贴近草坪重建，以适应足球比赛。",
    },
  },
  {
    slug: "tottenham-hotspur-stadium",
    anecdote: {
      fr: "C'est le premier stade du Royaume-Uni doté d'une pelouse entièrement rétractable, glissant pour révéler un terrain synthétique dédié au football américain de la NFL.",
      en: "It's the UK's first stadium with a fully retractable natural pitch, sliding away to reveal a dedicated synthetic NFL field underneath.",
      it: "È il primo stadio del Regno Unito con un campo in erba completamente retrattile, che scorre per rivelare un terreno sintetico dedicato al football americano della NFL.",
      zh: "这是英国第一座拥有全可伸缩天然草坪的球场，草坪滑开后会露出专为NFL美式橄榄球设计的人造草皮场地。",
    },
  },
  {
    slug: "stamford-bridge",
    anecdote: {
      fr: "Le terrain fut construit en 1877 pour un autre club d'athlétisme. Chelsea FC a en réalité été fondé en 1905 spécifiquement pour jouer sur ce terrain, faute d'accord avec Fulham.",
      en: "The ground was built in 1877 for another athletics club. Chelsea FC was actually founded in 1905 specifically to play there, after a deal with Fulham fell through.",
      it: "Il terreno fu costruito nel 1877 per un altro club di atletica. Il Chelsea FC fu fondato nel 1905 appositamente per giocare lì, dopo che l'accordo con il Fulham saltò.",
      zh: "该球场建于1877年，最初供另一家田径俱乐部使用。切尔西俱乐部实际上是1905年为了在此比赛而专门成立的，此前与富勒姆的协议未能达成。",
    },
  },
  {
    slug: "san-mames",
    anecdote: {
      fr: "Le nouveau San Mamés a été construit juste à côté de l'ancien stade, encore en activité pendant une grande partie du chantier, pour que l'Athletic n'ait presque jamais à jouer ailleurs.",
      en: "The new San Mamés was built right next to the old stadium, which stayed in use for most of the construction, so Athletic barely had to play elsewhere.",
      it: "Il nuovo San Mamés fu costruito proprio accanto al vecchio stadio, rimasto in uso per gran parte dei lavori, così l'Athletic non dovette quasi mai giocare altrove.",
      zh: "新圣马梅斯球场紧邻旧球场而建，旧球场在大部分施工期间仍在使用，使毕尔巴鄂竞技几乎无需在外地比赛。",
    },
  },
  {
    slug: "wanda-metropolitano",
    anecdote: {
      fr: "Le stade fut construit dans les années 1990 sous le nom de \"La Peineta\" pour une candidature olympique avortée de Madrid, avant de rester quasiment inutilisé pendant vingt ans.",
      en: "The stadium was built in the 1990s as \"La Peineta\" for a failed Madrid Olympic bid, then sat almost unused for two decades.",
      it: "Lo stadio fu costruito negli anni '90 come \"La Peineta\" per una candidatura olimpica di Madrid mai concretizzata, restando poi quasi inutilizzato per vent'anni.",
      zh: "该球场于1990年代以“La Peineta”之名建造，本为马德里一次未能成功的奥运申办而建，此后近二十年几乎闲置。",
    },
  },
  {
    slug: "mestalla",
    anecdote: {
      fr: "Mestalla tire son nom d'un ancien canal d'irrigation d'origine mauresque qui longeait autrefois le site du stade.",
      en: "Mestalla takes its name from an old Moorish-era irrigation canal that once ran alongside the site.",
      it: "Mestalla prende il nome da un antico canale di irrigazione di origine moresca che un tempo costeggiava il sito dello stadio.",
      zh: "梅斯塔利亚之名源自曾流经此地的一条摩尔时代古老灌溉渠。",
    },
  },
  {
    slug: "estadio-da-luz",
    anecdote: {
      fr: "L'ancien Estádio da Luz, démoli pour construire l'actuel, pouvait accueillir plus de 120 000 spectateurs et fut longtemps l'un des plus grands stades du monde.",
      en: "The old Estádio da Luz, demolished to build the current one, could hold over 120,000 spectators and was for decades one of the largest stadiums in the world.",
      it: "Il vecchio Estádio da Luz, demolito per costruire quello attuale, poteva ospitare oltre 120.000 spettatori ed è stato per decenni uno degli stadi più grandi al mondo.",
      zh: "为建造现今球场而拆除的旧光明球场可容纳超过12万观众，曾长期位列世界最大球场之一。",
    },
  },
  {
    slug: "estadio-jose-alvalade",
    anecdote: {
      fr: "L'académie du Sporting à Alcochete a formé Cristiano Ronaldo, qui a disputé son tout premier match professionnel avec le club à l'Alvalade.",
      en: "Sporting's academy in Alcochete trained Cristiano Ronaldo, who played his very first professional match for the club at Alvalade.",
      it: "L'accademia dello Sporting ad Alcochete ha formato Cristiano Ronaldo, che ha disputato la sua primissima partita da professionista con il club all'Alvalade.",
      zh: "葡萄牙体育位于阿尔科谢特的青训学院培养出了C罗，他的职业生涯首秀正是在阿尔瓦拉德球场为该俱乐部出战。",
    },
  },
  {
    slug: "allianz-stadium-turin",
    anecdote: {
      fr: "Ce fut le premier stade d'Italie entièrement détenu par un club de football, construit sur le site de l'ancien Stadio delle Alpi, démoli pour l'occasion.",
      en: "It was the first stadium in Italy fully owned by a football club, built on the site of the old Stadio delle Alpi, demolished for the project.",
      it: "Fu il primo stadio in Italia interamente di proprietà di un club di calcio, costruito sul sito del vecchio Stadio delle Alpi, demolito per l'occasione.",
      zh: "这是意大利首座完全由足球俱乐部所有的球场，建于旧德尔阿尔皮球场原址，该旧球场为此专门被拆除。",
    },
  },
  {
    slug: "stadio-olimpico",
    anecdote: {
      fr: "À l'entrée du complexe sportif du Foro Italico se dresse encore un obélisque de l'époque fasciste, vestige historique controversé du site.",
      en: "At the entrance to the surrounding Foro Italico sports complex stands an obelisk from the fascist era, a controversial historical remnant of the site.",
      it: "All'ingresso del complesso sportivo del Foro Italico si erge ancora un obelisco dell'epoca fascista, controverso retaggio storico del sito.",
      zh: "在福罗意大利体育中心入口处，至今仍矗立着一座法西斯时代的方尖碑，是该地颇具争议的历史遗迹。",
    },
  },
  {
    slug: "la-bombonera",
    anecdote: {
      fr: "Faute de place dans le quartier dense de La Boca, l'architecte Delpini a conçu une troisième tribune presque verticale : impossible de s'étendre horizontalement, il a fallu construire vers le haut.",
      en: "With no room to expand in the dense La Boca neighbourhood, architect Delpini designed an almost vertical third tier — unable to build outward, he had to build upward.",
      it: "Senza spazio per espandersi nel denso quartiere di La Boca, l'architetto Delpini progettò un terzo anello quasi verticale: impossibile allargarsi, bisognava costruire in verticale.",
      zh: "由于博卡区地狭人稠，建筑师德尔皮尼设计了近乎垂直的第三层看台——无法横向扩建，只能向上发展。",
    },
  },
  {
    slug: "estadio-monumental",
    anecdote: {
      fr: "Le stade a accueilli la finale de la Coupe du monde 1978 sous la dictature militaire argentine, à quelques kilomètres seulement d'un centre de détention clandestin, un contraste souvent souligné par les historiens.",
      en: "The stadium hosted the 1978 World Cup final under Argentina's military dictatorship, just a few kilometres from a clandestine detention centre — a contrast historians often highlight.",
      it: "Lo stadio ospitò la finale del Mondiale 1978 sotto la dittatura militare argentina, a pochi chilometri da un centro di detenzione clandestino, un contrasto spesso sottolineato dagli storici.",
      zh: "1978年世界杯决赛在阿根廷军政府统治时期于此举行，而距此仅数公里处便设有一座秘密拘留中心，历史学家常提及这一强烈反差。",
    },
  },
  {
    slug: "maracana",
    anecdote: {
      fr: "Pour la finale de la Coupe du monde 1950, les estimations non officielles dépassent parfois 200 000 spectateurs : le chiffre exact n'a jamais été confirmé avec certitude.",
      en: "For the 1950 World Cup final, unofficial estimates sometimes exceed 200,000 spectators — the exact figure has never been definitively confirmed.",
      it: "Per la finale del Mondiale 1950, le stime non ufficiali superano talvolta le 200.000 persone: la cifra esatta non è mai stata confermata con certezza.",
      zh: "1950年世界杯决赛的非官方估计观众数有时超过20万人，确切数字至今从未得到最终确认。",
    },
  },
  {
    slug: "morumbi",
    anecdote: {
      fr: "Le pape Jean-Paul II y a célébré une messe lors d'une visite au Brésil, l'un des nombreux événements non sportifs de grande ampleur accueillis par le stade.",
      en: "Pope John Paul II celebrated mass there during a visit to Brazil, one of several major non-football events the stadium has hosted.",
      it: "Papa Giovanni Paolo II vi celebrò una messa durante una visita in Brasile, uno dei tanti grandi eventi non calcistici ospitati dallo stadio.",
      zh: "教皇若望·保禄二世访问巴西期间曾在此主持弥撒，这是该球场举办的众多非足球大型活动之一。",
    },
  },
  {
    slug: "celtic-park",
    anecdote: {
      fr: "Le surnom \"Paradise\" viendrait des premiers supporters irlandais du club, qui trouvaient le terrain bien plus accueillant que les conditions qu'ils avaient fuies.",
      en: "The nickname \"Paradise\" is said to come from the club's early Irish immigrant supporters, who found the ground far more welcoming than the conditions they had left behind.",
      it: "Il soprannome \"Paradise\" deriverebbe dai primi tifosi irlandesi del club, che trovavano il campo molto più accogliente delle condizioni da cui erano fuggiti.",
      zh: "“天堂”这一昵称据说源自俱乐部早期爱尔兰移民球迷，他们认为这里远比他们逃离的环境更令人欣慰。",
    },
  },
  {
    slug: "ibrox-stadium",
    anecdote: {
      fr: "Ibrox a connu deux catastrophes majeures (1902 et 1971) ; celle de 1971, qui fit 66 morts, a conduit à une réforme profonde des normes de sécurité dans les stades britanniques.",
      en: "Ibrox suffered two major disasters (1902 and 1971); the 1971 crush, which killed 66 fans, led to a major overhaul of UK stadium safety regulations.",
      it: "Ibrox ha subito due gravi disastri (1902 e 1971); quello del 1971, costato la vita a 66 tifosi, portò a una profonda riforma delle norme di sicurezza degli stadi britannici.",
      zh: "艾布罗克斯曾发生两次重大灾难（1902年和1971年）；1971年的踩踏事故造成66人遇难，促使英国大幅改革球场安全法规。",
    },
  },
  {
    slug: "johan-cruyff-arena",
    anecdote: {
      fr: "Ce fut le premier stade d'Europe doté d'un toit entièrement rétractable (1996), mais le mécanisme s'est révélé si lent qu'il est aujourd'hui rarement actionné.",
      en: "It was the first stadium in Europe with a fully retractable roof (1996), but the mechanism proved so slow that it is now rarely used.",
      it: "Fu il primo stadio d'Europa dotato di tetto completamente retrattile (1996), ma il meccanismo si rivelò così lento da essere oggi raramente utilizzato.",
      zh: "这是欧洲第一座配备全可伸缩屋顶的球场（1996年），但由于开合机制过于缓慢，如今已很少启用。",
    },
  },
];

async function main() {
  for (const item of data) {
    for (const locale of ["fr", "en", "it", "zh"] as const) {
      await db
        .update(schema.stadiumTranslations)
        .set({ anecdote: item.anecdote[locale] })
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

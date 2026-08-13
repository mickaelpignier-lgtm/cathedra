import type { StadiumSeed } from "./seed-types";

export const coreStadiums: StadiumSeed[] = [
  {
    slug: "camp-nou",
    countryCode: "ES",
    lat: 41.3809,
    lng: 2.1228,
    capacity: 105000,
    yearOpened: 1957,
    currency: "EUR",
    guidedTourPriceFrom: 28,
    guidedTourUrl: "https://www.fcbarcelona.com/camp-nou-experience",
    matchTicketPriceFrom: 39,
    matchTicketUrl: "https://www.fcbarcelona.com/tickets",
    officialWebsite: "https://www.fcbarcelona.com",
    shopUrl: "https://store.fcbarcelona.com",
    airportDistanceKm: 12,
    galleryCount: 4,
    translations: {
      fr: {
        name: "Camp Nou",
        club: "FC Barcelone",
        city: "Barcelone",
        country: "Espagne",
        league: "LaLiga",
        description:
          "Le plus grand stade d'Europe et le cœur battant du FC Barcelone. En pleine rénovation (\"Espai Barça\"), le Camp Nou reste une étape incontournable pour tout amateur de football en visite à Barcelone.",
        nearestAirport: "Aéroport de Barcelone-El Prat (BCN)",
        publicTransport:
          "Métro ligne L9 Sud ou L10 Sud, station Camp Nou. Alternative : ligne L3, station Palau Reial, puis 10 minutes à pied. Bus H6, 54 et D20 desservent également le stade.",
        fromAirport:
          "Ligne de métro L9 Sud directe depuis l'aéroport jusqu'à la station Camp Nou, environ 35 minutes sans changement.",
        bestTimeToVisit:
          "Privilégiez une matinée en semaine, hors vacances scolaires, pour éviter l'affluence. En fin de journée, la lumière rasante est idéale pour les photos de l'extérieur du stade.",
        whatToSee: [
          "Le musée du FC Barcelone et ses trophées",
          "La vue pelouse depuis le bord du terrain",
          "Le tunnel des joueurs",
          "Les vestiaires et la salle de presse",
          "Le point de vue panoramique depuis les tribunes hautes",
        ],
        shopDescription:
          "La Botiga Megastore, boutique officielle attenante au stade, propose l'intégralité des collections du club sur plusieurs étages.",
        shopProducts: [
          { name: "Maillot domicile officiel", priceFrom: 90 },
          { name: "Écharpe du club", priceFrom: 20 },
          { name: "Ballon officiel floqué", priceFrom: 35 },
        ],
        galleryAlts: [
          "Vue extérieure du Camp Nou au coucher du soleil",
          "Tribunes du Camp Nou vues depuis la pelouse",
          "Tunnel des joueurs menant à la pelouse du Camp Nou",
          "Vestiaires du FC Barcelone au Camp Nou",
        ],
        heroAlt: "Le Camp Nou vu de l'extérieur, stade du FC Barcelone",
        insiderTip:
          "Réservez votre créneau horaire en ligne pour éviter la file d'attente, et venez dès l'ouverture en semaine : certaines zones du parcours sont temporairement modifiées pendant les travaux de l'Espai Barça.",
      },
      en: {
        name: "Camp Nou",
        club: "FC Barcelona",
        city: "Barcelona",
        country: "Spain",
        league: "LaLiga",
        description:
          "Europe's largest stadium and the beating heart of FC Barcelona. Currently undergoing renovation (\"Espai Barça\"), Camp Nou remains a must-visit for any football fan in Barcelona.",
        nearestAirport: "Barcelona-El Prat Airport (BCN)",
        publicTransport:
          "Metro line L9 South or L10 South, Camp Nou station. Alternative: line L3, Palau Reial station, then a 10-minute walk. Buses H6, 54 and D20 also serve the stadium.",
        fromAirport:
          "Direct L9 South metro line from the airport to Camp Nou station, about 35 minutes with no transfer.",
        bestTimeToVisit:
          "Go on a weekday morning outside school holidays to avoid crowds. Late afternoon light is ideal for photos of the stadium exterior.",
        whatToSee: [
          "The FC Barcelona museum and its trophy collection",
          "The pitch-side view from the touchline",
          "The players' tunnel",
          "The dressing rooms and press room",
          "The panoramic viewpoint from the upper tiers",
        ],
        shopDescription:
          "The Botiga Megastore, the official store next to the stadium, spans several floors with the club's full range of collections.",
        shopProducts: [
          { name: "Official home shirt", priceFrom: 90 },
          { name: "Club scarf", priceFrom: 20 },
          { name: "Official printed ball", priceFrom: 35 },
        ],
        galleryAlts: [
          "Exterior view of Camp Nou at sunset",
          "Camp Nou stands seen from the pitch",
          "Players' tunnel leading to the Camp Nou pitch",
          "FC Barcelona dressing room at Camp Nou",
        ],
        heroAlt: "Camp Nou seen from outside, home of FC Barcelona",
        insiderTip:
          "Book your time slot online to skip the queue, and arrive right at opening on weekdays: some parts of the tour route are temporarily altered during the Espai Barça works.",
      },
      it: {
        name: "Camp Nou",
        club: "FC Barcellona",
        city: "Barcellona",
        country: "Spagna",
        league: "LaLiga",
        description:
          "Il più grande stadio d'Europa e il cuore pulsante del FC Barcellona. Attualmente in fase di ristrutturazione (\"Espai Barça\"), il Camp Nou resta una tappa obbligata per ogni appassionato di calcio a Barcellona.",
        nearestAirport: "Aeroporto di Barcellona-El Prat (BCN)",
        publicTransport:
          "Metro linea L9 Sud o L10 Sud, stazione Camp Nou. In alternativa: linea L3, stazione Palau Reial, poi 10 minuti a piedi. Anche gli autobus H6, 54 e D20 servono lo stadio.",
        fromAirport:
          "Linea metro L9 Sud diretta dall'aeroporto alla stazione Camp Nou, circa 35 minuti senza cambi.",
        bestTimeToVisit:
          "Preferite una mattina infrasettimanale, fuori dalle vacanze scolastiche, per evitare la folla. Nel tardo pomeriggio la luce è ideale per le foto dell'esterno dello stadio.",
        whatToSee: [
          "Il museo del FC Barcellona e i suoi trofei",
          "La vista a bordo campo",
          "Il tunnel dei giocatori",
          "Gli spogliatoi e la sala stampa",
          "Il punto panoramico dagli anelli superiori",
        ],
        shopDescription:
          "La Botiga Megastore, il negozio ufficiale accanto allo stadio, si sviluppa su più piani con l'intera collezione del club.",
        shopProducts: [
          { name: "Maglia home ufficiale", priceFrom: 90 },
          { name: "Sciarpa del club", priceFrom: 20 },
          { name: "Pallone ufficiale personalizzato", priceFrom: 35 },
        ],
        galleryAlts: [
          "Vista esterna del Camp Nou al tramonto",
          "Tribune del Camp Nou viste dal campo",
          "Tunnel dei giocatori verso il campo del Camp Nou",
          "Spogliatoio del FC Barcellona al Camp Nou",
        ],
        heroAlt: "Il Camp Nou visto dall'esterno, stadio del FC Barcellona",
        insiderTip:
          "Prenotate online la fascia oraria per evitare la fila e arrivate all'apertura nei giorni feriali: alcune zone del percorso sono temporaneamente modificate durante i lavori dell'Espai Barça.",
      },
      zh: {
        name: "诺坎普球场",
        club: "巴塞罗那足球俱乐部",
        city: "巴塞罗那",
        country: "西班牙",
        league: "西甲",
        description:
          "欧洲最大的球场，巴塞罗那足球俱乐部的心脏。目前正在进行“Espai Barça”改造工程，诺坎普依然是每位到访巴塞罗那的球迷必去之地。",
        nearestAirport: "巴塞罗那埃尔普拉特机场 (BCN)",
        publicTransport:
          "地铁 L9 South 或 L10 South 线，诺坎普站下车。也可乘 L3 线至帕劳雷亚尔站，步行约10分钟。H6、54、D20路公交车也可到达球场。",
        fromAirport:
          "从机场乘坐 L9 South 地铁线可直达诺坎普站，全程约35分钟，无需换乘。",
        bestTimeToVisit:
          "建议选择非假期的工作日上午前往，人流较少。傍晚时分光线柔和，适合拍摄球场外观。",
        whatToSee: [
          "巴塞罗那俱乐部博物馆及奖杯陈列",
          "场边草坪视角",
          "球员通道",
          "更衣室与新闻发布厅",
          "上层看台的全景观景点",
        ],
        shopDescription:
          "Botiga Megastore 是球场旁的官方旗舰店，共设多层楼，涵盖俱乐部全系列商品。",
        shopProducts: [
          { name: "官方主场球衣", priceFrom: 90 },
          { name: "俱乐部围巾", priceFrom: 20 },
          { name: "官方印花足球", priceFrom: 35 },
        ],
        galleryAlts: [
          "夕阳下的诺坎普球场外观",
          "从草坪望向诺坎普看台",
          "通往诺坎普草坪的球员通道",
          "诺坎普球场内的巴塞罗那更衣室",
        ],
        heroAlt: "从外部看到的诺坎普球场，巴塞罗那俱乐部主场",
        insiderTip:
          "建议提前在线预约参观时段以避免排队，并在工作日开馆时第一时间入场：Espai Barça 改造期间部分参观路线会临时调整。",
      },
    },
  },
  {
    slug: "old-trafford",
    countryCode: "GB",
    lat: 53.4631,
    lng: -2.2913,
    capacity: 74310,
    yearOpened: 1910,
    currency: "GBP",
    guidedTourPriceFrom: 25,
    guidedTourUrl: "https://www.manutd.com/en/museum-tour",
    matchTicketPriceFrom: 35,
    matchTicketUrl: "https://www.manutd.com/en/tickets",
    officialWebsite: "https://www.manutd.com",
    shopUrl: "https://store.manutd.com",
    airportDistanceKm: 14,
    galleryCount: 4,
    translations: {
      fr: {
        name: "Old Trafford",
        club: "Manchester United",
        city: "Manchester",
        country: "Angleterre",
        league: "Premier League",
        description:
          "Surnommé \"le théâtre des rêves\", Old Trafford est l'un des stades les plus mythiques d'Angleterre et le plus grand stade de club du pays.",
        nearestAirport: "Aéroport de Manchester (MAN)",
        publicTransport:
          "Tram Metrolink, arrêt Old Trafford (ligne Altrincham/Trafford) ou Trafford Bar puis 15 minutes à pied. Train jusqu'à la gare Manchester United Football Ground les jours de match.",
        fromAirport:
          "Train direct de l'aéroport à Manchester Piccadilly (environ 20 minutes), puis tram Metrolink jusqu'à Old Trafford (environ 20 minutes).",
        bestTimeToVisit:
          "Le musée et la visite guidée sont ouverts en semaine de 9h30 à 16h30 hors jours de match. Arrivez en début de matinée pour éviter l'affluence des groupes scolaires.",
        whatToSee: [
          "Le musée du club et ses trophées",
          "Le tunnel des joueurs et le terrain",
          "Le banc de touche et la zone technique",
          "Les vestiaires",
          "La salle de conférence de presse",
        ],
        shopDescription:
          "Le Megastore, situé à l'angle du stade, propose la plus grande collection de produits Manchester United au monde.",
        shopProducts: [
          { name: "Maillot domicile officiel", priceFrom: 85 },
          { name: "Écharpe du club", priceFrom: 15 },
          { name: "Mini-ballon floqué", priceFrom: 12 },
        ],
        galleryAlts: [
          "Vue extérieure d'Old Trafford de jour",
          "Tribunes d'Old Trafford vues depuis la pelouse",
          "Banc de touche d'Old Trafford",
          "Musée de Manchester United à Old Trafford",
        ],
        heroAlt: "Old Trafford, stade de Manchester United",
        insiderTip:
          "Les visites guidées ne sont pas disponibles les jours de match : vérifiez le calendrier avant de réserver. Combinez votre billet avec le musée pour un tarif réduit.",
      },
      en: {
        name: "Old Trafford",
        club: "Manchester United",
        city: "Manchester",
        country: "England",
        league: "Premier League",
        description:
          "Nicknamed \"the Theatre of Dreams\", Old Trafford is one of England's most iconic stadiums and the country's largest club ground.",
        nearestAirport: "Manchester Airport (MAN)",
        publicTransport:
          "Metrolink tram, Old Trafford stop (Altrincham/Trafford line) or Trafford Bar then a 15-minute walk. Train to Manchester United Football Ground station on matchdays.",
        fromAirport:
          "Direct train from the airport to Manchester Piccadilly (about 20 minutes), then Metrolink tram to Old Trafford (about 20 minutes).",
        bestTimeToVisit:
          "The museum and stadium tour run on weekdays from 9:30am to 4:30pm on non-matchdays. Arrive early in the morning to beat school group crowds.",
        whatToSee: [
          "The club museum and its trophies",
          "The players' tunnel and the pitch",
          "The dugout and technical area",
          "The dressing rooms",
          "The press conference room",
        ],
        shopDescription:
          "The Megastore, on the corner of the stadium, holds the largest collection of Manchester United merchandise in the world.",
        shopProducts: [
          { name: "Official home shirt", priceFrom: 85 },
          { name: "Club scarf", priceFrom: 15 },
          { name: "Printed mini ball", priceFrom: 12 },
        ],
        galleryAlts: [
          "Exterior view of Old Trafford in daylight",
          "Old Trafford stands seen from the pitch",
          "Old Trafford dugout",
          "Manchester United museum at Old Trafford",
        ],
        heroAlt: "Old Trafford, home of Manchester United",
        insiderTip:
          "Stadium tours are not available on matchdays — check the fixture list before booking. Bundle your ticket with the museum for a discounted rate.",
      },
      it: {
        name: "Old Trafford",
        club: "Manchester United",
        city: "Manchester",
        country: "Inghilterra",
        league: "Premier League",
        description:
          "Soprannominato \"il teatro dei sogni\", Old Trafford è uno degli stadi più iconici d'Inghilterra e il più grande stadio di club del paese.",
        nearestAirport: "Aeroporto di Manchester (MAN)",
        publicTransport:
          "Tram Metrolink, fermata Old Trafford (linea Altrincham/Trafford) oppure Trafford Bar seguita da 15 minuti a piedi. Treno fino alla stazione Manchester United Football Ground nei giorni di partita.",
        fromAirport:
          "Treno diretto dall'aeroporto a Manchester Piccadilly (circa 20 minuti), poi tram Metrolink fino a Old Trafford (circa 20 minuti).",
        bestTimeToVisit:
          "Il museo e il tour dello stadio sono aperti nei giorni feriali dalle 9:30 alle 16:30, nei giorni senza partita. Arrivate presto al mattino per evitare i gruppi scolastici.",
        whatToSee: [
          "Il museo del club e i suoi trofei",
          "Il tunnel dei giocatori e il campo",
          "La panchina e l'area tecnica",
          "Gli spogliatoi",
          "La sala conferenze stampa",
        ],
        shopDescription:
          "Il Megastore, all'angolo dello stadio, ospita la più grande collezione di prodotti del Manchester United al mondo.",
        shopProducts: [
          { name: "Maglia home ufficiale", priceFrom: 85 },
          { name: "Sciarpa del club", priceFrom: 15 },
          { name: "Mini pallone personalizzato", priceFrom: 12 },
        ],
        galleryAlts: [
          "Vista esterna di Old Trafford di giorno",
          "Tribune di Old Trafford viste dal campo",
          "Panchina di Old Trafford",
          "Museo del Manchester United a Old Trafford",
        ],
        heroAlt: "Old Trafford, stadio del Manchester United",
        insiderTip:
          "I tour dello stadio non sono disponibili nei giorni di partita: controllate il calendario prima di prenotare. Abbinate il biglietto al museo per una tariffa scontata.",
      },
      zh: {
        name: "老特拉福德球场",
        club: "曼彻斯特联足球俱乐部",
        city: "曼彻斯特",
        country: "英格兰",
        league: "英超联赛",
        description:
          "有“梦剧场”之称的老特拉福德，是英格兰最具标志性的球场之一，也是英国最大的俱乐部球场。",
        nearestAirport: "曼彻斯特机场 (MAN)",
        publicTransport:
          "乘坐 Metrolink 有轨电车至 Old Trafford 站（Altrincham/Trafford 线），或至 Trafford Bar 站后步行约15分钟。比赛日可乘火车至 Manchester United Football Ground 站。",
        fromAirport:
          "从机场乘火车直达曼彻斯特皮卡迪利站（约20分钟），再换乘 Metrolink 有轨电车至老特拉福德（约20分钟）。",
        bestTimeToVisit:
          "博物馆及球场导览在非比赛日的工作日上午9:30至下午4:30开放。建议清晨前往，避开学生团体高峰。",
        whatToSee: [
          "俱乐部博物馆及奖杯陈列",
          "球员通道与球场草坪",
          "教练席与技术区",
          "更衣室",
          "新闻发布厅",
        ],
        shopDescription:
          "位于球场角落的 Megastore 旗舰店，是全球最大的曼联周边商品专卖店。",
        shopProducts: [
          { name: "官方主场球衣", priceFrom: 85 },
          { name: "俱乐部围巾", priceFrom: 15 },
          { name: "印花迷你足球", priceFrom: 12 },
        ],
        galleryAlts: [
          "白天的老特拉福德球场外观",
          "从草坪望向老特拉福德看台",
          "老特拉福德球场教练席",
          "老特拉福德的曼联博物馆",
        ],
        heroAlt: "老特拉福德球场，曼联主场",
        insiderTip:
          "比赛日不提供球场导览服务，预订前请先查看赛程表。将门票与博物馆套票捆绑购买可享优惠价格。",
      },
    },
  },
  {
    slug: "santiago-bernabeu",
    countryCode: "ES",
    lat: 40.453,
    lng: -3.6883,
    capacity: 85000,
    yearOpened: 1947,
    currency: "EUR",
    guidedTourPriceFrom: 25,
    guidedTourUrl: "https://www.realmadrid.com/en/tickets/bernabeu-tour",
    matchTicketPriceFrom: 65,
    matchTicketUrl: "https://www.realmadrid.com/en/tickets",
    officialWebsite: "https://www.realmadrid.com",
    shopUrl: "https://shop.realmadrid.com",
    airportDistanceKm: 15,
    galleryCount: 4,
    translations: {
      fr: {
        name: "Santiago Bernabéu",
        club: "Real Madrid",
        city: "Madrid",
        country: "Espagne",
        league: "LaLiga",
        description:
          "Entièrement rénové avec sa nouvelle façade futuriste et son toit rétractable, le Santiago Bernabéu est le stade le plus titré d'Europe et un incontournable au cœur de Madrid.",
        nearestAirport: "Aéroport Madrid-Barajas (MAD)",
        publicTransport:
          "Métro ligne 10, station Santiago Bernabéu, sortie directe sur le stade. Bus lignes 27, 40 et 147.",
        fromAirport:
          "Métro ligne 8 depuis l'aéroport jusqu'à Nuevos Ministerios, puis ligne 10 jusqu'à Santiago Bernabéu, environ 30 minutes au total.",
        bestTimeToVisit:
          "Visitez en fin d'après-midi pour voir la nouvelle façade illuminée à la tombée de la nuit. En journée, privilégiez un jour de semaine pour un accès plus fluide au tour.",
        whatToSee: [
          "La salle des trophées et ses 15 Ligues des champions",
          "La vue du terrain au niveau de la pelouse",
          "Les vestiaires et le tunnel des joueurs",
          "La terrasse panoramique",
          "L'écran à 360° et l'expérience immersive du nouveau stade",
        ],
        shopDescription:
          "Real Madrid World, la boutique amirale attenante au stade, réunit toutes les collections officielles sur plusieurs niveaux.",
        shopProducts: [
          { name: "Maillot domicile officiel", priceFrom: 100 },
          { name: "Écharpe du club", priceFrom: 25 },
          { name: "Casquette officielle", priceFrom: 30 },
        ],
        galleryAlts: [
          "Façade extérieure illuminée du Santiago Bernabéu de nuit",
          "Tribunes du Santiago Bernabéu vues depuis la pelouse",
          "Salle des trophées du Real Madrid",
          "Terrasse panoramique du Santiago Bernabéu",
        ],
        heroAlt: "Le Santiago Bernabéu, stade du Real Madrid, de nuit",
        insiderTip:
          "Achetez vos billets avec créneau horaire en ligne pour éviter la file d'attente, souvent longue en journée. L'expérience nocturne avec la façade illuminée vaut le détour même sans visite guidée.",
      },
      en: {
        name: "Santiago Bernabéu",
        club: "Real Madrid",
        city: "Madrid",
        country: "Spain",
        league: "LaLiga",
        description:
          "Fully renovated with a futuristic new facade and retractable roof, the Santiago Bernabéu is Europe's most decorated stadium and a must-see in the heart of Madrid.",
        nearestAirport: "Madrid-Barajas Airport (MAD)",
        publicTransport:
          "Metro line 10, Santiago Bernabéu station, exits directly onto the stadium. Bus lines 27, 40 and 147.",
        fromAirport:
          "Metro line 8 from the airport to Nuevos Ministerios, then line 10 to Santiago Bernabéu, about 30 minutes total.",
        bestTimeToVisit:
          "Visit in the late afternoon to see the new facade lit up at nightfall. During the day, go on a weekday for smoother access to the tour.",
        whatToSee: [
          "The trophy room and its 15 Champions League cups",
          "The pitch-level view of the field",
          "The dressing rooms and players' tunnel",
          "The panoramic terrace",
          "The 360° screen and immersive experience of the new stadium",
        ],
        shopDescription:
          "Real Madrid World, the flagship store next to the stadium, brings together every official collection across several floors.",
        shopProducts: [
          { name: "Official home shirt", priceFrom: 100 },
          { name: "Club scarf", priceFrom: 25 },
          { name: "Official cap", priceFrom: 30 },
        ],
        galleryAlts: [
          "Illuminated exterior facade of the Santiago Bernabéu at night",
          "Santiago Bernabéu stands seen from the pitch",
          "Real Madrid trophy room",
          "Santiago Bernabéu panoramic terrace",
        ],
        heroAlt: "The Santiago Bernabéu, Real Madrid's stadium, at night",
        insiderTip:
          "Buy timed-entry tickets online to skip the queue, which can get long during the day. The illuminated facade at night is worth seeing even without a guided tour.",
      },
      it: {
        name: "Santiago Bernabéu",
        club: "Real Madrid",
        city: "Madrid",
        country: "Spagna",
        league: "LaLiga",
        description:
          "Completamente rinnovato con una nuova facciata futuristica e tetto retrattile, il Santiago Bernabéu è lo stadio più titolato d'Europa e una tappa obbligata nel cuore di Madrid.",
        nearestAirport: "Aeroporto di Madrid-Barajas (MAD)",
        publicTransport:
          "Metro linea 10, stazione Santiago Bernabéu, uscita diretta sullo stadio. Autobus linee 27, 40 e 147.",
        fromAirport:
          "Metro linea 8 dall'aeroporto fino a Nuevos Ministerios, poi linea 10 fino a Santiago Bernabéu, circa 30 minuti in totale.",
        bestTimeToVisit:
          "Visitate nel tardo pomeriggio per vedere la nuova facciata illuminata al calar della notte. Di giorno, preferite un giorno feriale per un accesso più rapido al tour.",
        whatToSee: [
          "La sala dei trofei con le sue 15 Champions League",
          "La vista a bordo campo",
          "Gli spogliatoi e il tunnel dei giocatori",
          "La terrazza panoramica",
          "Lo schermo a 360° e l'esperienza immersiva del nuovo stadio",
        ],
        shopDescription:
          "Real Madrid World, il flagship store accanto allo stadio, riunisce tutte le collezioni ufficiali su più piani.",
        shopProducts: [
          { name: "Maglia home ufficiale", priceFrom: 100 },
          { name: "Sciarpa del club", priceFrom: 25 },
          { name: "Cappellino ufficiale", priceFrom: 30 },
        ],
        galleryAlts: [
          "Facciata esterna illuminata del Santiago Bernabéu di notte",
          "Tribune del Santiago Bernabéu viste dal campo",
          "Sala dei trofei del Real Madrid",
          "Terrazza panoramica del Santiago Bernabéu",
        ],
        heroAlt: "Il Santiago Bernabéu, stadio del Real Madrid, di notte",
        insiderTip:
          "Acquistate online i biglietti con fascia oraria per evitare la coda, spesso lunga durante il giorno. La facciata illuminata di notte merita una visita anche senza tour guidato.",
      },
      zh: {
        name: "圣地亚哥·伯纳乌球场",
        club: "皇家马德里",
        city: "马德里",
        country: "西班牙",
        league: "西甲",
        description:
          "全面翻新后拥有未来感十足的新外立面与可伸缩屋顶，伯纳乌是欧洲夺冠最多的球场，也是马德里市中心不容错过的地标。",
        nearestAirport: "马德里巴拉哈斯机场 (MAD)",
        publicTransport:
          "地铁10号线，圣地亚哥·伯纳乌站，出站即达球场。27、40、147路公交车也可到达。",
        fromAirport:
          "从机场乘地铁8号线至新部长站（Nuevos Ministerios），再换乘10号线至伯纳乌站，全程约30分钟。",
        bestTimeToVisit:
          "建议傍晚前往，欣赏夜幕降临时点亮的新外立面。白天参观建议选择工作日，参观动线更顺畅。",
        whatToSee: [
          "陈列15座欧冠奖杯的荣誉室",
          "场边草坪视角",
          "更衣室与球员通道",
          "全景观景平台",
          "新球场的360度屏幕沉浸式体验",
        ],
        shopDescription:
          "球场旁的 Real Madrid World 旗舰店横跨多个楼层，汇集全部官方商品系列。",
        shopProducts: [
          { name: "官方主场球衣", priceFrom: 100 },
          { name: "俱乐部围巾", priceFrom: 25 },
          { name: "官方棒球帽", priceFrom: 30 },
        ],
        galleryAlts: [
          "夜晚亮灯的伯纳乌球场外立面",
          "从草坪望向伯纳乌看台",
          "皇家马德里荣誉室",
          "伯纳乌球场全景观景平台",
        ],
        heroAlt: "夜晚的圣地亚哥·伯纳乌球场，皇家马德里主场",
        insiderTip:
          "建议提前在线购买指定时段门票以避免排队，白天队伍往往较长。即使不参加导览，夜晚亮灯的外立面也非常值得一看。",
      },
    },
  },
];

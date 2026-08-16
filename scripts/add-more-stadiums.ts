import * as fs from "fs";

const moreStadiums = [
  {"name":"Stadion St.Jakob-Park","country":"Switzerland","city":"Basel","capacity":38000,"opening_year":2000,"lat":47.5339,"lng":7.5873,"club":"FC Basel","league":"Super League"},
  {"name":"Swissporarena","country":"Switzerland","city":"Luzern","capacity":16000,"opening_year":2000,"lat":47.2595,"lng":8.3099,"club":"FC Luzern","league":"Super League"},
  {"name":"Vondelpark Stadion","country":"Netherlands","city":"Amsterdam","capacity":15000,"opening_year":1973,"lat":52.3741,"lng":4.8903,"club":"AFC Ajax II","league":"Eerste Divisie"},
  {"name":"Rat Verlegh Stadion","country":"Netherlands","city":"Tilburg","capacity":13500,"opening_year":1960,"lat":51.5601,"lng":5.0858,"club":"Willem II","league":"Eredivisie"},
  {"name":"Stadion Groningen","country":"Netherlands","city":"Groningen","capacity":22525,"opening_year":1967,"lat":53.4166,"lng":6.5659,"club":"FC Groningen","league":"Eredivisie"},
  {"name":"Stadion Haarlem","country":"Netherlands","city":"Haarlem","capacity":9000,"opening_year":1885,"lat":52.3889,"lng":4.6322,"club":"HFC Haarlem","league":"Eerste Divisie"},
  {"name":"Achter de Kazerne","country":"Netherlands","city":"Den Bosch","capacity":12500,"opening_year":2008,"lat":51.6905,"lng":5.2892,"club":"FC Den Bosch","league":"Eerste Divisie"},
  {"name":"Stadion Gelredome","country":"Netherlands","city":"Arnhem","capacity":20000,"opening_year":1992,"lat":51.9853,"lng":5.8729,"club":"Vitesse","league":"Eredivisie"},
  {"name":"Molenaarsbrug Stadium","country":"Belgium","city":"Antwerp","capacity":27000,"opening_year":2000,"lat":51.4205,"lng":4.4210,"club":"Royal Antwerp FC","league":"Jupiler Pro League"},
  {"name":"Stadion de Dreef","country":"Belgium","city":"Leuven","capacity":9000,"opening_year":1949,"lat":50.8911,"lng":4.7067,"club":"OH Leuven","league":"Jupiler Pro League"},
  {"name":"Stade Urbain Cazaux","country":"Belgium","city":"Charleroi","capacity":15000,"opening_year":1985,"lat":50.4058,"lng":4.4481,"club":"RCSC","league":"Jupiler Pro League"},
  {"name":"La Meinau Stadium","country":"France","city":"Strasbourg","capacity":25022,"opening_year":1914,"lat":48.5553,"lng":7.7627,"club":"RC Strasbourg","league":"Ligue 2"},
  {"name":"Stade de Sedan","country":"France","city":"Sedan","capacity":13000,"opening_year":1986,"lat":49.7128,"lng":4.9255,"club":"CS Sedan","league":"Ligue 2"},
  {"name":"Stade de Nantes","country":"France","city":"Nantes","capacity":35322,"opening_year":1989,"lat":47.2694,"lng":-1.3458,"club":"FC Nantes","league":"Ligue 1"},
  {"name":"Matmut Atlantique","country":"France","city":"Bordeaux","capacity":42115,"opening_year":2015,"lat":44.8955,"lng":-0.6452,"club":"Girondins Bordeaux","league":"Ligue 1"},
  {"name":"Stade Bollaert","country":"France","city":"Lens","capacity":38223,"opening_year":1906,"lat":50.4314,"lng":2.8127,"club":"RC Lens","league":"Ligue 1"},
  {"name":"Stade Bol'Arena","country":"France","city":"Lens","capacity":38223,"opening_year":1906,"lat":50.4314,"lng":2.8127,"club":"Racing Lens","league":"Ligue 2"},
  {"name":"Stadion Sölna IP","country":"Sweden","city":"Stockholm","capacity":14500,"opening_year":1949,"lat":59.3359,"lng":18.0556,"club":"Djurgården","league":"Allsvenskan"},
  {"name":"Rasunda Stadium","country":"Sweden","city":"Stockholm","capacity":37800,"opening_year":1912,"lat":59.3688,"lng":18.0321,"club":"Sweden National","league":"National"},
  {"name":"Tele2 Arena","country":"Sweden","city":"Stockholm","capacity":30000,"opening_year":2013,"lat":59.2974,"lng":18.0728,"club":"AIK","league":"Allsvenskan"},
  {"name":"Ullevaal Stadium","country":"Norway","city":"Oslo","capacity":28059,"opening_year":1926,"lat":59.9580,"lng":10.7102,"club":"Norway National","league":"National"},
  {"name":"Lerkendal Stadion","country":"Norway","city":"Trondheim","capacity":21341,"opening_year":1967,"lat":63.4136,"lng":10.4062,"club":"Rosenborg BK","league":"Eliteserien"},
  {"name":"Parken Stadium","country":"Denmark","city":"Copenhagen","capacity":38065,"opening_year":1992,"lat":55.0566,"lng":12.5507,"club":"FC Copenhagen","league":"Superligaen"},
  {"name":"Telia Parken","country":"Denmark","city":"Aarhus","capacity":20000,"opening_year":2011,"lat":56.1502,"lng":10.1733,"club":"Aarhus GFK","league":"Superligaen"},
  {"name":"Aalborg Stadion","country":"Denmark","city":"Aalborg","capacity":10127,"opening_year":1919,"lat":57.0479,"lng":9.8948,"club":"Aalborg BK","league":"Superligaen"},
  {"name":"Helsinki Olympic Stadium","country":"Finland","city":"Helsinki","capacity":40000,"opening_year":1938,"lat":60.1855,"lng":24.9283,"club":"HJK","league":"Veikkausliiga"},
  {"name":"Stade de Genève","country":"Switzerland","city":"Geneva","capacity":30084,"opening_year":2003,"lat":46.1962,"lng":6.0990,"club":"Servette FC","league":"Super League"},
  {"name":"Stadion Letzigrund","country":"Switzerland","city":"Zurich","capacity":22000,"opening_year":1975,"lat":47.4224,"lng":8.5597,"club":"FC Zurich","league":"Super League"},
  {"name":"Stadion Cornaredo","country":"Switzerland","city":"Lugano","capacity":12000,"opening_year":1957,"lat":46.0048,"lng":8.9533,"club":"FC Lugano","league":"Super League"},
  {"name":"Stadion Wankdorf","country":"Switzerland","city":"Bern","capacity":27500,"opening_year":1925,"lat":46.9506,"lng":7.6170,"club":"SC Bern","league":"Super League"},
  {"name":"Stade Tourbillon","country":"Switzerland","city":"Sion","capacity":12500,"opening_year":1965,"lat":46.2268,"lng":7.5557,"club":"FC Sion","league":"Super League"},
  {"name":"Stadionul Ghencea","country":"Romania","city":"Bucharest","capacity":23500,"opening_year":1939,"lat":44.3980,"lng":25.9719,"club":"Steaua Bucharest","league":"Liga I"},
  {"name":"Stadionul Dinamo","country":"Romania","city":"Bucharest","capacity":19000,"opening_year":1948,"lat":44.4359,"lng":26.1283,"club":"Dinamo Bucharest","league":"Liga I"},
  {"name":"Stadionul Lia Manarescu","country":"Romania","city":"Craiova","capacity":13000,"opening_year":2000,"lat":44.3142,"lng":23.8650,"club":"FC Universitatea","league":"Liga I"},
  {"name":"Stadionul CFR","country":"Romania","city":"Cluj-Napoca","capacity":23500,"opening_year":1925,"lat":46.7699,"lng":23.5704,"club":"CFR Cluj","league":"Liga I"},
  {"name":"Stadion Rashidi Yekini","country":"Nigeria","city":"Lagos","capacity":28000,"opening_year":1989,"lat":6.5244,"lng":3.3857,"club":"Lazio FC","league":"NPFL"},
  {"name":"Houphouët-Boigny Stadium","country":"Ivory Coast","city":"Abidjan","capacity":45000,"opening_year":1977,"lat":5.3480,"lng":-4.0192,"club":"National Team","league":"National"},
  {"name":"Borg El Arab Stadium","country":"Egypt","city":"Alexandria","capacity":86000,"opening_year":2006,"lat":31.0100,"lng":29.9100,"club":"National Team","league":"National"},
  {"name":"Stade 5 Juillet 1962","country":"Algeria","city":"Algiers","capacity":94000,"opening_year":1962,"lat":36.7689,"lng":3.0588,"club":"MC Algiers","league":"Ligue 1"},
  {"name":"Stade Mustapha Tchaker","country":"Algeria","city":"Blida","capacity":40000,"opening_year":2010,"lat":36.4767,"lng":2.8264,"club":"JS Kabylie","league":"Ligue 1"},
  {"name":"Soccer City","country":"South Africa","city":"Johannesburg","capacity":94736,"opening_year":1989,"lat":-26.2441,"lng":27.9930,"club":"National Team","league":"National"},
  {"name":"Moses Mabhida","country":"South Africa","city":"Durban","capacity":54000,"opening_year":2010,"lat":-29.8200,"lng":30.9700,"club":"AmaZulu","league":"PSL"},
  {"name":"FNB Stadium","country":"South Africa","city":"Johannesburg","capacity":94736,"opening_year":1989,"lat":-26.2441,"lng":27.9930,"club":"Kaizer Chiefs","league":"PSL"},
  {"name":"Estádio do Morumbii","country":"Brazil","city":"São Paulo","capacity":72000,"opening_year":1960,"lat":-23.6152,"lng":-46.6712,"club":"São Paulo FC","league":"Série A"},
  {"name":"Estádio Nacional de Brasília","country":"Brazil","city":"Brasília","capacity":71798,"opening_year":1974,"lat":-15.7939,"lng":-47.8822,"club":"National Team","league":"National"},
  {"name":"Estadio Pitu Gómez","country":"Colombia","city":"Barranquilla","capacity":46000,"opening_year":1989,"lat":10.9606,"lng":-74.8581,"club":"Junior de Barranquilla","league":"Categoría Primera A"}
];

const existing = JSON.parse(fs.readFileSync("scripts/massive-stadiums-data.json", "utf-8"));
const combined = [...existing, ...moreStadiums];
fs.writeFileSync("scripts/massive-stadiums-data.json", JSON.stringify(combined, null, 2));

console.log(`Extended to ${combined.length} stadiums`);

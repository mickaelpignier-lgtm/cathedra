export interface StadiumSeedTranslation {
  name: string;
  club: string;
  city: string;
  country: string;
  league: string;
  description: string;
  nearestAirport: string;
  publicTransport: string;
  fromAirport: string;
  bestTimeToVisit: string;
  whatToSee: string[];
  shopDescription: string;
  shopProducts: { name: string; priceFrom: number }[];
  galleryAlts: string[];
  heroAlt: string;
  insiderTip: string;
}

export interface StadiumSeed {
  slug: string;
  countryCode: string;
  lat: number;
  lng: number;
  capacity: number;
  yearOpened: number;
  currency: string;
  guidedTourPriceFrom: number;
  guidedTourUrl: string;
  matchTicketPriceFrom: number;
  matchTicketUrl: string;
  officialWebsite: string;
  shopUrl: string;
  airportDistanceKm: number;
  galleryCount: number;
  translations: {
    fr: StadiumSeedTranslation;
    en: StadiumSeedTranslation;
    it: StadiumSeedTranslation;
    zh: StadiumSeedTranslation;
  };
}

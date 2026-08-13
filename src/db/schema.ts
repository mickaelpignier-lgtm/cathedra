import {
  pgTable,
  text,
  integer,
  doublePrecision,
  jsonb,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export interface GalleryImage {
  src: string;
}

export interface ShopProduct {
  name: string;
  priceFrom: number;
}

export interface NearbyPlace {
  name: string;
  tier: 1 | 2 | 3;
  distanceLabel: string;
}

export interface TransitLine {
  label: string;
  color: string;
  network: string;
}

export interface Renovation {
  year: number;
  architect: string;
}

export const stadiums = pgTable("stadiums", {
  slug: text("slug").primaryKey(),
  countryCode: text("country_code").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  capacity: integer("capacity").notNull(),
  yearOpened: integer("year_opened").notNull(),
  currency: text("currency").notNull(),
  guidedTourPriceFrom: integer("guided_tour_price_from").notNull(),
  guidedTourUrl: text("guided_tour_url").notNull(),
  matchTicketPriceFrom: integer("match_ticket_price_from").notNull(),
  matchTicketUrl: text("match_ticket_url").notNull(),
  officialWebsite: text("official_website").notNull(),
  shopUrl: text("shop_url").notNull(),
  heroImageSrc: text("hero_image_src").notNull(),
  gallery: jsonb("gallery").$type<GalleryImage[]>().notNull(),
  airportDistanceKm: integer("airport_distance_km").notNull(),
  nearbyHotels: jsonb("nearby_hotels").$type<NearbyPlace[]>().notNull().default([]),
  nearbyAirbnbs: jsonb("nearby_airbnbs").$type<NearbyPlace[]>().notNull().default([]),
  nearbyRestaurants: jsonb("nearby_restaurants").$type<NearbyPlace[]>().notNull().default([]),
  transitLines: jsonb("transit_lines").$type<TransitLine[]>().notNull().default([]),
  initialArchitect: text("initial_architect").notNull().default(""),
  renovations: jsonb("renovations").$type<Renovation[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const stadiumTranslations = pgTable(
  "stadium_translations",
  {
    stadiumSlug: text("stadium_slug")
      .notNull()
      .references(() => stadiums.slug, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    name: text("name").notNull(),
    club: text("club").notNull(),
    city: text("city").notNull(),
    country: text("country").notNull(),
    league: text("league").notNull(),
    description: text("description").notNull(),
    nearestAirport: text("nearest_airport").notNull(),
    publicTransport: text("public_transport").notNull(),
    fromAirport: text("from_airport").notNull(),
    bestTimeToVisit: text("best_time_to_visit").notNull(),
    whatToSee: jsonb("what_to_see").$type<string[]>().notNull(),
    shopDescription: text("shop_description").notNull(),
    shopProducts: jsonb("shop_products").$type<ShopProduct[]>().notNull(),
    galleryAlts: jsonb("gallery_alts").$type<string[]>().notNull(),
    heroAlt: text("hero_alt").notNull(),
    insiderTip: text("insider_tip").notNull(),
  },
  (table) => [primaryKey({ columns: [table.stadiumSlug, table.locale] })]
);

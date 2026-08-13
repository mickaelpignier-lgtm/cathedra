import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import type { NearbyPlace } from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

interface NearbySet {
  slug: string;
  hotels: NearbyPlace[];
  airbnbs: NearbyPlace[];
  restaurants: NearbyPlace[];
}

const nearby: NearbySet[] = [
  {
    slug: "camp-nou",
    hotels: [
      { name: "Hotel Les Corts Barcelona", tier: 2, distanceLabel: "400 m" },
      { name: "Hotel Fira Palace", tier: 3, distanceLabel: "900 m" },
      { name: "Ilunion Bel Art", tier: 1, distanceLabel: "1,1 km" },
    ],
    airbnbs: [
      { name: "Appartement Les Corts, vue stade", tier: 2, distanceLabel: "350 m" },
      { name: "Studio Sants proche métro L3", tier: 1, distanceLabel: "1,3 km" },
      { name: "Loft design Sarrià-Sant Gervasi", tier: 3, distanceLabel: "1,8 km" },
    ],
    restaurants: [
      { name: "Bar Tomás (patates braves)", tier: 1, distanceLabel: "700 m" },
      { name: "Tapas 24 Les Corts", tier: 2, distanceLabel: "600 m" },
      { name: "Via Veneto", tier: 3, distanceLabel: "1,5 km" },
    ],
  },
  {
    slug: "old-trafford",
    hotels: [
      { name: "Old Trafford Lodge", tier: 2, distanceLabel: "150 m" },
      { name: "Hilton Manchester Deansgate", tier: 3, distanceLabel: "3,5 km" },
      { name: "Trafford Hotel Manchester", tier: 1, distanceLabel: "900 m" },
    ],
    airbnbs: [
      { name: "Maison mitoyenne Old Trafford", tier: 1, distanceLabel: "600 m" },
      { name: "Appartement Salford Quays", tier: 2, distanceLabel: "2,2 km" },
      { name: "Loft Deansgate skyline", tier: 3, distanceLabel: "3,8 km" },
    ],
    restaurants: [
      { name: "Hearth (Old Trafford)", tier: 1, distanceLabel: "500 m" },
      { name: "San Carlo Fiorentina", tier: 2, distanceLabel: "3,6 km" },
      { name: "The French by Adam Reid", tier: 3, distanceLabel: "4 km" },
    ],
  },
  {
    slug: "santiago-bernabeu",
    hotels: [
      { name: "Hotel Santo Mauro", tier: 3, distanceLabel: "1,4 km" },
      { name: "Eurostars Madrid Tower", tier: 2, distanceLabel: "1,1 km" },
      { name: "Hostal Chamartín", tier: 1, distanceLabel: "800 m" },
    ],
    airbnbs: [
      { name: "Appartement Chamberí rénové", tier: 2, distanceLabel: "1,3 km" },
      { name: "Studio Cuatro Caminos", tier: 1, distanceLabel: "1,6 km" },
      { name: "Penthouse Paseo de la Castellana", tier: 3, distanceLabel: "500 m" },
    ],
    restaurants: [
      { name: "Casa Mono Bernabéu", tier: 1, distanceLabel: "400 m" },
      { name: "El Pimiento Verde", tier: 2, distanceLabel: "700 m" },
      { name: "Ramón Freixa Madrid", tier: 3, distanceLabel: "2 km" },
    ],
  },
  {
    slug: "san-siro",
    hotels: [
      { name: "Melià Milano", tier: 3, distanceLabel: "3,4 km" },
      { name: "Hotel San Siro", tier: 2, distanceLabel: "600 m" },
      { name: "Ostello Bello Sempione", tier: 1, distanceLabel: "4,1 km" },
    ],
    airbnbs: [
      { name: "Appartement De Angeli design", tier: 2, distanceLabel: "1,2 km" },
      { name: "Studio San Siro rénové", tier: 1, distanceLabel: "500 m" },
      { name: "Loft Portello vue stade", tier: 3, distanceLabel: "1,5 km" },
    ],
    restaurants: [
      { name: "Il Baracchino", tier: 1, distanceLabel: "300 m" },
      { name: "Trattoria Ticinese", tier: 2, distanceLabel: "2,3 km" },
      { name: "Cracco San Siro", tier: 3, distanceLabel: "3 km" },
    ],
  },
  {
    slug: "allianz-arena",
    hotels: [
      { name: "Hotel Nala Fröttmaning", tier: 2, distanceLabel: "700 m" },
      { name: "Marriott München", tier: 3, distanceLabel: "6 km" },
      { name: "Ibis München Nord", tier: 1, distanceLabel: "3 km" },
    ],
    airbnbs: [
      { name: "Appartement Schwabing rénové", tier: 3, distanceLabel: "5 km" },
      { name: "Studio Freimann proche U-Bahn", tier: 1, distanceLabel: "2,5 km" },
      { name: "Maison Milbertshofen", tier: 2, distanceLabel: "3,2 km" },
    ],
    restaurants: [
      { name: "Bräustüberl Fröttmaning", tier: 1, distanceLabel: "800 m" },
      { name: "Käfer Schänke", tier: 3, distanceLabel: "6,5 km" },
      { name: "Little London Fröttmaning", tier: 2, distanceLabel: "900 m" },
    ],
  },
  {
    slug: "signal-iduna-park",
    hotels: [
      { name: "Hotel Esplanade Dortmund", tier: 2, distanceLabel: "1,5 km" },
      { name: "Radisson Blu Dortmund", tier: 3, distanceLabel: "3,8 km" },
      { name: "B&B Hotel Dortmund-West", tier: 1, distanceLabel: "2 km" },
    ],
    airbnbs: [
      { name: "Maison Kreuzviertel", tier: 2, distanceLabel: "3 km" },
      { name: "Studio Westfalenpark", tier: 1, distanceLabel: "1,8 km" },
      { name: "Loft Innenstadt-West", tier: 3, distanceLabel: "3,5 km" },
    ],
    restaurants: [
      { name: "Wenkers am Markt", tier: 2, distanceLabel: "3,7 km" },
      { name: "Signal Fanhaus BVB", tier: 1, distanceLabel: "400 m" },
      { name: "Der Landgraf", tier: 3, distanceLabel: "4 km" },
    ],
  },
  {
    slug: "parc-des-princes",
    hotels: [
      { name: "Hotel Molitor Paris", tier: 3, distanceLabel: "600 m" },
      { name: "Best Western Paris Porte de Versailles", tier: 2, distanceLabel: "1,8 km" },
      { name: "Ibis Paris Porte de Sèvres", tier: 1, distanceLabel: "1,5 km" },
    ],
    airbnbs: [
      { name: "Appartement Auteuil haussmannien", tier: 3, distanceLabel: "700 m" },
      { name: "Studio Porte de Saint-Cloud", tier: 1, distanceLabel: "500 m" },
      { name: "Duplex Boulogne-Billancourt", tier: 2, distanceLabel: "1,3 km" },
    ],
    restaurants: [
      { name: "Le Petit Retro Auteuil", tier: 2, distanceLabel: "800 m" },
      { name: "Bistrot Parc des Princes", tier: 1, distanceLabel: "300 m" },
      { name: "La Table du Boulogne", tier: 3, distanceLabel: "1,6 km" },
    ],
  },
  {
    slug: "anfield",
    hotels: [
      { name: "Titanic Hotel Liverpool", tier: 3, distanceLabel: "3,2 km" },
      { name: "Hope Street Hotel", tier: 2, distanceLabel: "3,5 km" },
      { name: "Anfield Hotel", tier: 1, distanceLabel: "200 m" },
    ],
    airbnbs: [
      { name: "Maison mitoyenne Anfield", tier: 1, distanceLabel: "400 m" },
      { name: "Appartement Baltic Triangle", tier: 2, distanceLabel: "4 km" },
      { name: "Penthouse Albert Dock", tier: 3, distanceLabel: "4,5 km" },
    ],
    restaurants: [
      { name: "The Sandon (pub des supporters)", tier: 1, distanceLabel: "150 m" },
      { name: "The Root Sessions", tier: 2, distanceLabel: "3,8 km" },
      { name: "Panoramic 34", tier: 3, distanceLabel: "4,2 km" },
    ],
  },
  {
    slug: "emirates-stadium",
    hotels: [
      { name: "Radisson Blu Edwardian Islington", tier: 3, distanceLabel: "1,5 km" },
      { name: "Premier Inn London Angel Islington", tier: 2, distanceLabel: "1,8 km" },
      { name: "Arsenal Lodge", tier: 1, distanceLabel: "500 m" },
    ],
    airbnbs: [
      { name: "Maison de ville Highbury", tier: 3, distanceLabel: "600 m" },
      { name: "Appartement Holloway Road", tier: 1, distanceLabel: "700 m" },
      { name: "Studio Finsbury Park", tier: 2, distanceLabel: "1,4 km" },
    ],
    restaurants: [
      { name: "The Highbury pub", tier: 1, distanceLabel: "400 m" },
      { name: "Ottolenghi Islington", tier: 2, distanceLabel: "2 km" },
      { name: "Ottolenghi's NOPI", tier: 3, distanceLabel: "3 km" },
    ],
  },
  {
    slug: "etihad-stadium",
    hotels: [
      { name: "Etihad Campus Hotel", tier: 1, distanceLabel: "300 m" },
      { name: "Hotel Football Manchester", tier: 2, distanceLabel: "5 km" },
      { name: "Kimpton Clocktower", tier: 3, distanceLabel: "4,5 km" },
    ],
    airbnbs: [
      { name: "Appartement Ancoats industriel", tier: 2, distanceLabel: "3,5 km" },
      { name: "Studio East Manchester", tier: 1, distanceLabel: "1,5 km" },
      { name: "Loft Northern Quarter", tier: 3, distanceLabel: "4 km" },
    ],
    restaurants: [
      { name: "Clock Café Etihad Campus", tier: 1, distanceLabel: "400 m" },
      { name: "Cutting Room Ancoats", tier: 2, distanceLabel: "3,2 km" },
      { name: "Mana Manchester", tier: 3, distanceLabel: "4,3 km" },
    ],
  },
  {
    slug: "tottenham-hotspur-stadium",
    hotels: [
      { name: "Lanes Hotel Tottenham", tier: 1, distanceLabel: "500 m" },
      { name: "Premier Inn Tottenham", tier: 2, distanceLabel: "1,2 km" },
      { name: "The Cumberland Hotel", tier: 3, distanceLabel: "9 km" },
    ],
    airbnbs: [
      { name: "Maison mitoyenne White Hart Lane", tier: 1, distanceLabel: "400 m" },
      { name: "Appartement Bruce Grove", tier: 2, distanceLabel: "1,5 km" },
      { name: "Duplex Wood Green", tier: 3, distanceLabel: "3 km" },
    ],
    restaurants: [
      { name: "Beer House Tottenham", tier: 1, distanceLabel: "600 m" },
      { name: "Antepliler Tottenham", tier: 2, distanceLabel: "1,3 km" },
      { name: "Yardbird Tottenham", tier: 2, distanceLabel: "500 m" },
    ],
  },
  {
    slug: "stamford-bridge",
    hotels: [
      { name: "Chelsea Harbour Hotel", tier: 3, distanceLabel: "2,5 km" },
      { name: "Millennium & Copthorne Chelsea", tier: 2, distanceLabel: "200 m" },
      { name: "Premier Inn Hammersmith", tier: 1, distanceLabel: "3 km" },
    ],
    airbnbs: [
      { name: "Maison de ville Fulham", tier: 3, distanceLabel: "600 m" },
      { name: "Appartement Earl's Court", tier: 2, distanceLabel: "1,3 km" },
      { name: "Studio Parsons Green", tier: 1, distanceLabel: "1,5 km" },
    ],
    restaurants: [
      { name: "The Butcher's Hook", tier: 1, distanceLabel: "300 m" },
      { name: "Bluebird Chelsea", tier: 3, distanceLabel: "1,8 km" },
      { name: "Aubaine Kings Road", tier: 2, distanceLabel: "1,4 km" },
    ],
  },
  {
    slug: "san-mames",
    hotels: [
      { name: "Miró Hotel Bilbao", tier: 3, distanceLabel: "1,5 km" },
      { name: "Hotel Ibaigane", tier: 2, distanceLabel: "300 m" },
      { name: "Pensión Ladero", tier: 1, distanceLabel: "1,2 km" },
    ],
    airbnbs: [
      { name: "Appartement Deusto vue Nervion", tier: 2, distanceLabel: "600 m" },
      { name: "Studio Indautxu", tier: 1, distanceLabel: "1,4 km" },
      { name: "Loft Casco Viejo", tier: 3, distanceLabel: "2,5 km" },
    ],
    restaurants: [
      { name: "Café Bar Bilbao", tier: 1, distanceLabel: "1,1 km" },
      { name: "Sorginzulo San Mamés", tier: 2, distanceLabel: "400 m" },
      { name: "Nerua Guggenheim Bilbao", tier: 3, distanceLabel: "2,3 km" },
    ],
  },
  {
    slug: "wanda-metropolitano",
    hotels: [
      { name: "Holiday Inn Madrid Este", tier: 2, distanceLabel: "1,5 km" },
      { name: "Eurostars IT Aeropuerto", tier: 3, distanceLabel: "5 km" },
      { name: "Ibis Madrid Aeropuerto", tier: 1, distanceLabel: "4 km" },
    ],
    airbnbs: [
      { name: "Appartement San Blas rénové", tier: 1, distanceLabel: "2 km" },
      { name: "Studio Canillejas", tier: 2, distanceLabel: "1,8 km" },
      { name: "Duplex Ciudad Lineal", tier: 3, distanceLabel: "3 km" },
    ],
    restaurants: [
      { name: "Bar Metropolitano", tier: 1, distanceLabel: "500 m" },
      { name: "Asador San Blas", tier: 2, distanceLabel: "2,2 km" },
      { name: "El Barril de Salamanca", tier: 3, distanceLabel: "9 km" },
    ],
  },
  {
    slug: "mestalla",
    hotels: [
      { name: "Hotel Ilunion Aqua 3", tier: 2, distanceLabel: "700 m" },
      { name: "Meliá Valencia", tier: 3, distanceLabel: "2,3 km" },
      { name: "Home Youth Hostel Valencia", tier: 1, distanceLabel: "2 km" },
    ],
    airbnbs: [
      { name: "Appartement Ciutat Vella", tier: 2, distanceLabel: "1,9 km" },
      { name: "Studio Camins al Grau", tier: 1, distanceLabel: "500 m" },
      { name: "Loft El Carmen", tier: 3, distanceLabel: "2,4 km" },
    ],
    restaurants: [
      { name: "Bar Mestalla", tier: 1, distanceLabel: "300 m" },
      { name: "Casa Montaña", tier: 2, distanceLabel: "3 km" },
      { name: "Ricard Camarena Restaurant", tier: 3, distanceLabel: "3,5 km" },
    ],
  },
  {
    slug: "estadio-da-luz",
    hotels: [
      { name: "Hotel Lutecia Smart Design", tier: 2, distanceLabel: "600 m" },
      { name: "Tivoli Oriente Lisboa", tier: 3, distanceLabel: "4,5 km" },
      { name: "Yes! Lisbon Hostel Benfica", tier: 1, distanceLabel: "500 m" },
    ],
    airbnbs: [
      { name: "Appartement Benfica rénové", tier: 1, distanceLabel: "400 m" },
      { name: "Studio Colégio Militar", tier: 2, distanceLabel: "800 m" },
      { name: "Duplex Amoreiras vue ville", tier: 3, distanceLabel: "3 km" },
    ],
    restaurants: [
      { name: "Taberna da Luz", tier: 1, distanceLabel: "300 m" },
      { name: "Cervejaria Ramiro", tier: 3, distanceLabel: "4 km" },
      { name: "O Bacalhoeiro Benfica", tier: 2, distanceLabel: "700 m" },
    ],
  },
  {
    slug: "estadio-jose-alvalade",
    hotels: [
      { name: "Hotel Alvalade Lisboa", tier: 1, distanceLabel: "500 m" },
      { name: "EPIC Sana Lisboa", tier: 3, distanceLabel: "5 km" },
      { name: "Ibis Lisboa José Malhoa", tier: 2, distanceLabel: "2 km" },
    ],
    airbnbs: [
      { name: "Appartement Campo Grande", tier: 2, distanceLabel: "500 m" },
      { name: "Studio Cidade Universitária", tier: 1, distanceLabel: "600 m" },
      { name: "Duplex Praça de Espanha", tier: 3, distanceLabel: "2,5 km" },
    ],
    restaurants: [
      { name: "Cervejaria Alvalade", tier: 1, distanceLabel: "400 m" },
      { name: "Solar dos Presuntos", tier: 3, distanceLabel: "5 km" },
      { name: "Taberna Sporting", tier: 2, distanceLabel: "300 m" },
    ],
  },
  {
    slug: "allianz-stadium-turin",
    hotels: [
      { name: "NH Torino Centro", tier: 2, distanceLabel: "6 km" },
      { name: "Turin Palace Hotel", tier: 3, distanceLabel: "7 km" },
      { name: "B&B Hotel Torino Juventus Stadium", tier: 1, distanceLabel: "400 m" },
    ],
    airbnbs: [
      { name: "Appartement Continassa", tier: 1, distanceLabel: "500 m" },
      { name: "Studio Vanchiglia", tier: 2, distanceLabel: "6,5 km" },
      { name: "Loft San Salvario", tier: 3, distanceLabel: "7,5 km" },
    ],
    restaurants: [
      { name: "J Hotel Bistrot", tier: 2, distanceLabel: "300 m" },
      { name: "Del Cambio Torino", tier: 3, distanceLabel: "7 km" },
      { name: "Pizzeria Continassa", tier: 1, distanceLabel: "600 m" },
    ],
  },
  {
    slug: "stadio-olimpico",
    hotels: [
      { name: "Farnese Roma Hotel", tier: 2, distanceLabel: "1,5 km" },
      { name: "Rome Cavalieri Waldorf Astoria", tier: 3, distanceLabel: "3 km" },
      { name: "The Beehive Roma", tier: 1, distanceLabel: "6 km" },
    ],
    airbnbs: [
      { name: "Appartement Flaminio", tier: 2, distanceLabel: "1,2 km" },
      { name: "Studio Prati", tier: 1, distanceLabel: "2,5 km" },
      { name: "Penthouse Parioli vue Tibre", tier: 3, distanceLabel: "1,8 km" },
    ],
    restaurants: [
      { name: "Osteria Flaminio", tier: 2, distanceLabel: "1,3 km" },
      { name: "La Pergola Roma", tier: 3, distanceLabel: "3 km" },
      { name: "Pizzeria Olimpico", tier: 1, distanceLabel: "600 m" },
    ],
  },
  {
    slug: "la-bombonera",
    hotels: [
      { name: "Mundo Boca Hotel", tier: 1, distanceLabel: "300 m" },
      { name: "Hotel NH Buenos Aires Latino", tier: 2, distanceLabel: "3 km" },
      { name: "Faena Hotel Buenos Aires", tier: 3, distanceLabel: "3,5 km" },
    ],
    airbnbs: [
      { name: "Appartement San Telmo colonial", tier: 2, distanceLabel: "1,5 km" },
      { name: "Studio La Boca coloré", tier: 1, distanceLabel: "500 m" },
      { name: "Loft Puerto Madero vue port", tier: 3, distanceLabel: "3,5 km" },
    ],
    restaurants: [
      { name: "El Obrero (La Boca)", tier: 1, distanceLabel: "400 m" },
      { name: "Parrilla Caminito", tier: 2, distanceLabel: "300 m" },
      { name: "Aramburu Buenos Aires", tier: 3, distanceLabel: "4 km" },
    ],
  },
  {
    slug: "estadio-monumental",
    hotels: [
      { name: "Hotel Monumental River", tier: 1, distanceLabel: "500 m" },
      { name: "Palermo Alto Hotel Boutique", tier: 2, distanceLabel: "3 km" },
      { name: "Alvear Palace Hotel", tier: 3, distanceLabel: "5 km" },
    ],
    airbnbs: [
      { name: "Appartement Belgrano vue fleuve", tier: 2, distanceLabel: "1 km" },
      { name: "Studio Núñez", tier: 1, distanceLabel: "600 m" },
      { name: "Penthouse Puerto Madero", tier: 3, distanceLabel: "6 km" },
    ],
    restaurants: [
      { name: "Parrilla Núñez", tier: 1, distanceLabel: "500 m" },
      { name: "Sucre Buenos Aires", tier: 3, distanceLabel: "2,5 km" },
      { name: "La Bianca Belgrano", tier: 2, distanceLabel: "1,2 km" },
    ],
  },
  {
    slug: "maracana",
    hotels: [
      { name: "Hotel San Marco Maracanã", tier: 1, distanceLabel: "600 m" },
      { name: "Novotro Rio Maracanã", tier: 2, distanceLabel: "500 m" },
      { name: "Belmond Copacabana Palace", tier: 3, distanceLabel: "12 km" },
    ],
    airbnbs: [
      { name: "Appartement Tijuca proche métro", tier: 1, distanceLabel: "1,2 km" },
      { name: "Studio Vila Isabel", tier: 2, distanceLabel: "2 km" },
      { name: "Penthouse Copacabana vue mer", tier: 3, distanceLabel: "12,5 km" },
    ],
    restaurants: [
      { name: "Bar do Zeca (Maracanã)", tier: 1, distanceLabel: "500 m" },
      { name: "Aprazível Santa Teresa", tier: 3, distanceLabel: "8 km" },
      { name: "Braseiro da Gávea", tier: 2, distanceLabel: "10 km" },
    ],
  },
  {
    slug: "morumbi",
    hotels: [
      { name: "Grand Hyatt São Paulo", tier: 3, distanceLabel: "3 km" },
      { name: "Hotel Blue Tree Morumbi", tier: 2, distanceLabel: "1,5 km" },
      { name: "Ibis Budget Morumbi", tier: 1, distanceLabel: "2 km" },
    ],
    airbnbs: [
      { name: "Appartement Morumbi vue skyline", tier: 3, distanceLabel: "1 km" },
      { name: "Studio Butantã", tier: 1, distanceLabel: "1,8 km" },
      { name: "Duplex Vila Sônia", tier: 2, distanceLabel: "2,3 km" },
    ],
    restaurants: [
      { name: "Boteco Morumbi", tier: 1, distanceLabel: "700 m" },
      { name: "Mercearia São Pedro", tier: 2, distanceLabel: "2 km" },
      { name: "D.O.M. São Paulo", tier: 3, distanceLabel: "9 km" },
    ],
  },
  {
    slug: "celtic-park",
    hotels: [
      { name: "Celtic Way Hotel", tier: 1, distanceLabel: "400 m" },
      { name: "DoubleTree Glasgow Central", tier: 2, distanceLabel: "3 km" },
      { name: "Kimpton Blythswood Square", tier: 3, distanceLabel: "3,5 km" },
    ],
    airbnbs: [
      { name: "Maison mitoyenne Dennistoun", tier: 1, distanceLabel: "1 km" },
      { name: "Appartement Merchant City", tier: 2, distanceLabel: "2,8 km" },
      { name: "Loft Finnieston", tier: 3, distanceLabel: "4,5 km" },
    ],
    restaurants: [
      { name: "The Brake (Celtic Park)", tier: 1, distanceLabel: "300 m" },
      { name: "Two Fat Ladies Glasgow", tier: 3, distanceLabel: "3,6 km" },
      { name: "Dennistoun Bakery Café", tier: 2, distanceLabel: "900 m" },
    ],
  },
  {
    slug: "ibrox-stadium",
    hotels: [
      { name: "Ibrox Hotel", tier: 1, distanceLabel: "350 m" },
      { name: "Radisson Red Glasgow", tier: 2, distanceLabel: "2,8 km" },
      { name: "Grand Central Hotel Glasgow", tier: 3, distanceLabel: "3,2 km" },
    ],
    airbnbs: [
      { name: "Maison mitoyenne Govan", tier: 1, distanceLabel: "700 m" },
      { name: "Appartement Finnieston", tier: 2, distanceLabel: "2,5 km" },
      { name: "Loft Merchant City", tier: 3, distanceLabel: "3,3 km" },
    ],
    restaurants: [
      { name: "The Louden Tavern", tier: 1, distanceLabel: "300 m" },
      { name: "Gloriosa Glasgow", tier: 3, distanceLabel: "3 km" },
      { name: "Café Source Govan", tier: 2, distanceLabel: "800 m" },
    ],
  },
  {
    slug: "johan-cruyff-arena",
    hotels: [
      { name: "Hotel Amsterdam ArenA Boulevard", tier: 2, distanceLabel: "400 m" },
      { name: "Mövenpick Amsterdam City Centre", tier: 3, distanceLabel: "8 km" },
      { name: "ClinkNOORD Hostel", tier: 1, distanceLabel: "9 km" },
    ],
    airbnbs: [
      { name: "Appartement Bijlmer moderne", tier: 1, distanceLabel: "800 m" },
      { name: "Studio Amstel vue rivière", tier: 2, distanceLabel: "3,5 km" },
      { name: "Loft De Pijp", tier: 3, distanceLabel: "8,5 km" },
    ],
    restaurants: [
      { name: "Bijlmer Bites ArenA Boulevard", tier: 1, distanceLabel: "400 m" },
      { name: "Restaurant As", tier: 3, distanceLabel: "6 km" },
      { name: "Café De Amsterdammer", tier: 2, distanceLabel: "3 km" },
    ],
  },
];

async function main() {
  for (const item of nearby) {
    await db
      .update(schema.stadiums)
      .set({
        nearbyHotels: item.hotels,
        nearbyAirbnbs: item.airbnbs,
        nearbyRestaurants: item.restaurants,
      })
      .where(eq(schema.stadiums.slug, item.slug));
    console.log(`✓ ${item.slug}`);
  }
  console.log(`Done. ${nearby.length} stadiums updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

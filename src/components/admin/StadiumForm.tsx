"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createStadium, updateStadium, type StadiumFormData, type TranslationFormData } from "@/app/admin/actions";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { ImageUploadField } from "./ImageUploadField";
import { ListField } from "./ListField";
import { KeyValueListField } from "./KeyValueListField";

const emptyTranslation: TranslationFormData = {
  name: "",
  club: "",
  city: "",
  country: "",
  league: "",
  description: "",
  nearestAirport: "",
  publicTransport: "",
  fromAirport: "",
  bestTimeToVisit: "",
  whatToSee: [],
  shopDescription: "",
  shopProducts: [],
  galleryAlts: [],
  heroAlt: "",
  insiderTip: "",
  recordMatchLabel: "",
  owner: "",
};

function emptyForm(): StadiumFormData {
  return {
    slug: "",
    countryCode: "",
    lat: 0,
    lng: 0,
    capacity: 0,
    yearOpened: new Date().getFullYear(),
    currency: "EUR",
    guidedTourPriceFrom: 0,
    guidedTourUrl: "",
    matchTicketPriceFrom: 0,
    matchTicketUrl: "",
    officialWebsite: "",
    shopUrl: "",
    heroImageSrc: "",
    gallery: [],
    airportDistanceKm: 0,
    nearbyHotels: [],
    nearbyAirbnbs: [],
    nearbyRestaurants: [],
    transitLines: [],
    initialArchitect: "",
    renovations: [],
    recordAttendance: null,
    clubLogoUrl: "",
    clubColorPrimary: "",
    clubColorSecondary: "",
    airportName: "",
    airportLogoUrl: "",
    metroLineNames: [],
    metroLineColors: [],
    translations: {
      fr: { ...emptyTranslation },
      en: { ...emptyTranslation },
      it: { ...emptyTranslation },
      zh: { ...emptyTranslation },
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded border border-white/10 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-wide text-white/60">{label}</label>
      {children}
    </div>
  );
}

function clampTier(items: { tier: number }[]): { name: string; tier: 1 | 2 | 3; distanceLabel: string }[] {
  return items.map((i) => ({
    ...(i as { name: string; distanceLabel: string; tier: number }),
    tier: (Math.min(3, Math.max(1, Math.round(i.tier) || 1)) as 1 | 2 | 3),
  }));
}

const inputClass =
  "rounded border border-white/15 bg-white/5 px-3 py-1.5 text-sm outline-none focus:border-white/40";

export function StadiumForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: StadiumFormData;
}) {
  const router = useRouter();
  const [data, setData] = useState<StadiumFormData>(initial ?? emptyForm());
  const [locale, setLocale] = useState<Locale>("fr");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function set<K extends keyof StadiumFormData>(key: K, value: StadiumFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function setTranslation<K extends keyof TranslationFormData>(
    loc: Locale,
    key: K,
    value: TranslationFormData[K]
  ) {
    setData((d) => ({
      ...d,
      translations: {
        ...d.translations,
        [loc]: { ...d.translations[loc], [key]: value },
      },
    }));
  }

  function setGallery(gallery: { src: string }[]) {
    setData((d) => {
      const translations = { ...d.translations };
      for (const loc of locales) {
        const alts = translations[loc].galleryAlts;
        const nextAlts =
          gallery.length > alts.length
            ? [...alts, ...Array(gallery.length - alts.length).fill("")]
            : alts.slice(0, gallery.length);
        translations[loc] = { ...translations[loc], galleryAlts: nextAlts };
      }
      return { ...d, gallery, translations };
    });
  }

  function setMetroLine(index: number, field: "label" | "color", value: string) {
    setData((d) => {
      const names = [...d.metroLineNames];
      const colors = [...d.metroLineColors];
      if (field === "label") names[index] = value;
      colors[index] = { ...colors[index], [field]: value, label: field === "label" ? value : colors[index]?.label ?? "" };
      return { ...d, metroLineNames: names, metroLineColors: colors };
    });
  }

  function addMetroLine() {
    setData((d) => ({
      ...d,
      metroLineNames: [...d.metroLineNames, ""],
      metroLineColors: [...d.metroLineColors, { label: "", color: "#888888" }],
    }));
  }

  function removeMetroLine(index: number) {
    setData((d) => ({
      ...d,
      metroLineNames: d.metroLineNames.filter((_, i) => i !== index),
      metroLineColors: d.metroLineColors.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        if (mode === "create") {
          await createStadium(data);
        } else {
          await updateStadium(initial!.slug, data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    });
  }

  const t = data.translations[locale];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-16">
      {error && (
        <div className="rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Section title="Identité">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Slug">
            <input
              value={data.slug}
              disabled={mode === "edit"}
              onChange={(e) => set("slug", e.target.value.toLowerCase().trim())}
              className={`${inputClass} disabled:opacity-50`}
              placeholder="ex. etihad-stadium"
            />
          </Field>
          <Field label="Code pays (ISO)">
            <input
              value={data.countryCode}
              onChange={(e) => set("countryCode", e.target.value.toUpperCase())}
              className={inputClass}
              placeholder="GB"
            />
          </Field>
          <Field label="Capacité">
            <input
              type="number"
              value={data.capacity}
              onChange={(e) => set("capacity", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Latitude">
            <input
              type="number"
              step="any"
              value={data.lat}
              onChange={(e) => set("lat", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Longitude">
            <input
              type="number"
              step="any"
              value={data.lng}
              onChange={(e) => set("lng", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Année d'ouverture">
            <input
              type="number"
              value={data.yearOpened}
              onChange={(e) => set("yearOpened", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Photos">
        <div className="grid grid-cols-2 gap-6">
          <ImageUploadField
            label="Photo principale (hero)"
            value={data.heroImageSrc}
            onChange={(url) => set("heroImageSrc", url)}
            pathPrefix={`stadiums/${data.slug || "new"}`}
          />
        </div>
        <Field label="Galerie">
          <div className="flex flex-col gap-3">
            {data.gallery.map((img, i) => (
              <div key={i} className="flex items-center gap-3">
                <ImageUploadField
                  label={`Image ${i + 1}`}
                  value={img.src}
                  onChange={(url) => {
                    const next = [...data.gallery];
                    next[i] = { src: url };
                    setGallery(next);
                  }}
                  pathPrefix={`stadiums/${data.slug || "new"}`}
                />
                <button
                  type="button"
                  onClick={() => setGallery(data.gallery.filter((_, idx) => idx !== i))}
                  className="rounded border border-white/15 px-2 py-1 text-white/50 hover:text-red-400"
                >
                  retirer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setGallery([...data.gallery, { src: "" }])}
              className="self-start text-xs text-white/50 hover:text-white/80"
            >
              + ajouter une image
            </button>
          </div>
        </Field>
      </Section>

      <Section title="Infos pratiques">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Nom de l'aéroport">
            <input
              value={data.airportName}
              onChange={(e) => set("airportName", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Distance aéroport (km)">
            <input
              type="number"
              value={data.airportDistanceKm}
              onChange={(e) => set("airportDistanceKm", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Architecte initial">
            <input
              value={data.initialArchitect}
              onChange={(e) => set("initialArchitect", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Affluence record">
            <input
              type="number"
              value={data.recordAttendance ?? ""}
              onChange={(e) =>
                set("recordAttendance", e.target.value ? Number(e.target.value) : null)
              }
              className={inputClass}
            />
          </Field>
        </div>
        <ImageUploadField
          label="Logo de l'aéroport"
          value={data.airportLogoUrl}
          onChange={(url) => set("airportLogoUrl", url)}
          pathPrefix={`stadiums/${data.slug || "new"}`}
        />
        <Field label="Lignes de métro">
          <div className="flex flex-col gap-2">
            {data.metroLineNames.map((name, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={name}
                  placeholder="Nom de la ligne"
                  onChange={(e) => setMetroLine(i, "label", e.target.value)}
                  className={`${inputClass} flex-1`}
                />
                <input
                  type="color"
                  value={data.metroLineColors[i]?.color ?? "#888888"}
                  onChange={(e) => setMetroLine(i, "color", e.target.value)}
                  className="h-8 w-10 rounded border border-white/15 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeMetroLine(i)}
                  className="rounded border border-white/15 px-2 text-white/50 hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMetroLine}
              className="self-start text-xs text-white/50 hover:text-white/80"
            >
              + ajouter une ligne
            </button>
          </div>
        </Field>
        <KeyValueListField
          label="Transports (lignes bus/tram/train)"
          items={data.transitLines}
          fields={[
            { key: "label", label: "Ligne" },
            { key: "network", label: "Réseau" },
            { key: "color", label: "#Couleur", width: "90px" },
          ]}
          emptyItem={{ label: "", color: "#888888", network: "" }}
          onChange={(v) => set("transitLines", v)}
        />
      </Section>

      <Section title="Club & billetterie">
        <div className="grid grid-cols-2 gap-6">
          <ImageUploadField
            label="Logo du club"
            value={data.clubLogoUrl}
            onChange={(url) => set("clubLogoUrl", url)}
            pathPrefix={`stadiums/${data.slug || "new"}`}
          />
          <div className="flex gap-4">
            <Field label="Couleur primaire">
              <input
                type="color"
                value={data.clubColorPrimary || "#888888"}
                onChange={(e) => set("clubColorPrimary", e.target.value)}
                className="h-9 w-14 rounded border border-white/15 bg-transparent"
              />
            </Field>
            <Field label="Couleur secondaire">
              <input
                type="color"
                value={data.clubColorSecondary || "#888888"}
                onChange={(e) => set("clubColorSecondary", e.target.value)}
                className="h-9 w-14 rounded border border-white/15 bg-transparent"
              />
            </Field>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Devise">
            <input
              value={data.currency}
              onChange={(e) => set("currency", e.target.value.toUpperCase())}
              className={inputClass}
            />
          </Field>
          <Field label="Prix visite guidée à partir de">
            <input
              type="number"
              value={data.guidedTourPriceFrom}
              onChange={(e) => set("guidedTourPriceFrom", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Prix billet match à partir de">
            <input
              type="number"
              value={data.matchTicketPriceFrom}
              onChange={(e) => set("matchTicketPriceFrom", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="URL visite guidée">
            <input
              value={data.guidedTourUrl}
              onChange={(e) => set("guidedTourUrl", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="URL billetterie">
            <input
              value={data.matchTicketUrl}
              onChange={(e) => set("matchTicketUrl", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Site officiel">
            <input
              value={data.officialWebsite}
              onChange={(e) => set("officialWebsite", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="URL boutique">
            <input
              value={data.shopUrl}
              onChange={(e) => set("shopUrl", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Autour du stade">
        <KeyValueListField
          label="Hôtels à proximité"
          items={data.nearbyHotels}
          fields={[
            { key: "name", label: "Nom" },
            { key: "distanceLabel", label: "Distance" },
            { key: "tier", label: "Gamme (1-3)", type: "number", width: "90px" },
          ]}
          emptyItem={{ name: "", tier: 1, distanceLabel: "" }}
          onChange={(v) => set("nearbyHotels", clampTier(v))}
        />
        <KeyValueListField
          label="Airbnb à proximité"
          items={data.nearbyAirbnbs}
          fields={[
            { key: "name", label: "Nom" },
            { key: "distanceLabel", label: "Distance" },
            { key: "tier", label: "Gamme (1-3)", type: "number", width: "90px" },
          ]}
          emptyItem={{ name: "", tier: 1, distanceLabel: "" }}
          onChange={(v) => set("nearbyAirbnbs", clampTier(v))}
        />
        <KeyValueListField
          label="Restaurants à proximité"
          items={data.nearbyRestaurants}
          fields={[
            { key: "name", label: "Nom" },
            { key: "distanceLabel", label: "Distance" },
            { key: "tier", label: "Gamme (1-3)", type: "number", width: "90px" },
          ]}
          emptyItem={{ name: "", tier: 1, distanceLabel: "" }}
          onChange={(v) => set("nearbyRestaurants", clampTier(v))}
        />
        <KeyValueListField
          label="Rénovations"
          items={data.renovations}
          fields={[
            { key: "year", label: "Année", type: "number", width: "100px" },
            { key: "architect", label: "Architecte" },
          ]}
          emptyItem={{ year: new Date().getFullYear(), architect: "" }}
          onChange={(v) => set("renovations", v)}
        />
      </Section>

      <Section title="Traductions">
        <div className="flex gap-2 border-b border-white/10 pb-3">
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setLocale(loc)}
              className={`rounded px-3 py-1.5 text-xs uppercase tracking-wide ${
                locale === loc ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom">
            <input
              value={t.name}
              onChange={(e) => setTranslation(locale, "name", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Club">
            <input
              value={t.club}
              onChange={(e) => setTranslation(locale, "club", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Ville">
            <input
              value={t.city}
              onChange={(e) => setTranslation(locale, "city", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Pays">
            <input
              value={t.country}
              onChange={(e) => setTranslation(locale, "country", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Championnat / ligue">
            <input
              value={t.league}
              onChange={(e) => setTranslation(locale, "league", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Propriétaire">
            <input
              value={t.owner}
              onChange={(e) => setTranslation(locale, "owner", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            value={t.description}
            onChange={(e) => setTranslation(locale, "description", e.target.value)}
            rows={3}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Aéroport le plus proche (texte)">
            <input
              value={t.nearestAirport}
              onChange={(e) => setTranslation(locale, "nearestAirport", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Meilleur moment pour visiter">
            <input
              value={t.bestTimeToVisit}
              onChange={(e) => setTranslation(locale, "bestTimeToVisit", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Transports en commun">
          <textarea
            value={t.publicTransport}
            onChange={(e) => setTranslation(locale, "publicTransport", e.target.value)}
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label="Depuis l'aéroport">
          <textarea
            value={t.fromAirport}
            onChange={(e) => setTranslation(locale, "fromAirport", e.target.value)}
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label="Conseil d'initié">
          <textarea
            value={t.insiderTip}
            onChange={(e) => setTranslation(locale, "insiderTip", e.target.value)}
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label="Match record">
          <input
            value={t.recordMatchLabel}
            onChange={(e) => setTranslation(locale, "recordMatchLabel", e.target.value)}
            className={inputClass}
          />
        </Field>

        <ListField
          label="À voir (liste)"
          values={t.whatToSee}
          onChange={(v) => setTranslation(locale, "whatToSee", v)}
        />

        {data.gallery.length > 0 && (
          <Field label={`Textes alternatifs de la galerie (${localeNames[locale]})`}>
            <div className="flex flex-col gap-2">
              {t.galleryAlts.map((alt, i) => (
                <input
                  key={i}
                  value={alt}
                  placeholder={`Image ${i + 1}`}
                  onChange={(e) => {
                    const next = [...t.galleryAlts];
                    next[i] = e.target.value;
                    setTranslation(locale, "galleryAlts", next);
                  }}
                  className={inputClass}
                />
              ))}
            </div>
          </Field>
        )}

        <Field label="Texte alternatif photo principale">
          <input
            value={t.heroAlt}
            onChange={(e) => setTranslation(locale, "heroAlt", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Description boutique">
          <textarea
            value={t.shopDescription}
            onChange={(e) => setTranslation(locale, "shopDescription", e.target.value)}
            rows={2}
            className={inputClass}
          />
        </Field>
        <KeyValueListField
          label="Produits boutique"
          items={t.shopProducts}
          fields={[
            { key: "name", label: "Nom" },
            { key: "priceFrom", label: "Prix à partir de", type: "number", width: "140px" },
          ]}
          emptyItem={{ name: "", priceFrom: 0 }}
          onChange={(v) => setTranslation(locale, "shopProducts", v)}
        />
      </Section>

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-white/10 bg-[#0b0b0c] py-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-white px-5 py-2 text-sm font-semibold text-black disabled:opacity-50"
        >
          {isPending ? "Enregistrement..." : mode === "create" ? "Créer le stade" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

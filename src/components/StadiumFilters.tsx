"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import { StadiumCard } from "./StadiumCard";

interface StadiumFiltersProps {
  stadiums: Stadium[];
  countries: string[];
  leagues: string[];
}

export function StadiumFilters({
  stadiums,
  countries,
  leagues,
}: StadiumFiltersProps) {
  const t = useTranslations("stadiumsList");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [league, setLeague] = useState("all");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return stadiums.filter((stadium) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        stadium.name.toLowerCase().includes(normalizedQuery) ||
        stadium.club.toLowerCase().includes(normalizedQuery) ||
        stadium.city.toLowerCase().includes(normalizedQuery);
      const matchesCountry = country === "all" || stadium.country === country;
      const matchesLeague = league === "all" || stadium.league === league;
      return matchesQuery && matchesCountry && matchesLeague;
    });
  }, [stadiums, query, country, league]);

  const inputClass =
    "border border-white/16 bg-transparent px-4 py-3 font-mono text-[12px] uppercase tracking-[.08em] text-[#f2efe9] placeholder:text-[#5E5E58] focus:outline-none focus-visible:border-[var(--acc)]";

  return (
    <div>
      <div className="flex flex-col gap-px bg-white/16 sm:flex-row sm:border sm:border-white/16">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className={`${inputClass} flex-1 border-none bg-[#0b0b0c] sm:border-r sm:border-white/16`}
        />
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className={`${inputClass} border-none bg-[#0b0b0c] sm:border-r sm:border-white/16`}
        >
          <option value="all">{t("allCountries")}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={league}
          onChange={(event) => setLeague(event.target.value)}
          className={`${inputClass} border-none bg-[#0b0b0c]`}
        >
          <option value="all">{t("allLeagues")}</option>
          {leagues.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[.14em] text-[#8E8E88]">
        {filtered.length === 1
          ? t("resultsOne")
          : t("resultsOther", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-[#8E8E88]">{t("noResults")}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-[clamp(10px,1.4vw,18px)] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((stadium) => (
            <StadiumCard key={stadium.slug} stadium={stadium} />
          ))}
        </div>
      )}
    </div>
  );
}

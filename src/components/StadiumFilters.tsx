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

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.5 3a5.5 5.5 0 1 0 3.38 9.84l3.14 3.14a1 1 0 0 0 1.42-1.42l-3.14-3.14A5.5 5.5 0 0 0 8.5 3Zm-3.5 5.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-white/15 bg-slate-900 py-2.5 pl-9 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />
        </div>
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className="rounded-full border border-white/15 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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
          className="rounded-full border border-white/15 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <option value="all">{t("allLeagues")}</option>
          {leagues.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {filtered.length === 1
          ? t("resultsOne")
          : t("resultsOther", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-slate-400">{t("noResults")}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((stadium) => (
            <StadiumCard key={stadium.slug} stadium={stadium} />
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAllStadiums,
  getStadiumCountries,
  getStadiumLeagues,
} from "@/lib/stadiums";
import { StadiumFilters } from "@/components/StadiumFilters";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const tList = await getTranslations({ locale, namespace: "stadiumsList" });

  return {
    title: tList("title"),
    description: t("stadiumsDescription"),
  };
}

export default async function StadiumsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("stadiumsList");
  const stadiums = getAllStadiums(locale as Locale);
  const countries = getStadiumCountries(locale as Locale);
  const leagues = getStadiumLeagues(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-slate-400">{t("subtitle")}</p>
      </div>
      <div className="mt-8">
        <StadiumFilters
          stadiums={stadiums}
          countries={countries}
          leagues={leagues}
        />
      </div>
    </div>
  );
}

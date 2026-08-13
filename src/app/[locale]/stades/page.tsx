import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAllStadiums,
  getStadiumCountries,
  getStadiumLeagues,
} from "@/lib/stadiums";
import { StadiumFilters } from "@/components/StadiumFilters";
import { Footer } from "@/components/Footer";

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
  const [stadiums, countries, leagues] = await Promise.all([
    getAllStadiums(locale as Locale),
    getStadiumCountries(locale as Locale),
    getStadiumLeagues(locale as Locale),
  ]);

  return (
    <>
      <div className="px-[clamp(14px,3vw,34px)] pb-[clamp(48px,7vw,100px)] pt-[104px]">
        <div className="max-w-[52ch]">
          <h1
            className="font-display uppercase leading-[.9]"
            style={{ fontSize: "clamp(34px,6.5vw,84px)" }}
          >
            {t("title")}
          </h1>
          <p className="mt-2 text-[rgba(242,239,233,.7)]">{t("subtitle")}</p>
        </div>
        <div className="mt-8">
          <StadiumFilters
            stadiums={stadiums}
            countries={countries}
            leagues={leagues}
          />
        </div>
      </div>
      <Footer variant="page" />
    </>
  );
}

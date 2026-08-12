import type { Locale } from "@/i18n/routing";

const localeToIntl: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  it: "it-IT",
  zh: "zh-CN",
};

export function formatPrice(
  amount: number,
  currency: string,
  locale: Locale
): string {
  return new Intl.NumberFormat(localeToIntl[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeToIntl[locale]).format(value);
}

const flagOffset = 127397;

export function countryCodeToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(char.charCodeAt(0) + flagOffset)
    );
}

export function projectCoordinates(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

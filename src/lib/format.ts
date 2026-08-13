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
    currencyDisplay: "narrowSymbol",
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

const currencySymbols: Record<string, string> = {
  EUR: "€",
  GBP: "£",
  USD: "$",
};

export function currencySymbol(currency: string): string {
  return currencySymbols[currency] ?? currency;
}

export function priceTierLabel(tier: number, currency: string): string {
  return currencySymbol(currency).repeat(tier);
}

export function contrastTextColor(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#0B0B0C" : "#F2EFE9";
}

export function projectCoordinates(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

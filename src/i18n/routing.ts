import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en", "it", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  it: "Italiano",
  zh: "中文",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

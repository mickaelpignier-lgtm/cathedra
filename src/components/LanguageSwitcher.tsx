"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <label className="group relative flex items-center">
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        value={locale}
        onChange={handleChange}
        className="cursor-pointer appearance-none rounded-full border border-white/15 bg-white/5 py-2 pl-3 pr-8 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc} className="text-slate-900">
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-2.5 h-4 w-4 text-slate-300"
      >
        <path
          fill="currentColor"
          d="M5.5 7.5 10 12l4.5-4.5H5.5Z"
        />
      </svg>
    </label>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  it: "IT",
  zh: "中",
};

interface LanguageSwitcherProps {
  dark?: boolean;
}

export function LanguageSwitcher({ dark = true }: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex items-center gap-0.5 rounded-full border p-[3px] ${
        dark ? "border-white/18" : "border-[#0b0b0c]/20"
      }`}
    >
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[.1em] transition-colors ${
              active
                ? "bg-[#f2efe9] text-[#0b0b0c]"
                : dark
                  ? "text-[#8E8E88] hover:text-[#f2efe9]"
                  : "text-[#5E5E58] hover:text-[#0b0b0c]"
            }`}
          >
            {labels[loc]}
          </button>
        );
      })}
    </div>
  );
}

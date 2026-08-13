"use client";

import { useTranslations } from "next-intl";
import { supportedCurrencies } from "@/lib/currency";
import { usePreferredCurrency } from "@/lib/usePreferredCurrency";

export function CurrencyPicker() {
  const t = useTranslations("nav");
  const { isLoaded, isSignedIn, currency, setCurrency } = usePreferredCurrency();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <label className="hidden items-center sm:flex">
      <span className="sr-only">{t("currencyLabel")}</span>
      <select
        value={currency ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          if (value) setCurrency(value as (typeof supportedCurrencies)[number]);
        }}
        className="cursor-pointer appearance-none border border-white/18 bg-transparent px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[.1em] text-[#8E8E88] transition-colors hover:text-[#f2efe9] focus:outline-none"
      >
        <option value="" disabled>
          {t("currencyPlaceholder")}
        </option>
        {supportedCurrencies.map((code) => (
          <option key={code} value={code} className="text-slate-900">
            {code}
          </option>
        ))}
      </select>
    </label>
  );
}

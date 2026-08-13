"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { convertToCurrency } from "@/lib/currency";
import { usePreferredCurrency } from "@/lib/usePreferredCurrency";
import { formatPrice } from "@/lib/format";

interface ConvertedPriceProps {
  amount: number;
  currency: string;
  className?: string;
}

export function ConvertedPrice({ amount, currency, className }: ConvertedPriceProps) {
  const locale = useLocale() as Locale;
  const { isLoaded, isSignedIn, currency: preferred } = usePreferredCurrency();

  if (!isLoaded || !isSignedIn || !preferred || preferred === currency) {
    return null;
  }

  const converted = convertToCurrency(amount, currency, preferred);
  if (converted === null) return null;

  return (
    <span className={className ?? "font-mono text-[11px] text-[#8E8E88]"}>
      ≈ {formatPrice(converted, preferred, locale)}
    </span>
  );
}

import { useLocale, useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";

interface ShopSectionProps {
  stadium: Stadium;
}

export function ShopSection({ stadium }: ShopSectionProps) {
  const t = useTranslations("stadium");
  const locale = useLocale() as Locale;

  return (
    <section
      aria-labelledby="shop-title"
      className="rounded-2xl border border-white/10 bg-slate-900 p-6"
    >
      <h2 id="shop-title" className="text-xl font-bold text-white">
        {t("shopTitle")}
      </h2>
      <p className="mt-2 text-sm text-slate-400">{stadium.shop.description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t("shopFlagshipProducts")}
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {stadium.shop.flagshipProducts.map((product) => (
          <li
            key={product.name}
            className="rounded-xl bg-slate-950/60 p-4 text-sm"
          >
            <p className="font-medium text-white">{product.name}</p>
            <p className="mt-1 text-emerald-400">
              {t("priceFrom")}{" "}
              {formatPrice(product.priceFrom, stadium.tickets.currency, locale)}
            </p>
          </li>
        ))}
      </ul>
      <a
        href={stadium.shop.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        {t("shopTitle")} &rarr;
      </a>
    </section>
  );
}

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
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
      id="boutique"
      className="scroll-mt-[110px] px-[clamp(14px,3vw,34px)] py-[clamp(44px,6vw,96px)]"
      style={{ background: "var(--acc)", color: "#F2EFE9" }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3.5">
        <h2
          className="m-0 font-display uppercase leading-[.88]"
          style={{ fontSize: "clamp(32px,6vw,78px)" }}
        >
          {t("shopTitle")}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[.16em]">
          {t("shopMetaText")}
        </span>
      </div>
      <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.55]" style={{ color: "rgba(242,239,233,.85)" }}>
        {stadium.shop.description}
      </p>

      <div className="mt-7 grid grid-cols-2 gap-[clamp(10px,1.4vw,18px)] sm:grid-cols-4">
        {stadium.shop.flagshipProducts.map((product, i) => (
          <a
            key={product.name}
            href={stadium.shop.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            style={{ background: "#0B0B0C", color: "#F2EFE9" }}
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={stadium.gallery[i % stadium.gallery.length]?.src ?? stadium.heroImage.src}
                alt={product.name}
                fill
                loading="lazy"
                sizes="(min-width: 640px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-baseline justify-between gap-2.5 p-3.5">
              <span className="text-[14px]">{product.name}</span>
              <span className="whitespace-nowrap font-mono text-[13px]" style={{ color: "var(--acc)" }}>
                {formatPrice(product.priceFrom, stadium.tickets.currency, locale)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { formatNumber } from "@/lib/format";

interface StadiumCardProps {
  stadium: Stadium;
  priority?: boolean;
}

export function StadiumCard({ stadium, priority = false }: StadiumCardProps) {
  const t = useTranslations("stadium");
  const locale = useLocale() as Locale;

  return (
    <Link href={`/stades/${stadium.slug}`} className="group block">
      <article className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={stadium.heroImage.src}
          alt={stadium.heroImage.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 bg-[#0b0b0c] px-2 py-1 font-mono text-[10px] uppercase tracking-[.16em]"
          style={{ color: "var(--acc)" }}
        >
          {stadium.league}
        </span>
        <span
          className="absolute inset-x-0 bottom-0 h-[60%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,12,0), rgba(11,11,12,.9))",
          }}
        />
        <div className="absolute inset-x-3.5 bottom-3.5">
          <div className="font-display text-[clamp(20px,2.4vw,28px)] uppercase leading-[.92]">
            {stadium.name}
          </div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-[rgba(242,239,233,.62)]">
            {stadium.club} · {stadium.city}, {stadium.country}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-white/16 pt-2 font-mono text-[10.5px] uppercase tracking-[.14em] text-[#8E8E88]">
            <span>
              {formatNumber(stadium.capacity, locale)} {t("capacity").toLowerCase()}
            </span>
            <span style={{ color: "var(--acc)" }} className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

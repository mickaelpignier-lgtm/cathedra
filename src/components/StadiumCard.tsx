import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { countryCodeToFlag, formatNumber } from "@/lib/format";

interface StadiumCardProps {
  stadium: Stadium;
  priority?: boolean;
}

export function StadiumCard({ stadium, priority = false }: StadiumCardProps) {
  const t = useTranslations("stadium");
  const locale = useLocale() as Locale;

  return (
    <Link
      href={`/stades/${stadium.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/40 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
        <Image
          src={stadium.heroImage.src}
          alt={stadium.heroImage.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur">
          {stadium.league}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-white">{stadium.name}</h3>
          <span
            aria-hidden="true"
            className="text-xl leading-none"
            title={stadium.country}
          >
            {countryCodeToFlag(stadium.countryCode)}
          </span>
        </div>
        <p className="text-sm text-slate-400">
          {stadium.club} &middot; {stadium.city}, {stadium.country}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3 text-sm text-slate-300">
          <span>
            {formatNumber(stadium.capacity, locale)}{" "}
            <span className="text-slate-500">{t("capacity").toLowerCase()}</span>
          </span>
          <span className="font-medium text-emerald-400 transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

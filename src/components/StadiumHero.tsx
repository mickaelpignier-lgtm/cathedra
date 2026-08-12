import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { countryCodeToFlag, formatNumber } from "@/lib/format";
import { Link } from "@/i18n/navigation";

interface StadiumHeroProps {
  stadium: Stadium;
}

export function StadiumHero({ stadium }: StadiumHeroProps) {
  const t = useTranslations("stadium");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[52vh] min-h-[360px] w-full">
        <Image
          src={stadium.heroImage.src}
          alt={stadium.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative -mt-24 rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl backdrop-blur sm:p-8">
          <Link
            href="/stades"
            className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            &larr; {t("backToList")}
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                {stadium.league}
              </p>
              <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                {stadium.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-slate-300">
                <span aria-hidden="true" className="text-xl">
                  {countryCodeToFlag(stadium.countryCode)}
                </span>
                {stadium.club} &middot; {stadium.city}, {stadium.country}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-right">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  {t("capacity")}
                </dt>
                <dd className="text-lg font-semibold text-white">
                  {formatNumber(stadium.capacity, locale)}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  {t("opened")}
                </dt>
                <dd className="text-lg font-semibold text-white">
                  {stadium.yearOpened}
                </dd>
              </div>
            </dl>
          </div>
          <p className="mt-4 max-w-3xl text-slate-300">{stadium.description}</p>
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function HomeHero() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/cathedra-hero/1920/1080"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6 sm:py-32">
        <p className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          {t("heroKicker")}
        </p>
        <h1 className="max-w-2xl text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          {t("heroTitle")}
        </h1>
        <p className="max-w-xl text-lg text-slate-300">{t("heroSubtitle")}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/stades"
            className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            {t("heroCta")}
          </Link>
          <a
            href="#map"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {t("heroSecondaryCta")}
          </a>
        </div>
      </div>
    </section>
  );
}

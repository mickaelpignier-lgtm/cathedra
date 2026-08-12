import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-bold text-white">{tMeta("siteName")}</p>
            <p className="mt-2 text-sm text-slate-400">{t("tagline")}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              {t("explore")}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/stades" className="hover:text-emerald-400">
                  {tNav("stadiums")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {tMeta("siteName")}. {t("rights")}
          </p>
          <p>{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}

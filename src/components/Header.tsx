import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2 4 6v6c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V6l-8-4Zm0 2.2 6 3v4.3c0 4-2.7 7.1-6 8-3.3-.9-6-4-6-8V7.2l6-3ZM12 7l-3.5 2.5 1.3 4h4.4l1.3-4L12 7Z" />
            </svg>
          </span>
          {tMeta("siteName")}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 sm:flex">
          <Link className="transition-colors hover:text-emerald-400" href="/">
            {t("home")}
          </Link>
          <Link
            className="transition-colors hover:text-emerald-400"
            href="/stades"
          >
            {t("stadiums")}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="flex items-center gap-6 border-t border-white/10 px-4 py-2 text-sm font-medium text-slate-200 sm:hidden">
        <Link className="transition-colors hover:text-emerald-400" href="/">
          {t("home")}
        </Link>
        <Link
          className="transition-colors hover:text-emerald-400"
          href="/stades"
        >
          {t("stadiums")}
        </Link>
      </nav>
    </header>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AuthControls } from "./AuthControls";

export function Header() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");

  return (
    <header
      className="fixed inset-x-0 top-0 z-[70] flex h-14 items-center justify-between gap-4 px-[clamp(14px,3vw,34px)] backdrop-blur-[6px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,11,12,.92), rgba(11,11,12,0))",
      }}
    >
      <div className="flex min-w-0 items-center gap-5">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-[clamp(17px,2.2vw,22px)] uppercase tracking-[.06em] text-[#f2efe9]"
        >
          {tMeta("siteName")}
          <span style={{ color: "var(--acc)" }}>.</span>
        </Link>
        <nav className="hidden items-center gap-5 sm:flex">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[.14em] text-[#8E8E88] transition-colors hover:text-[#f2efe9]"
          >
            {t("home")}
          </Link>
          <Link
            href="/stades"
            className="font-mono text-[12px] uppercase tracking-[.14em] text-[#8E8E88] transition-colors hover:text-[#f2efe9]"
          >
            {t("stadiums")}
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3.5">
        <AuthControls />
        <LanguageSwitcher />
      </div>
    </header>
  );
}

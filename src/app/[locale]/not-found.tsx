import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-[clamp(14px,3vw,34px)] pb-32 pt-[144px] text-center">
      <p
        className="font-mono text-[11px] uppercase tracking-[.22em]"
        style={{ color: "var(--acc)" }}
      >
        404
      </p>
      <h1
        className="font-display uppercase leading-[.9]"
        style={{ fontSize: "clamp(30px,5vw,56px)" }}
      >
        {t("title")}
      </h1>
      <p style={{ color: "rgba(242,239,233,.7)" }}>{t("body")}</p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 text-[12px] font-semibold uppercase tracking-[.16em] transition-colors"
        style={{ background: "var(--acc)", color: "#F2EFE9" }}
      >
        {t("cta")}
      </Link>
    </div>
  );
}

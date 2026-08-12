import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
        404
      </p>
      <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
      <p className="text-slate-400">{t("body")}</p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
      >
        {t("cta")}
      </Link>
    </div>
  );
}

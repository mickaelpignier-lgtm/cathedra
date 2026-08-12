import { useTranslations } from "next-intl";

interface InsiderTipProps {
  tip: string;
}

export function InsiderTip({ tip }: InsiderTipProps) {
  const t = useTranslations("stadium");

  return (
    <aside className="flex gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M9 21h6v-1H9v1Zm3-19a7 7 0 0 0-4 12.7c.6.4 1 1.2 1 2v.3h6v-.3c0-.8.4-1.6 1-2A7 7 0 0 0 12 2Z" />
        </svg>
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
          {t("insiderTipTitle")}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-200">{tip}</p>
      </div>
    </aside>
  );
}

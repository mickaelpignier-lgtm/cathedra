import { useTranslations, useLocale } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { formatNumber } from "@/lib/format";

interface HistorySectionProps {
  stadium: Stadium;
}

export function HistorySection({ stadium }: HistorySectionProps) {
  const t = useTranslations("stadium");
  const locale = useLocale() as Locale;

  return (
    <section
      id="histoire"
      className="scroll-mt-[110px] px-[clamp(14px,3vw,34px)] py-[clamp(46px,6vw,100px)]"
    >
      <h2
        className="m-0 mb-[clamp(20px,2.6vw,36px)] font-display uppercase leading-[.88]"
        style={{ fontSize: "clamp(34px,6.5vw,84px)" }}
      >
        {t("historyTitle")}
      </h2>

      <div className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-[clamp(20px,2.2vw,30px)]" style={{ background: "#0B0B0C" }}>
          <div className="font-mono text-[10.5px] uppercase tracking-[.2em] text-[#8E8E88]">
            {t("initialArchitectLabel")}
          </div>
          <p className="mt-2 text-[16px] leading-[1.4]">{stadium.initialArchitect}</p>
          <p className="mt-1 font-mono text-[11px] text-[#8E8E88]">
            {stadium.yearOpened}
          </p>
        </div>
        <div className="p-[clamp(20px,2.2vw,30px)]" style={{ background: "#0B0B0C" }}>
          <div className="font-mono text-[10.5px] uppercase tracking-[.2em] text-[#8E8E88]">
            {t("renovationsLabel")}
          </div>
          {stadium.renovations.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {stadium.renovations.map((reno) => (
                <li key={reno.year} className="flex items-baseline gap-3">
                  <span
                    className="font-display text-[18px]"
                    style={{ color: "var(--acc)" }}
                  >
                    {reno.year}
                  </span>
                  <span className="text-[14.5px] leading-[1.4]">
                    {reno.architect}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[14.5px] text-[#8E8E88]">
              {t("noRenovations")}
            </p>
          )}
        </div>
        {stadium.recordAttendance && (
          <div className="p-[clamp(20px,2.2vw,30px)]" style={{ background: "#0B0B0C" }}>
            <div className="font-mono text-[10.5px] uppercase tracking-[.2em] text-[#8E8E88]">
              {t("recordAttendanceLabel")}
            </div>
            <p className="mt-2 font-display text-[26px] leading-none" style={{ color: "var(--acc)" }}>
              {formatNumber(stadium.recordAttendance, locale)}
            </p>
            <p className="mt-2 text-[13.5px] leading-[1.4] text-[#F2EFE9]">
              {stadium.recordMatchLabel}
            </p>
          </div>
        )}
        {stadium.owner && (
          <div className="p-[clamp(20px,2.2vw,30px)]" style={{ background: "#0B0B0C" }}>
            <div className="font-mono text-[10.5px] uppercase tracking-[.2em] text-[#8E8E88]">
              {t("ownerLabel")}
            </div>
            <p className="mt-2 text-[16px] leading-[1.4]">{stadium.owner}</p>
          </div>
        )}
      </div>
    </section>
  );
}

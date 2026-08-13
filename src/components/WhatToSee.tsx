import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";

interface WhatToSeeProps {
  stadium: Stadium;
}

export function WhatToSee({ stadium }: WhatToSeeProps) {
  const t = useTranslations("stadium");

  return (
    <section
      id="voir"
      className="scroll-mt-[110px] px-[clamp(14px,3vw,34px)] py-[clamp(46px,6vw,100px)]"
      style={{ background: "#F2EFE9", color: "#0B0B0C" }}
    >
      <h2
        className="m-0 mb-[clamp(20px,2.6vw,38px)] font-display uppercase leading-[.88]"
        style={{ fontSize: "clamp(34px,6.5vw,84px)" }}
      >
        {t("whatToSeeTitle")}
      </h2>

      <div className="grid gap-0">
        {stadium.whatToSee.map((item, i) => (
          <div
            key={item}
            className="flex items-baseline gap-4 border-t py-3.5"
            style={{ borderColor: "rgba(11,11,12,.2)" }}
          >
            <span className="flex-none font-mono text-[11px]" style={{ color: "var(--acc)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[clamp(18px,2vw,24px)] uppercase leading-[1.05]">
              {item}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-[clamp(26px,3.4vw,52px)] border-l-4 p-[clamp(24px,3.4vw,52px)]"
        style={{ background: "#0B0B0C", color: "#F2EFE9", borderColor: "var(--acc)" }}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-[.22em] opacity-80">
          {t("insiderTipTitle")}
        </div>
        <blockquote
          className="m-0 mt-3.5 max-w-[38ch] font-display uppercase leading-[1.05]"
          style={{ fontSize: "clamp(22px,3vw,40px)" }}
        >
          {stadium.insiderTip}
        </blockquote>
      </div>
    </section>
  );
}

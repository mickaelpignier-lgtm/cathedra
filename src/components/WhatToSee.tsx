import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";

interface WhatToSeeProps {
  stadium: Stadium;
}

export function WhatToSee({ stadium }: WhatToSeeProps) {
  const t = useTranslations("stadium");

  return (
    <section
      aria-labelledby="what-to-see-title"
      className="rounded-2xl border border-white/10 bg-slate-900 p-6"
    >
      <h2 id="what-to-see-title" className="text-xl font-bold text-white">
        {t("whatToSeeTitle")}
      </h2>
      <ul className="mt-4 space-y-3">
        {stadium.whatToSee.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.5a1 1 0 1 1 1.4-1.4l3.9 3.9 6.7-6.7a1 1 0 0 1 1.4 0Z"
                clipRule="evenodd"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

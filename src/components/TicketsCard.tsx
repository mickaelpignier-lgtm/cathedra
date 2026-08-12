import { useLocale, useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";

interface TicketsCardProps {
  stadium: Stadium;
}

export function TicketsCard({ stadium }: TicketsCardProps) {
  const t = useTranslations("stadium");
  const locale = useLocale() as Locale;

  const offers = [
    {
      label: t("guidedTour"),
      price: stadium.tickets.guidedTourPriceFrom,
      url: stadium.tickets.guidedTourUrl,
    },
    {
      label: t("matchTickets"),
      price: stadium.tickets.matchTicketPriceFrom,
      url: stadium.tickets.matchTicketUrl,
    },
  ];

  return (
    <section
      aria-labelledby="tickets-title"
      className="rounded-2xl border border-white/10 bg-slate-900 p-6"
    >
      <h2 id="tickets-title" className="text-xl font-bold text-white">
        {t("ticketsTitle")}
      </h2>
      <ul className="mt-4 space-y-3">
        {offers.map((offer) => (
          <li
            key={offer.label}
            className="flex items-center justify-between gap-4 rounded-xl bg-slate-950/60 p-4"
          >
            <div>
              <p className="font-medium text-white">{offer.label}</p>
              <p className="text-sm text-slate-400">
                {t("priceFrom")}{" "}
                <span className="font-semibold text-emerald-400">
                  {formatPrice(offer.price, stadium.tickets.currency, locale)}
                </span>
              </p>
            </div>
            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              {t("buyTickets")}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

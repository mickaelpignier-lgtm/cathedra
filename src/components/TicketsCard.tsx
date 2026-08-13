import { useLocale, useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import { ConvertedPrice } from "./ConvertedPrice";

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
      id="billets"
      className="scroll-mt-[110px] px-[clamp(14px,3vw,34px)] py-[clamp(46px,6vw,100px)]"
    >
      <h2
        className="m-0 mb-[clamp(20px,2.6vw,38px)] font-display uppercase leading-[.88]"
        style={{ fontSize: "clamp(34px,6.5vw,84px)" }}
      >
        {t("ticketsTitle")}
      </h2>

      <div
        className="grid border-y"
        style={{ borderColor: "rgba(242,239,233,.14)" }}
      >
        {offers.map((offer) => (
          <a
            key={offer.label}
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-2 items-center gap-4 border-t py-5 first:border-t-0 sm:grid-cols-[1fr_auto_auto]"
            style={{ borderColor: "rgba(242,239,233,.14)" }}
          >
            <div className="font-display text-[clamp(22px,3vw,34px)] uppercase leading-[1]">
              {offer.label}
            </div>
            <div className="flex flex-col gap-1 sm:items-end">
              <div
                className="font-mono text-[15px]"
                style={{ color: "var(--acc)" }}
              >
                {t("priceFrom")} {formatPrice(offer.price, stadium.tickets.currency, locale)}
              </div>
              <ConvertedPrice amount={offer.price} currency={stadium.tickets.currency} />
            </div>
            <div className="col-span-2 mt-2 border border-white/30 px-4 py-2.5 text-center font-mono text-[10.5px] uppercase tracking-[.18em] text-[#F2EFE9] transition-colors group-hover:border-[#f2efe9] group-hover:bg-white/8 sm:col-span-1 sm:mt-0">
              {t("buyTickets")}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

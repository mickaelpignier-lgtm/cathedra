import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";

interface StadiumGalleryProps {
  stadium: Stadium;
}

const RATIOS = [
  { ratio: "aspect-[3/4]", width: "w-[clamp(240px,24vw,380px)]" },
  { ratio: "aspect-[16/10]", width: "w-[clamp(420px,46vw,720px)]" },
  { ratio: "aspect-square", width: "w-[clamp(280px,28vw,440px)]" },
];

export function StadiumGallery({ stadium }: StadiumGalleryProps) {
  const t = useTranslations("stadium");

  return (
    <section id="galerie" className="scroll-mt-[110px] py-[clamp(46px,6vw,96px)]">
      <div className="mb-[clamp(20px,2.6vw,36px)] flex flex-wrap items-end justify-between gap-4 px-[clamp(14px,3vw,34px)]">
        <h2
          className="m-0 font-display uppercase leading-[.88]"
          style={{ fontSize: "clamp(34px,6.5vw,84px)" }}
        >
          {t("galleryTitle")}
        </h2>
        <div className="font-mono text-[10.5px] uppercase tracking-[.18em] text-[#8E8E88]">
          {t("swipeHint")}
        </div>
      </div>
      <div className="hs flex gap-[clamp(10px,1.2vw,16px)] px-[clamp(14px,3vw,34px)]">
        {stadium.gallery.map((image, i) => {
          const r = RATIOS[i % RATIOS.length];
          return (
            <figure
              key={image.src}
              className={`relative m-0 flex-none overflow-hidden ${r.ratio} ${r.width}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 640px) 40vw, 82vw"
                className="object-cover"
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}

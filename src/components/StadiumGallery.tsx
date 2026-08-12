import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Stadium } from "@/lib/stadiums";

interface StadiumGalleryProps {
  stadium: Stadium;
}

export function StadiumGallery({ stadium }: StadiumGalleryProps) {
  const t = useTranslations("stadium");

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="text-xl font-bold text-white">
        {t("galleryTitle")}
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stadium.gallery.map((image, index) => (
          <div
            key={image.src}
            className={`relative aspect-square overflow-hidden rounded-xl bg-slate-800 ${
              index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(min-width: 640px) 25vw, 45vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

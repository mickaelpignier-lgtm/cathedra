import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getStadiumSlugs } from "@/lib/stadiums";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cathedra.vercel.app";

function buildLanguageAlternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getStadiumSlugs();
  const now = new Date();

  const staticPaths = ["", "/stades"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "daily",
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: buildLanguageAlternates(path),
      },
    }))
  );

  const stadiumEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}/stades/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: buildLanguageAlternates(`/stades/${slug}`),
      },
    }))
  );

  return [...staticEntries, ...stadiumEntries];
}

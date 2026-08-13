import type { Metadata } from "next";
import { Anton, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR, enUS, itIT, zhCN } from "@clerk/localizations";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import "../globals.css";

const clerkLocalizations = { fr: frFR, en: enUS, it: itIT, zh: zhCN } as const;

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cathedra.vercel.app";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])
  );

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${t("siteName")} — ${t("siteTagline")}`,
      template: `%s — ${t("siteName")}`,
    },
    description: t("homeDescription"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { ...languages, "x-default": `${siteUrl}/${routing.defaultLocale}` },
    },
    openGraph: {
      title: t("siteName"),
      description: t("homeDescription"),
      url: `${siteUrl}/${locale}`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0b0b0c] font-sans text-[#f2efe9]">
        <ClerkProvider
          localization={clerkLocalizations[locale as Locale]}
          appearance={{
            variables: {
              colorPrimary: "#2E5BFF",
              colorBackground: "#0b0b0c",
              colorForeground: "#f2efe9",
              colorInput: "#141517",
              colorInputForeground: "#f2efe9",
              borderRadius: "0px",
              fontFamily: "var(--font-plex-sans)",
            },
          }}
        >
          <NextIntlClientProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

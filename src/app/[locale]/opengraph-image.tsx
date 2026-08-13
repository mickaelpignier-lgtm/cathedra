import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0B0B0C",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: "#2E5BFF",
            opacity: 0.9,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 210,
            right: -140,
            width: 720,
            height: 720,
            borderRadius: "50%",
            border: "16px solid #F2EFE9",
            opacity: 0.35,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            letterSpacing: "0.06em",
            color: "#F2EFE9",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          CATHEDRA
          <span style={{ color: "#2E5BFF" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 66,
            lineHeight: 1.05,
            color: "#F2EFE9",
            textTransform: "uppercase",
            fontWeight: 700,
            maxWidth: 760,
          }}
        >
          {t("siteTagline")}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 24,
            color: "rgba(242,239,233,.65)",
            maxWidth: 700,
          }}
        >
          {t("homeDescription")}
        </div>
      </div>
    ),
    { ...size }
  );
}

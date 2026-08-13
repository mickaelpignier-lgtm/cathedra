import { useTranslations } from "next-intl";

interface FooterProps {
  variant?: "home" | "page";
  meta?: string;
}

export function Footer({ variant = "page", meta }: FooterProps) {
  const t = useTranslations("footer");
  const tMeta = useTranslations("meta");

  if (variant === "home") {
    return (
      <footer className="border-t border-white/12 px-[clamp(14px,3vw,34px)] pb-10 pt-[clamp(40px,6vw,90px)]">
        <div
          className="font-display uppercase leading-[.86] tracking-[-.01em]"
          style={{ fontSize: "clamp(40px,11vw,150px)" }}
        >
          {t("tagline")}
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 font-mono text-[11px] uppercase tracking-[.16em] text-[#8E8E88]">
          <span>
            © {new Date().getFullYear()} {tMeta("siteName")}
          </span>
          <span>FR · EN · IT · 中文</span>
          <span>{t("rights")}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="flex flex-wrap justify-between gap-4 border-t border-white/12 px-[clamp(14px,3vw,34px)] py-8 font-mono text-[11px] uppercase tracking-[.16em] text-[#8E8E88]">
      <span>
        © {new Date().getFullYear()} {tMeta("siteName")}
      </span>
      <span>FR · EN · IT · 中文</span>
      <span>{meta ?? t("disclaimer")}</span>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const t = useTranslations("stadium");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Browser-only value (no server equivalent) — read once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20%E2%80%94%20${encodedUrl}`,
    },
    {
      key: "email",
      label: t("shareEmail"),
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10.5px] uppercase tracking-[.14em] text-[#8E8E88]">
        {t("shareLabel")}
      </span>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.12em] text-[#F2EFE9] transition-colors hover:border-white hover:bg-white/8"
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.12em] text-[#F2EFE9] transition-colors hover:border-white hover:bg-white/8"
      >
        {copied ? t("shareCopied") : t("shareCopyLink")}
      </button>
    </div>
  );
}

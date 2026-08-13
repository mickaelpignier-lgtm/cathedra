"use client";

import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export function AuthControls() {
  const t = useTranslations("nav");
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="h-8 w-8" aria-hidden="true" />;
  }

  if (isSignedIn) {
    return (
      <UserButton
        appearance={{
          elements: { avatarBox: "h-8 w-8" },
        }}
      />
    );
  }

  return (
    <>
      <SignInButton mode="modal">
        <button
          type="button"
          className="hidden font-mono text-[12px] uppercase tracking-[.14em] text-[#8E8E88] transition-colors hover:text-[#f2efe9] sm:inline-block"
        >
          {t("signIn")}
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button
          type="button"
          className="rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[.14em] transition-colors"
          style={{ background: "var(--acc)", color: "#F2EFE9" }}
        >
          {t("signUp")}
        </button>
      </SignUpButton>
    </>
  );
}

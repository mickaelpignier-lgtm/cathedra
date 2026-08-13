"use client";

import { useUser } from "@clerk/nextjs";
import { useCallback } from "react";
import { isSupportedCurrency, type SupportedCurrency } from "./currency";

export function usePreferredCurrency() {
  const { isLoaded, isSignedIn, user } = useUser();

  const raw = user?.unsafeMetadata?.currency;
  const currency: SupportedCurrency | null =
    typeof raw === "string" && isSupportedCurrency(raw) ? raw : null;

  const setCurrency = useCallback(
    async (value: SupportedCurrency) => {
      if (!user) return;
      await user.update({
        unsafeMetadata: { ...user.unsafeMetadata, currency: value },
      });
    },
    [user]
  );

  return {
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    currency,
    setCurrency,
  };
}

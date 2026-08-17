"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteStadium } from "@/app/admin/actions";

export function DeleteStadiumButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Supprimer "${name}" (${slug}) ? Irréversible.`)) return;
        startTransition(async () => {
          await deleteStadium(slug);
          router.refresh();
        });
      }}
      className="rounded border border-white/15 px-2 py-1 text-xs text-white/60 hover:border-red-400/50 hover:text-red-400 disabled:opacity-50"
    >
      {isPending ? "..." : "Supprimer"}
    </button>
  );
}

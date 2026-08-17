"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DeleteStadiumButton } from "./DeleteStadiumButton";

export interface AdminStadiumRow {
  slug: string;
  name: string;
  club: string;
  country: string;
  capacity: number;
  heroImageSrc: string;
  hasRealPhoto: boolean;
}

export function AdminStadiumList({ rows }: { rows: AdminStadiumRow[] }) {
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) => {
    const needle = q.toLowerCase();
    return (
      r.name.toLowerCase().includes(needle) ||
      r.slug.toLowerCase().includes(needle) ||
      r.country.toLowerCase().includes(needle) ||
      r.club.toLowerCase().includes(needle)
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher un stade, club, pays, slug..."
        className="rounded border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/40"
      />
      <p className="text-xs text-white/40">
        {filtered.length} / {rows.length} stades
      </p>
      <div className="overflow-x-auto rounded border border-white/10">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/50">
              <th className="px-3 py-2">Photo</th>
              <th className="px-3 py-2">Nom</th>
              <th className="px-3 py-2">Club</th>
              <th className="px-3 py-2">Pays</th>
              <th className="px-3 py-2">Capacité</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.slug} className="border-b border-white/5 hover:bg-white/[0.03]">
                <td className="px-3 py-2">
                  {r.hasRealPhoto ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded">
                      <Image src={r.heroImageSrc} alt="" fill className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <span className="inline-block rounded bg-amber-500/15 px-2 py-1 text-[10px] text-amber-400">
                      sans photo
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <div>{r.name}</div>
                  <div className="text-xs text-white/40">{r.slug}</div>
                </td>
                <td className="px-3 py-2 text-white/70">{r.club}</td>
                <td className="px-3 py-2 text-white/70">{r.country}</td>
                <td className="px-3 py-2 tabular-nums text-white/70">{r.capacity.toLocaleString("fr-FR")}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/${r.slug}`}
                      className="rounded border border-white/15 px-2 py-1 text-xs hover:bg-white/10"
                    >
                      Modifier
                    </Link>
                    <DeleteStadiumButton slug={r.slug} name={r.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

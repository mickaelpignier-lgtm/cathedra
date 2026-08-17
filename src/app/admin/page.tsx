import Link from "next/link";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { stadiums, stadiumTranslations } from "@/db/schema";
import { AdminStadiumList, type AdminStadiumRow } from "@/components/admin/AdminStadiumList";

export default async function AdminPage() {
  const db = getDb();
  const allStadiums = await db.select().from(stadiums);
  const frTranslations = await db
    .select()
    .from(stadiumTranslations)
    .where(eq(stadiumTranslations.locale, "fr"));

  const rows: AdminStadiumRow[] = allStadiums
    .map((s) => {
      const fr = frTranslations.find((t) => t.stadiumSlug === s.slug);
      const hasRealPhoto =
        !!s.heroImageSrc && !s.heroImageSrc.includes("picsum.photos");
      return {
        slug: s.slug,
        name: fr?.name ?? s.slug,
        club: fr?.club ?? "",
        country: fr?.country ?? "",
        capacity: s.capacity,
        heroImageSrc: s.heroImageSrc,
        hasRealPhoto,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const withoutPhoto = rows.filter((r) => !r.hasRealPhoto).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Stades — Admin</h1>
          <p className="text-sm text-white/50">
            {rows.length} stades, {withoutPhoto} sans vraie photo
          </p>
        </div>
        <Link
          href="/admin/new"
          className="rounded bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
        >
          + Nouveau stade
        </Link>
      </div>
      <AdminStadiumList rows={rows} />
    </div>
  );
}

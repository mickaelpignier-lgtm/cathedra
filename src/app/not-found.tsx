import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            404
          </p>
          <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
          <Link href="/fr" className="mt-4 inline-block text-emerald-400 underline">
            Back home
          </Link>
        </div>
      </body>
    </html>
  );
}

"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import Image from "next/image";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  pathPrefix: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  pathPrefix,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const blob = await upload(`${pathPrefix}/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/admin/api/blob-upload",
      });
      onChange(blob.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-wide text-white/60">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded border border-white/15 bg-white/5">
            <Image src={value} alt="" fill className="object-cover" sizes="64px" />
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded border border-dashed border-white/20 text-[10px] text-white/40">
            vide
          </div>
        )}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10 disabled:opacity-50"
          >
            {uploading ? "Envoi..." : value ? "Remplacer" : "Choisir un fichier"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-left text-[11px] text-white/40 hover:text-white/70"
            >
              Retirer
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

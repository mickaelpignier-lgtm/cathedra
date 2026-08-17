"use client";

interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "number";
  width?: string;
}

interface KeyValueListFieldProps<T extends Record<string, unknown>> {
  label: string;
  items: T[];
  fields: FieldConfig[];
  emptyItem: T;
  onChange: (items: T[]) => void;
}

export function KeyValueListField<T extends Record<string, unknown>>({
  label,
  items,
  fields,
  emptyItem,
  onChange,
}: KeyValueListFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-wide text-white/60">{label}</label>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {fields.map((f) => (
              <input
                key={f.key}
                value={(item[f.key] as string | number | undefined) ?? ""}
                placeholder={f.label}
                type={f.type === "number" ? "number" : "text"}
                style={f.width ? { width: f.width } : undefined}
                onChange={(e) => {
                  const next = [...items];
                  const raw = e.target.value;
                  next[i] = {
                    ...next[i],
                    [f.key]: f.type === "number" ? Number(raw) : raw,
                  };
                  onChange(next);
                }}
                className="flex-1 rounded border border-white/15 bg-white/5 px-2 py-1.5 text-sm"
              />
            ))}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="rounded border border-white/15 px-2 text-white/50 hover:text-red-400"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, emptyItem])}
        className="self-start text-xs text-white/50 hover:text-white/80"
      >
        + ajouter
      </button>
    </div>
  );
}

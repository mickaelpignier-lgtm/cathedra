"use client";

import Image from "next/image";
import type { Stadium } from "@/lib/stadiums";

interface EnrichmentSectionProps {
  stadium: Stadium;
}

export function EnrichmentSection({ stadium }: EnrichmentSectionProps) {
  const hasEnrichment =
    stadium.clubLogoUrl ||
    stadium.metroLineNames.length > 0 ||
    stadium.airportName;

  if (!hasEnrichment) return null;

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Infos pratiques</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Club Colors Badge */}
          {stadium.clubLogoUrl && (
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">Couleurs du club</h3>
              <img
                src={stadium.clubLogoUrl}
                alt={`${stadium.club} colors`}
                className="w-32 h-32 rounded-full shadow-lg"
              />
              {stadium.clubColorPrimary && (
                <div className="mt-4 flex gap-2 items-center text-sm">
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: stadium.clubColorPrimary }}
                  />
                  <span>Primaire: {stadium.clubColorPrimary}</span>
                </div>
              )}
              {stadium.clubColorSecondary && (
                <div className="mt-2 flex gap-2 items-center text-sm">
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: stadium.clubColorSecondary }}
                  />
                  <span>Secondaire: {stadium.clubColorSecondary}</span>
                </div>
              )}
            </div>
          )}

          {/* Metro Lines */}
          {stadium.metroLineNames.length > 0 && (
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Lignes de métro</h3>
              <div className="flex flex-wrap gap-2">
                {stadium.metroLineColors.map((line) => (
                  <div
                    key={line.label}
                    className="px-4 py-2 rounded-full text-white font-medium text-sm"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.label}
                  </div>
                ))}
              </div>
              {stadium.metroLineNames.length > stadium.metroLineColors.length && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Autres lignes: {stadium.metroLineNames.join(", ")}</p>
                </div>
              )}
            </div>
          )}

          {/* Airport Info */}
          {stadium.airportName && (
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Aéroport</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {stadium.airportName}
              </p>
              {stadium.airportLogoUrl && (
                <img
                  src={stadium.airportLogoUrl}
                  alt={stadium.airportName}
                  className="w-24 h-24 object-contain"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

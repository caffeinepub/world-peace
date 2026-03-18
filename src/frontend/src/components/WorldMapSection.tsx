import { Skeleton } from "@/components/ui/skeleton";
import { useWorldInitiatives } from "@/hooks/useQueries";
import type { WorldInitiative } from "@/hooks/useQueries";
import { X } from "lucide-react";
import { useState } from "react";

const FALLBACK_INITIATIVES: WorldInitiative[] = [
  {
    id: BigInt(1),
    country: "Kenya",
    title: "Maasai Peace Circle",
    description:
      "Elders from rival Maasai clans gather monthly to resolve land disputes through traditional dialogue, preventing violence that once claimed hundreds of lives annually.",
    latitude: -1.3,
    longitude: 36.8,
  },
  {
    id: BigInt(2),
    country: "Colombia",
    title: "FARC Reintegration Project",
    description:
      "Former combatants and victims collaborate in agricultural cooperatives, rebuilding rural communities shattered by five decades of conflict.",
    latitude: 4.6,
    longitude: -74.1,
  },
  {
    id: BigInt(3),
    country: "Norway",
    title: "Oslo Peace Forum",
    description:
      "Annual summit bringing together world leaders, civil society, and youth to broker agreements and share peacebuilding frameworks.",
    latitude: 59.9,
    longitude: 10.7,
  },
  {
    id: BigInt(4),
    country: "Philippines",
    title: "Mindanao Youth Bridge",
    description:
      "Christian and Muslim youth in conflict-affected Mindanao co-create theatre productions that challenge prejudice and build mutual understanding.",
    latitude: 7.2,
    longitude: 124.2,
  },
  {
    id: BigInt(5),
    country: "Morocco",
    title: "Mediterranean Dialogue Centre",
    description:
      "A neutral space in Rabat facilitating track-two diplomacy between North African nations and European partners on migration and development.",
    latitude: 34.0,
    longitude: -6.8,
  },
  {
    id: BigInt(6),
    country: "India",
    title: "Amity Schools Network",
    description:
      "500 schools across communal fault lines in India implementing a shared civics curriculum focused on constitutional values and interfaith respect.",
    latitude: 20.6,
    longitude: 78.9,
  },
];

function latLonToPercent(lat: number, lon: number): { x: number; y: number } {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export function WorldMapSection() {
  const { data: initiatives, isLoading } = useWorldInitiatives();
  const [selected, setSelected] = useState<WorldInitiative | null>(null);
  const displayInitiatives =
    initiatives && initiatives.length > 0 ? initiatives : FALLBACK_INITIATIVES;

  return (
    <section id="map" className="py-24 section-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
            Global Impact
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Peace Initiatives <span className="gradient-text">Worldwide</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Click a marker to learn about peace projects happening right now
            across the globe.
          </p>
        </div>

        {isLoading ? (
          <Skeleton className="w-full h-80 rounded-2xl" />
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-peace bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/40 dark:to-teal-950/40">
            <svg
              viewBox="0 0 100 50"
              className="w-full h-auto"
              style={{ aspectRatio: "2/1" }}
              preserveAspectRatio="xMidYMid meet"
              aria-label="Interactive world map showing peace initiatives"
            >
              <title>World Peace Initiatives Map</title>
              <rect width="100" height="50" fill="transparent" />
              <path
                d="M5 8 L20 8 L22 14 L18 20 L12 22 L8 18 L5 14 Z"
                fill="oklch(0.82 0.07 230)"
                opacity="0.6"
              />
              <path
                d="M16 24 L24 24 L25 30 L22 38 L18 40 L14 36 L14 30 Z"
                fill="oklch(0.82 0.07 230)"
                opacity="0.6"
              />
              <path
                d="M43 6 L55 6 L56 12 L54 14 L50 14 L46 12 Z"
                fill="oklch(0.82 0.07 230)"
                opacity="0.6"
              />
              <path
                d="M45 15 L55 15 L57 22 L54 32 L50 34 L46 30 L44 22 Z"
                fill="oklch(0.82 0.07 230)"
                opacity="0.6"
              />
              <path
                d="M56 6 L85 6 L88 14 L84 20 L78 22 L68 20 L62 16 L58 14 Z"
                fill="oklch(0.82 0.07 230)"
                opacity="0.6"
              />
              <path
                d="M72 30 L84 30 L85 36 L80 38 L72 36 Z"
                fill="oklch(0.82 0.07 230)"
                opacity="0.6"
              />
              {displayInitiatives.map((initiative) => {
                const { x, y } = latLonToPercent(
                  initiative.latitude,
                  initiative.longitude,
                );
                return (
                  <g
                    key={initiative.id.toString()}
                    onClick={() => setSelected(initiative)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setSelected(initiative);
                    }}
                    className="cursor-pointer"
                    data-ocid="map.map_marker"
                  >
                    <circle
                      cx={`${x}`}
                      cy={`${y}`}
                      r="0.8"
                      fill="oklch(0.45 0.20 165)"
                    />
                    <circle
                      cx={`${x}`}
                      cy={`${y}`}
                      r="0.8"
                      fill="oklch(0.72 0.17 165)"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        values="0.8;2.0;0.8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0;0.5"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {selected && (
              <div
                data-ocid="map.popover"
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-background/95 backdrop-blur-sm border border-border rounded-2xl p-5 shadow-peace-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-primary mb-1">
                      {selected.country}
                    </p>
                    <h3 className="font-display text-base font-bold mb-2">
                      {selected.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selected.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

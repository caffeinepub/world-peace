import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResources } from "@/hooks/useQueries";
import { BookOpen, ExternalLink, FileText, Play } from "lucide-react";
import { useState } from "react";
import type { Resource } from "../backend.d";

const FALLBACK_RESOURCES: Resource[] = [
  {
    id: BigInt(1),
    typ: "Book",
    title: "A Long Walk to Freedom",
    description:
      "Nelson Mandela's autobiography traces his extraordinary journey from rural South Africa to the presidency, offering profound lessons on resilience and reconciliation.",
    url: "#",
  },
  {
    id: BigInt(2),
    typ: "Article",
    title: "The Science of Empathy",
    description:
      "A groundbreaking study from Stanford University explores how empathy practice can reduce prejudice and improve conflict resolution outcomes across diverse groups.",
    url: "#",
  },
  {
    id: BigInt(3),
    typ: "Video",
    title: "Building Peace from the Ground Up",
    description:
      "A TED Talk by Nobel Peace Prize laureate Leymah Gbowee on how ordinary women ended Liberia's devastating civil war through nonviolent activism.",
    url: "#",
  },
  {
    id: BigInt(4),
    typ: "Article",
    title: "Youth-Led Peace Initiatives: A Global Review",
    description:
      "The UN Peace and Security Council's 2024 review of youth-led peacebuilding programs and their measurable impact on community-level violence.",
    url: "#",
  },
  {
    id: BigInt(5),
    typ: "Book",
    title: "Nonviolent Communication",
    description:
      "Marshall Rosenberg's foundational guide to compassionate communication that has transformed conflict resolution in schools, workplaces, and communities worldwide.",
    url: "#",
  },
  {
    id: BigInt(6),
    typ: "Video",
    title: "The Anatomy of a Conflict",
    description:
      "A documentary series examining the root causes of five major conflicts, and the peace processes that eventually brought resolution — or failed to.",
    url: "#",
  },
];

const TYPE_ICONS: Record<string, typeof BookOpen> = {
  Book: BookOpen,
  Article: FileText,
  Video: Play,
};

const TYPE_COLORS: Record<string, string> = {
  Book: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Article: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Video: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export function ResourcesSection() {
  const [activeTab, setActiveTab] = useState("All");
  const { data: resources, isLoading } = useResources();
  const displayResources =
    resources && resources.length > 0 ? resources : FALLBACK_RESOURCES;
  const filtered =
    activeTab === "All"
      ? displayResources
      : displayResources.filter((r) => r.typ === activeTab);

  return (
    <section id="resources" className="py-24 section-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
            Resources
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Learn &amp; <span className="gradient-text">Grow</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Curated books, articles, and videos to deepen your understanding of
            peace, empathy, and conflict resolution.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {["All", "Article", "Book", "Video"].map((tab) => (
                <TabsTrigger key={tab} value={tab} data-ocid="resources.tab">
                  {tab}s
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => i).map((i) => (
              <Skeleton key={`res-skel-${i}`} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource, i) => {
              const Icon = TYPE_ICONS[resource.typ] ?? FileText;
              const ocidMap = [
                "resources.card.1",
                "resources.card.2",
                "resources.card.3",
                "resources.card.4",
                "resources.card.5",
                "resources.card.6",
              ];
              return (
                <div
                  key={resource.id.toString()}
                  data-ocid={ocidMap[i] ?? `resources.item.${i + 1}`}
                  className="rounded-2xl border border-border bg-card shadow-xs hover:shadow-peace transition-all duration-300 hover:-translate-y-1 p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        TYPE_COLORS[resource.typ] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {resource.typ}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold mb-2 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {resource.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary gap-1.5 p-0 h-auto hover:underline"
                    asChild
                  >
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resource <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

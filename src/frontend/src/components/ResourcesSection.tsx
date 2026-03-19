import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ExternalLink, FileText, Play } from "lucide-react";
import { useState } from "react";

interface Resource {
  id: number;
  typ: "Book" | "Article" | "Video";
  title: string;
  description: string;
  url: string;
  youtubeId?: string;
}

const RESOURCES: Resource[] = [
  {
    id: 1,
    typ: "Book",
    title: "A Long Walk to Freedom",
    description:
      "Nelson Mandela's autobiography traces his extraordinary journey from rural South Africa to the presidency, offering profound lessons on resilience and reconciliation.",
    url: "https://books.google.com/books?id=E7dSNAAACAAJ",
  },
  {
    id: 2,
    typ: "Book",
    title: "Nonviolent Communication",
    description:
      "Marshall Rosenberg's foundational guide to compassionate communication that has transformed conflict resolution in schools, workplaces, and communities worldwide.",
    url: "https://books.google.com/books?id=A3qACgAAQBAJ",
  },
  {
    id: 3,
    typ: "Book",
    title: "The Art of Peace",
    description:
      "A collection of teachings by Morihei Ueshiba, founder of Aikido, on achieving harmony, resolving conflict peacefully, and cultivating inner strength for a better world.",
    url: "https://books.google.com/books?q=the+art+of+peace+morihei+ueshiba",
  },
  {
    id: 4,
    typ: "Article",
    title: "The Science of Empathy",
    description:
      "A groundbreaking study from Berkeley explores how empathy practice can reduce prejudice and improve conflict resolution outcomes across diverse groups.",
    url: "https://greatergood.berkeley.edu/article/item/how_empathy_can_break_down_prejudice",
  },
  {
    id: 5,
    typ: "Article",
    title: "Youth-Led Peace Initiatives: A Global Review",
    description:
      "The UN Peacebuilding Support Office's review of youth-led programs and their measurable impact on community-level violence reduction worldwide.",
    url: "https://www.un.org/peacebuilding/youth",
  },
  {
    id: 6,
    typ: "Article",
    title: "How Dialogue Ends Wars",
    description:
      "An in-depth analysis from the United States Institute of Peace on the role of grassroots dialogue, mediation, and diplomacy in ending armed conflicts.",
    url: "https://www.usip.org/publications/2021/12/how-to-prevent-armed-conflict",
  },
  {
    id: 7,
    typ: "Video",
    title: "Building Peace from the Ground Up",
    description:
      "Nobel Peace Prize laureate Leymah Gbowee shares how ordinary women ended Liberia's civil war through nonviolent activism in this powerful TED Talk.",
    url: "https://www.youtube.com/watch?v=5psHFqYaSbE",
    youtubeId: "5psHFqYaSbE",
  },
  {
    id: 8,
    typ: "Video",
    title: "Why Peace Is Always Possible",
    description:
      "Harvard psychologist Steven Pinker presents compelling evidence that violence has declined over millennia and explains the forces driving humanity toward greater peace.",
    url: "https://www.youtube.com/watch?v=ramBFRt1Uzk",
    youtubeId: "ramBFRt1Uzk",
  },
  {
    id: 9,
    typ: "Video",
    title: "The Power of Nonviolence",
    description:
      "A documentary-style TED Talk exploring Mahatma Gandhi's philosophy of nonviolence and how its principles continue to inspire peace movements around the world today.",
    url: "https://www.youtube.com/watch?v=SOBl_bvnZpA",
    youtubeId: "SOBl_bvnZpA",
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
  const [videoModal, setVideoModal] = useState<Resource | null>(null);

  const filtered =
    activeTab === "All"
      ? RESOURCES
      : RESOURCES.filter((r) => r.typ === activeTab);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource, i) => {
            const Icon = TYPE_ICONS[resource.typ] ?? FileText;
            const isVideo = resource.typ === "Video";
            return (
              <div
                key={resource.id}
                data-ocid={`resources.card.${i + 1}`}
                className="rounded-2xl border border-border bg-card shadow-xs hover:shadow-peace transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isVideo ? "bg-red-100 dark:bg-red-900/30" : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isVideo
                          ? "text-red-600 dark:text-red-400"
                          : "text-muted-foreground"
                      }`}
                    />
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

                {isVideo && resource.youtubeId && (
                  <button
                    type="button"
                    className="relative mb-4 rounded-xl overflow-hidden bg-black aspect-video w-full group focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => setVideoModal(resource)}
                    aria-label={`Watch video: ${resource.title}`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${resource.youtubeId}/hqdefault.jpg`}
                      alt={resource.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play
                          className="w-5 h-5 text-white ml-0.5"
                          fill="white"
                        />
                      </div>
                    </div>
                  </button>
                )}

                <h3 className="font-display text-base font-bold mb-2 leading-snug">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                  {resource.description}
                </p>

                {isVideo ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 dark:text-red-400 gap-1.5 p-0 h-auto hover:underline self-start"
                    onClick={() => setVideoModal(resource)}
                  >
                    <Play className="w-3.5 h-3.5" /> Watch Video
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary gap-1.5 p-0 h-auto hover:underline self-start"
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
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Dialog
        open={!!videoModal}
        onOpenChange={(open) => !open && setVideoModal(null)}
      >
        <DialogContent className="max-w-3xl w-full p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="px-6 pt-5 pb-3">
            <DialogTitle className="text-lg font-bold leading-snug">
              {videoModal?.title}
            </DialogTitle>
          </DialogHeader>
          {videoModal?.youtubeId && (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoModal.youtubeId}?autoplay=1&rel=0`}
                title={videoModal?.title ?? "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          <div className="px-6 py-4">
            <p className="text-muted-foreground text-sm">
              {videoModal?.description}
            </p>
            <a
              href={videoModal?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2"
            >
              Open on YouTube <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeaceStories } from "@/hooks/useQueries";
import type { PeaceStory } from "../backend.d";

const FALLBACK_STORIES: PeaceStory[] = [
  {
    id: BigInt(1),
    region: "East Africa",
    title: "Women Weaving Peace in Rwanda",
    summary:
      "Twenty years after the genocide, Rwandan women from opposing sides are literally weaving reconciliation — creating cooperatives that generate income and rebuild trust across ethnic lines.",
    author: "Amina Nkurunziza",
    imageHint: "rwanda women weaving",
  },
  {
    id: BigInt(2),
    region: "Middle East",
    title: "Seeds of Hope in Jordan",
    summary:
      "Syrian refugees and Jordanian farmers cultivate shared gardens in a desert valley, turning scarcity into abundance through cooperation and teaching the next generation that neighbors need not be enemies.",
    author: "Khalid Al-Rashidi",
    imageHint: "desert garden community",
  },
  {
    id: BigInt(3),
    region: "South Asia",
    title: "Music Without Borders",
    summary:
      "Pakistani and Indian musicians collaborate across the Line of Control, streaming live concerts that reach millions and proving that art dissolves the barriers politicians erect.",
    author: "Priya Sharma",
    imageHint: "musicians concert unity",
  },
  {
    id: BigInt(4),
    region: "West Africa",
    title: "Youth Diplomats of Lagos",
    summary:
      "A network of 200 young diplomats from 15 different ethnic groups in Nigeria mediate community disputes using restorative justice principles learned from indigenous tradition.",
    author: "Emeka Obi",
    imageHint: "youth diplomats nigeria",
  },
  {
    id: BigInt(5),
    region: "Europe",
    title: "The Bridge School of Sarajevo",
    summary:
      "A school straddling the river Drina brings together children from Bosnia, Serbia, and Croatia in a curriculum built entirely around shared history and collaborative storytelling.",
    author: "Marija Kova\u010devi\u0107",
    imageHint: "school sarajevo bridge",
  },
];

const REGION_COLORS: Record<string, string> = {
  "East Africa":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Middle East":
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "South Asia":
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "West Africa":
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Europe: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

function StoryCard({ story, index }: { story: PeaceStory; index: number }) {
  const ocidMap = [
    "stories.card.1",
    "stories.card.2",
    "stories.card.3",
    "stories.card.4",
    "stories.card.5",
  ];
  return (
    <div
      data-ocid={ocidMap[index] ?? `stories.item.${index + 1}`}
      className="flex-none w-80 sm:w-auto rounded-2xl border border-border bg-card shadow-peace overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-peace-lg"
    >
      <div className="h-3 bg-gradient-to-r from-primary/60 via-secondary/60 to-accent/60" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              REGION_COLORS[story.region] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {story.region}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold mb-2 leading-snug">
          {story.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
          {story.summary}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            By {story.author}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary text-xs hover:underline p-0 h-auto"
          >
            Read More →
          </Button>
        </div>
      </div>
    </div>
  );
}

export function StoriesSection() {
  const { data: stories, isLoading } = usePeaceStories();
  const displayStories =
    stories && stories.length > 0 ? stories : FALLBACK_STORIES;

  return (
    <section id="stories" className="py-24 section-ocean overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-peace-teal mb-4 px-3 py-1 bg-peace-teal/10 rounded-full">
            Peace Stories
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Real People, <span className="gradient-text">Real Change</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            From every corner of the world, ordinary people are doing
            extraordinary things for peace.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {Array.from({ length: 5 }, (_, i) => i).map((i) => (
            <Skeleton key={`story-skel-${i}`} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="px-4 sm:container sm:mx-auto">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory sm:snap-none">
            {displayStories.map((story, i) => (
              <div key={story.id.toString()} className="snap-start">
                <StoryCard story={story} index={i} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

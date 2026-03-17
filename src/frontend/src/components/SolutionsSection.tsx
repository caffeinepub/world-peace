import { BookOpen, Globe, Heart, MessageSquare, Users } from "lucide-react";
import { useEffect, useRef } from "react";

const SOLUTIONS = [
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Universal access to quality education builds critical thinking, empathy, and informed citizens who reject extremism.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Cultural Understanding",
    description:
      "Exchange programs, arts, and shared stories dissolve stereotypes and build genuine cross-cultural friendships.",
    gradient: "from-teal-500 to-green-500",
  },
  {
    icon: Users,
    title: "Youth Leadership",
    description:
      "Young leaders are the architects of tomorrow's peace. Supporting youth voice and agency is an investment in the future.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageSquare,
    title: "Dialogue & Diplomacy",
    description:
      "Structured dialogue and skilled diplomacy turn adversaries into partners, resolving disputes without violence.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Heart,
    title: "Community Cooperation",
    description:
      "Local peacebuilding — neighborhood by neighborhood, village by village — creates the grassroots foundation for global harmony.",
    gradient: "from-rose-500 to-red-500",
  },
];

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".solution-card");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const c of Array.from(cards)) observer.observe(c);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="solutions" className="py-24 section-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent-foreground mb-4 px-3 py-1 bg-accent/20 rounded-full">
            Peace Solutions
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Pathways to a <span className="gradient-text">Better World</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real solutions exist. Through collaboration and commitment, we can
            build the peace our world deserves.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="solution-card rounded-2xl p-6 bg-card border border-border shadow-peace hover:-translate-y-2 transition-all duration-300 hover:shadow-peace-lg cursor-default"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.3s ease`,
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 shadow-sm`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-base font-bold mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Flame, Scale, Sword, Wheat } from "lucide-react";
import { useEffect, useRef } from "react";

const CHALLENGES = [
  {
    icon: Sword,
    title: "War & Conflict",
    description:
      "Armed conflicts displace millions, destroy infrastructure, and leave generational trauma that can span centuries.",
    stat: "120+ Active Conflicts Worldwide",
    color: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/30",
    iconColor: "text-red-400",
  },
  {
    icon: Scale,
    title: "Discrimination & Inequality",
    description:
      "Systemic racism, gender inequality, and religious persecution undermine the dignity and rights of billions.",
    stat: "3.4B People Face Discrimination",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Wheat,
    title: "Poverty & Hunger",
    description:
      "Economic desperation fuels conflict. Nearly a billion people face food insecurity, creating conditions for unrest.",
    stat: "733M People Go Hungry Daily",
    color: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: Flame,
    title: "Climate Conflicts",
    description:
      "Resource scarcity driven by climate change is already sparking conflicts over water, land, and food.",
    stat: "40% of Conflicts Linked to Climate",
    color: "from-teal-500/20 to-cyan-500/20",
    border: "border-teal-500/30",
    iconColor: "text-teal-400",
  },
];

export function ChallengesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".challenge-card");
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    for (const c of Array.from(cards)) observer.observe(c);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="challenges" className="py-24 section-ocean">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-peace-teal mb-4 px-3 py-1 bg-peace-teal/10 rounded-full">
            Global Challenges
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            The Obstacles to <span className="gradient-text">Peace</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Understanding the root causes of conflict is the first step toward
            building lasting peace.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHALLENGES.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={`challenge-card glass-card rounded-2xl p-6 bg-gradient-to-br ${c.color} border ${c.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-glow cursor-default`}
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 ${c.iconColor}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {c.description}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/80 text-xs font-semibold">
                    {c.stat}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

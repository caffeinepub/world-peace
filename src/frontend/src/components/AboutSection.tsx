import { useEffect, useRef } from "react";

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

function StatCard({ value, label, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("animate-fade-in-up");
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
    >
      <p className="font-display text-3xl font-bold gradient-text mb-1">
        {value}
      </p>
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
    </div>
  );
}

export function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 section-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={leftRef} className="section-reveal-left">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
              What Is Global Peace?
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
              A World United <span className="gradient-text">in Harmony</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Global peace is not merely the absence of war — it is the active
                presence of justice, equality, and mutual respect among all
                peoples and nations. It means creating conditions where every
                human being can live freely, safely, and with dignity.
              </p>
              <p>
                At its heart, peace requires{" "}
                <strong className="text-foreground">tolerance</strong> — the
                willingness to accept and respect differences in culture,
                religion, and belief. When we choose understanding over
                judgment, we break cycles of conflict before they begin.
              </p>
              <p>
                <strong className="text-foreground">Empathy</strong> is the
                bridge between strangers. When we actively seek to understand
                others&apos; experiences, we build bonds stronger than any
                political border. True peace grows when communities across the
                world recognize our shared humanity.
              </p>
              <p>
                Through <strong className="text-foreground">cooperation</strong>{" "}
                — in trade, culture, science, and diplomacy — nations transform
                potential rivalries into partnerships. Together, we solve
                problems no single nation could face alone.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-10">
              <StatCard value="8B+" label="People Deserve Peace" delay={0} />
              <StatCard value="195" label="Nations, One Goal" delay={150} />
              <StatCard value="1M+" label="Peace Advocates" delay={300} />
            </div>
          </div>

          <div ref={rightRef} className="section-reveal-right relative">
            <div className="relative rounded-2xl overflow-hidden shadow-peace-lg">
              <img
                src="/assets/generated/about-peace.dim_800x500.jpg"
                alt="Diverse community united for peace"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-peace-green/20 to-peace-teal/20 blur-2xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PEACE_QUOTES = [
  {
    quote:
      "Peace cannot be kept by force; it can only be achieved by understanding.",
    author: "Albert Einstein",
  },
  {
    quote:
      "If you want peace, you don't talk to your friends. You talk to your enemies.",
    author: "Desmond Tutu",
  },
  {
    quote:
      "We must learn to live together as brothers or perish together as fools.",
    author: "Martin Luther King Jr.",
  },
  {
    quote: "One child, one teacher, one book, one pen can change the world.",
    author: "Malala Yousafzai",
  },
  {
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
];

const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  w: 2 + ((i * 7) % 4),
  h: 2 + ((i * 3) % 4),
  left: (i * 13 + 5) % 100,
  top: (i * 17 + 10) % 100,
  dur: 8 + (i % 10),
  delay: (i * 2) % 5,
  opacity: 0.3 + (i % 5) * 0.1,
}));

export function HeroSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const particleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % PEACE_QUOTES.length);
        setQuoteVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-globe.dim_1200x700.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.09_255/0.85)] via-[oklch(0.15_0.08_255/0.75)] to-[oklch(0.08_0.06_255/0.95)]" />

      <div
        ref={particleContainer}
        className="absolute inset-0 pointer-events-none"
      >
        {PARTICLE_DATA.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8 text-white/90 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-peace-green animate-pulse" />
          Global Peace Initiative
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-4">
          World{" "}
          <span
            className="block mt-1"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.17 165), oklch(0.65 0.14 210))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Peace
          </span>
        </h1>

        <p className="text-white/70 text-xl sm:text-2xl font-semibold italic mb-4 tracking-wide">
          &ldquo;Peace Begins With Us.&rdquo;
        </p>

        <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join millions of people across the globe in creating a future of
          peace, unity, and shared humanity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            data-ocid="hero.primary_button"
            className="bg-gradient-to-r from-peace-teal to-peace-green text-white border-0 shadow-glow px-8 py-6 text-base font-semibold hover:opacity-90 transition-opacity rounded-full"
            asChild
          >
            <a href="#action">Join the Peace Movement</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            data-ocid="hero.secondary_button"
            className="border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-6 text-base font-medium rounded-full"
            asChild
          >
            <a href="#about" className="flex items-center gap-2">
              Learn More <ChevronDown className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-peace-ocean/80 via-peace-teal/70 to-peace-ocean/80 backdrop-blur-sm border-t border-white/10 py-4 px-4">
        <div
          className="text-center"
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: `translateY(${quoteVisible ? 0 : 8}px)`,
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-white/90 text-sm italic">
            &ldquo;{PEACE_QUOTES[quoteIndex].quote}&rdquo;
          </p>
          <p className="text-peace-green text-xs mt-1 font-semibold">
            — {PEACE_QUOTES[quoteIndex].author}
          </p>
        </div>
      </div>
    </section>
  );
}

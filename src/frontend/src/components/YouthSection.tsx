import { Button } from "@/components/ui/button";
import { Laptop, Megaphone, Plane, Users2 } from "lucide-react";

const ACTIVITIES = [
  {
    icon: Users2,
    title: "Youth Summits",
    description:
      "Annual gatherings of 500+ young peacebuilders from 60+ countries to share ideas and forge global friendships.",
  },
  {
    icon: Megaphone,
    title: "Volunteer Campaigns",
    description:
      "Local volunteering opportunities connecting young people to grassroots peace and reconciliation efforts.",
  },
  {
    icon: Laptop,
    title: "Online Activism",
    description:
      "Digital tools, training, and platforms for young activists to amplify their message globally.",
  },
  {
    icon: Plane,
    title: "Cultural Exchange",
    description:
      "Immersive cultural exchange programs building lifelong bonds across national and cultural divides.",
  },
];

export function YouthSection() {
  return (
    <section id="youth" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/youth-peace.dim_800x500.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.09_255/0.88)] to-[oklch(0.10_0.07_255/0.95)]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-peace-green mb-4 px-3 py-1 bg-peace-green/20 rounded-full">
            Youth for Peace
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Young Voices, <span className="gradient-text">Powerful Change</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The next generation holds the key to lasting peace. We equip young
            people with the skills, networks, and platforms to become agents of
            change in their communities and beyond.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {ACTIVITIES.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="glass-card rounded-2xl p-6 text-white"
              >
                <div className="w-10 h-10 rounded-lg bg-peace-green/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-peace-green" />
                </div>
                <h3 className="font-display text-base font-bold mb-2">
                  {a.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {a.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            data-ocid="youth.primary_button"
            className="bg-gradient-to-r from-peace-green to-peace-teal text-white border-0 shadow-glow px-10 py-6 text-base font-semibold rounded-full hover:opacity-90 transition-opacity"
            asChild
          >
            <a href="#action">Get Involved Today</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

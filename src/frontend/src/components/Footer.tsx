import { Bird } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-[oklch(0.10_0.05_255)] border-t border-white/5 py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peace-teal to-peace-green flex items-center justify-center">
                <Bird className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                World <span className="gradient-text">Peace</span>
              </span>
            </div>
            <p className="text-peace-green/80 text-xs italic mb-4">
              Peace Begins With Us.
            </p>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed mb-6">
              A global movement inspiring peace, unity, and cooperation across
              cultures and nations. Together, we build the future our children
              deserve.
            </p>
            <div className="flex gap-3">
              {[
                { icon: SiX, label: "X", href: "https://twitter.com" },
                {
                  icon: SiFacebook,
                  label: "Facebook",
                  href: "https://facebook.com",
                },
                {
                  icon: SiInstagram,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                {
                  icon: SiLinkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                ["About", "#about"],
                ["Challenges", "#challenges"],
                ["Solutions", "#solutions"],
                ["Stories", "#stories"],
                ["Youth for Peace", "#youth"],
                ["World Map", "#map"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Act */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2">
              {[
                ["Take Action", "#action"],
                ["Community Wall", "#community"],
                ["Resources", "#resources"],
                ["Contact Us", "#contact"],
                ["Newsletter", "#contact"],
                ["Volunteer", "#action"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>
            © {year} World Peace – Global Peace Initiative. All rights reserved.
          </p>
          <p>
            Built with ♥ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-peace-teal hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

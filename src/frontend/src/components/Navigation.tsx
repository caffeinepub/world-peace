import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bird, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavigationProps {
  darkMode: boolean;
  onToggleDark: () => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Challenges", href: "#challenges" },
  { label: "Solutions", href: "#solutions" },
  { label: "Stories", href: "#stories" },
  { label: "Act", href: "#action" },
  { label: "Community", href: "#community" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

const LANGUAGES = ["EN", "FR", "ES", "AR"];

export function Navigation({
  darkMode,
  onToggleDark,
  language,
  onChangeLanguage,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-peace"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peace-teal to-peace-green flex items-center justify-center shadow-glow">
            <Bird className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span
              className={
                scrolled || darkMode ? "text-foreground" : "text-white"
              }
            >
              World
            </span>{" "}
            <span className="gradient-text">Peace</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid="nav.link"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-primary/10 hover:text-primary ${
                  scrolled || darkMode ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                data-ocid="nav.language_select"
                className={`gap-1 text-sm ${
                  scrolled || darkMode ? "text-foreground" : "text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => onChangeLanguage(lang)}
                  className={lang === language ? "font-bold" : ""}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark mode */}
          <Button
            variant="ghost"
            size="icon"
            data-ocid="nav.toggle"
            onClick={onToggleDark}
            className={scrolled || darkMode ? "text-foreground" : "text-white"}
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${scrolled || darkMode ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border px-4 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

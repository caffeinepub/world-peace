import { AboutSection } from "@/components/AboutSection";
import { ActionSection } from "@/components/ActionSection";
import { AuthorSection } from "@/components/AuthorSection";
import { ChallengesSection } from "@/components/ChallengesSection";
import { CommunitySection } from "@/components/CommunitySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { GlobalLeadersSection } from "@/components/GlobalLeadersSection";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { PeaceInActionSection } from "@/components/PeaceInActionSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { StoriesSection } from "@/components/StoriesSection";
import { WorldMapSection } from "@/components/WorldMapSection";
import { YouthSection } from "@/components/YouthSection";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((v) => !v)}
        language={language}
        onChangeLanguage={setLanguage}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <ChallengesSection />
        <SolutionsSection />
        <StoriesSection />
        <YouthSection />
        <WorldMapSection />
        <ActionSection />
        <CommunitySection />
        <GlobalLeadersSection />
        <PeaceInActionSection />
        <ResourcesSection />
        <ContactSection />
        <AuthorSection />
      </main>

      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

import { useEffect, useRef } from "react";

export function useScrollReveal(className = "section-reveal") {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    const targets = el.querySelectorAll(`.${className}`);
    if (el.classList.contains(className)) observer.observe(el);
    for (const t of Array.from(targets)) observer.observe(t);

    return () => observer.disconnect();
  }, [className]);

  return ref;
}

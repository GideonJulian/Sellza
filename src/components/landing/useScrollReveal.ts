import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { elementRef, isRevealed };
}

export function getRevealClassName(isRevealed: boolean) {
  return `${isRevealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} motion-reduce:translate-y-0 motion-reduce:opacity-100`;
}

const staggerDelays = [
  "delay-0",
  "delay-75",
  "delay-150",
  "delay-200",
] as const;

export function getStaggerDelayClass(index: number) {
  return staggerDelays[Math.min(index, staggerDelays.length - 1)];
}

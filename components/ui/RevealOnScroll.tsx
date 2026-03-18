"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function RevealOnScroll({
  children,
  className,
  delayMs = 0
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style = {
    transitionDelay: `${delayMs}ms`
  } satisfies CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-up ${isVisible ? "reveal-up--visible" : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

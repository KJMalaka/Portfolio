import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a boolean `isVisible`.
 * Attach the ref to a DOM element — it gains `revealed` class when scrolled into view.
 * Triggers only once (unobserves after first intersection).
 */
export function useRevealOnScroll(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — reveal immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

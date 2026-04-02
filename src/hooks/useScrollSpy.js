import { useState, useEffect } from 'react';

/**
 * Returns the id of the section currently in view, updating as the user scrolls.
 * Uses IntersectionObserver — no scroll event listeners.
 */
export function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Fires when element enters top 35% of viewport
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

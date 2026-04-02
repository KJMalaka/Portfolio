import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only activate on pointer-fine devices (no touch)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('custom-cursor-active');
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animateRing);
    };

    const onEnterLink = (e) => {
      const isProject = e.target.closest('[data-cursor="project"]');
      if (isProject) {
        dot.classList.remove('hovering-link');
        ring.classList.remove('hovering-link');
        dot.classList.add('hovering-project');
        ring.classList.add('hovering-project');
      } else {
        dot.classList.remove('hovering-project');
        ring.classList.remove('hovering-project');
        dot.classList.add('hovering-link');
        ring.classList.add('hovering-link');
      }
    };

    const onLeaveLink = () => {
      dot.classList.remove('hovering-link', 'hovering-project');
      ring.classList.remove('hovering-link', 'hovering-project');
    };

    window.addEventListener('mousemove', onMove);

    document.querySelectorAll('a, button, [role="button"], [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    animateRing();

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * Wrapper that applies scroll-reveal to any child element.
 * Exists so we can safely use the hook once per wrapper instead of inside .map()
 */
export default function RevealWrapper({ children, direction = 'up', delay = 0, className = '' }) {
  const { ref } = useRevealOnScroll();

  const dirClass =
    direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : 'reveal';

  return (
    <div
      ref={ref}
      className={`${dirClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

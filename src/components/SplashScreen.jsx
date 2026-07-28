import { useEffect, useState } from 'react';
import { personal } from '../data/portfolio';

const SPLASH_KEY = 'kjm-splash-shown';

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SPLASH_KEY));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    sessionStorage.setItem(SPLASH_KEY, '1');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdDuration = prefersReducedMotion ? 50 : 1500;
    const fadeDuration = prefersReducedMotion ? 50 : 450;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const fadeTimer = setTimeout(() => setFading(true), holdDuration);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, holdDuration + fadeDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Site loading"
    >
      <div
        className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-600/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative glass-strong rounded-2xl px-10 py-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-2xl text-white font-mono shadow-lg shadow-blue-500/30">
          {personal.initials}
        </div>
        <p className="font-mono text-sm text-slate-300">
          <span className="text-blue-400">$</span> booting katlego.dev
          <span className="terminal-cursor ml-1" aria-hidden="true" />
        </p>
        <div className="mt-5 h-1 w-40 mx-auto bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 animate-splash-bar" />
        </div>
      </div>
    </div>
  );
}

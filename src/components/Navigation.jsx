import { useState, useEffect } from 'react';
import { Menu, X, Droplets, Moon } from 'lucide-react';
import { personal } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

const NAV_SECTIONS = ['home', 'about', 'skills', 'projects', 'achievements', 'certificates', 'experience', 'contact'];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isLiquid, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    );

    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 group focus-visible:outline-none font-mono"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-blue-500/30">
              {personal.initials}
            </div>
            <span className="font-semibold text-slate-100 text-sm hidden sm:block">
              {personal.shortName}
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                  activeSection === s
                    ? 'bg-blue-500/15 text-blue-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isLiquid
                  ? 'text-cyan-300 hover:bg-white/10'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
              }`}
              aria-pressed={isLiquid}
              aria-label={isLiquid ? 'Switch to dark theme' : 'Switch to Liquid Glass theme'}
              title={isLiquid ? 'Switch to dark theme' : 'Switch to Liquid Glass theme'}
            >
              {isLiquid ? <Moon size={18} /> : <Droplets size={18} />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="glass-strong md:hidden mx-4 mb-4 rounded-xl px-2 py-2 border-t border-slate-800 animate-fade-in"
          >
            {NAV_SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg capitalize text-sm font-mono transition-colors ${
                  activeSection === s
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}


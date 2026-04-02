import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../context/ThemeContext';
import { personal } from '../data/portfolio';

const NAV_SECTIONS = ['home', 'about', 'projects', 'achievements', 'skills', 'contact'];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(NAV_SECTIONS);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/10 border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="Back to top"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              KM
            </div>
            <span className="font-semibold text-slate-900 dark:text-white hidden sm:block">
              Katlego Malaka
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeSection === s
                    ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Download CV */}
            <a
              href={personal.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-md shadow-blue-500/20"
              aria-label="Download CV"
            >
              <Download size={14} />
              CV
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            className="md:hidden pb-4 pt-2 border-t border-slate-200 dark:border-slate-800 animate-fade-in"
          >
            {NAV_SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg capitalize text-sm font-medium transition-colors ${
                  activeSection === s
                    ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
            <a
              href={personal.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-2 mx-4 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download size={14} /> Download CV
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

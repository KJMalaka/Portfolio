import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Award } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import { personal, terminalLines } from '../data/portfolio';

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentTyping, setCurrentTyping] = useState(0);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setVisibleLines(terminalLines.map((l) => ({ ...l, done: true })));
      setCurrentTyping(terminalLines.length);
      return;
    }

    let lineIndex = 0;

    const showNextLine = () => {
      if (lineIndex >= terminalLines.length) return;
      const line = terminalLines[lineIndex];
      setVisibleLines((prev) => [...prev, { ...line, done: false }]);
      setCurrentTyping(lineIndex);

      // Mark line as done after its typing animation (~650ms per line)
      setTimeout(() => {
        setVisibleLines((prev) =>
          prev.map((l, i) => (i === lineIndex ? { ...l, done: true } : l))
        );
        lineIndex++;
        setTimeout(showNextLine, 180);
      }, 700);
    };

    const startTimer = setTimeout(showNextLine, 400);
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <div className="terminal-window p-5 w-full max-w-xl mx-auto text-left" role="region" aria-label="Terminal animation">
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-slate-500 text-xs font-mono">katlego@dev:~</span>
      </div>

      <div className="space-y-1" aria-live="polite">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={`font-mono text-xs sm:text-sm ${
              line.done ? 'terminal-line done' : 'terminal-line active'
            } ${
              line.isCursor
                ? 'text-blue-400'
                : i === 0
                ? 'text-slate-400'
                : 'text-green-400'
            }`}
            style={
              !prefersReducedMotion.current && !line.done
                ? { animationDuration: `${Math.max(line.text.length * 18, 400)}ms` }
                : {}
            }
          >
            {line.isCursor ? (
              <span className="text-slate-400">
                {line.text.replace('_', '')}
                <span className="terminal-cursor" aria-hidden="true" />
              </span>
            ) : (
              line.text
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950"
      aria-label="Hero"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.12) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">

        {/* Achievement badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/25 backdrop-blur-sm">
            <Award size={12} aria-hidden="true" />
            🥈 MICT SETA 2026 — Grand Finale
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/25 backdrop-blur-sm">
            <Award size={12} aria-hidden="true" />
            🥈 Telkom10X Hackathon 2025
          </span>
        </div>

        {/* Profile photo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl ring-2 ring-blue-500/40 ring-offset-2 ring-offset-slate-950 shadow-2xl shadow-blue-500/20 overflow-hidden">
              <img
                src={personal.photo}
                alt={personal.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Available dot */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-950 shadow-lg"
              title="Open to opportunities"
              aria-label="Available for opportunities"
            />
          </div>
        </div>

        {/* Terminal */}
        <div className="mb-8">
          <TerminalWindow />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-black mb-3 leading-tight">
          <span className="gradient-text">{personal.tagline}</span>
        </h1>
        <p className="text-slate-400 dark:text-slate-400 text-base sm:text-lg mb-2 font-medium">
          {personal.subtitle}
        </p>
        <p className="text-slate-500 text-sm mb-10">
          {personal.availabilityNote}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={scrollToProjects}
            className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            View Projects
          </button>
          <button
            onClick={scrollToContact}
            className="px-7 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Get in Touch
          </button>
          <a
            href={`mailto:${personal.email}`}
            className="px-7 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 backdrop-blur-sm flex items-center gap-2"
            aria-label="Send email"
          >
            <Mail size={15} aria-hidden="true" />
            Email
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-slate-500 hover:text-white transition-colors hover:-translate-y-0.5 inline-block"
          >
            <Github size={22} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-slate-500 hover:text-blue-400 transition-colors hover:-translate-y-0.5 inline-block"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}

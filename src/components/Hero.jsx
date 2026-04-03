import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Award, Sparkles } from 'lucide-react';
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
      <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm shadow-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm shadow-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm shadow-green-500/50" />
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

      {/* Animated gradient blobs */}
      <div
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-[0.12] animate-blob pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-purple-600 rounded-full blur-[120px] opacity-[0.12] animate-blob animation-delay-2000 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600 rounded-full blur-[130px] opacity-[0.08] animate-blob animation-delay-4000 pointer-events-none"
        aria-hidden="true"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        aria-hidden="true"
      />

      {/* Top radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(168,85,247,0.10) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">

        {/* Achievement badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 backdrop-blur-sm shadow-lg shadow-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all">
            <Award size={12} aria-hidden="true" />
            🥈 MICT SETA 2026 — Western Cape 2nd
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all">
            <Award size={12} aria-hidden="true" />
            🥈 Telkom10X Hackathon 2025
          </span>
        </div>

        {/* Profile photo with spinning gradient ring */}
        <div className="flex justify-center mb-8">
          <div className="relative group" style={{ isolation: 'isolate' }}>
            {/* Spinning gradient ring */}
            <div
              className="absolute -inset-[3px] rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #06b6d4, #3b82f6)',
                animation: 'spin 4s linear infinite',
                borderRadius: '18px',
                zIndex: -1,
              }}
              aria-hidden="true"
            />
            {/* Glow behind ring */}
            <div
              className="absolute -inset-[3px] rounded-2xl opacity-40 group-hover:opacity-70 blur-md transition-opacity duration-500"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #06b6d4, #3b82f6)',
                animation: 'spin 4s linear infinite',
                zIndex: -2,
              }}
              aria-hidden="true"
            />
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
              <img
                src={personal.photo}
                alt={personal.name}
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'; }}
              />
            </div>
            {/* Available dot */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-950 z-10"
              style={{ boxShadow: '0 0 0 2px rgba(34,197,94,0.3), 0 0 12px rgba(34,197,94,0.6)' }}
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
        <h1 className="text-4xl sm:text-6xl font-black mb-3 leading-tight tracking-tight">
          <span className="gradient-text">{personal.tagline}</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mb-2 font-medium">
          {personal.subtitle}
        </p>
        <p className="text-slate-500 text-sm mb-10 flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-blue-400" aria-hidden="true" />
          {personal.availabilityNote}
          <Sparkles size={13} className="text-purple-400" aria-hidden="true" />
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={scrollToProjects}
            className="btn-glow px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 text-sm"
          >
            View Projects
          </button>
          <button
            onClick={scrollToContact}
            className="btn-glow px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/15 hover:border-white/30 transition-all hover:-translate-y-1 backdrop-blur-sm text-sm"
          >
            Get in Touch
          </button>
          <a
            href={`mailto:${personal.email}`}
            className="btn-glow px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/15 hover:border-white/30 transition-all hover:-translate-y-1 backdrop-blur-sm flex items-center gap-2 text-sm"
            aria-label="Send email"
          >
            <Mail size={15} aria-hidden="true" />
            Email
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-5">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-slate-500 hover:text-white transition-all hover:-translate-y-1 inline-block hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            <Github size={22} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-slate-500 hover:text-blue-400 transition-all hover:-translate-y-1 inline-block hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
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

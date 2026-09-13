import { Download, ArrowRight, Mail, Award } from 'lucide-react';
import { personal, achievements, projects } from '../data/portfolio';

export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center bg-slate-950 overflow-hidden py-20 sm:py-24"
      aria-label="Hero"
    >
      {/* Animated gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/12 blur-[120px] animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-purple-600/12 blur-[120px] animate-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/6 via-purple-500/6 to-cyan-500/6 blur-[100px]"
        aria-hidden="true"
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      {/* Glass container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong rounded-2xl p-8 sm:p-10 lg:p-12 shimmer-overlay flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
          {/* Photo — pre-cropped to 400x400 and served as WebP with a JPEG
              fallback; explicit dimensions + fetchpriority keep this from
              becoming an oversized, deprioritized LCP element. */}
          <div className="shrink-0">
            <div className="gradient-ring w-24 h-24 sm:w-28 sm:h-28 rounded-2xl">
              <picture>
                <source srcSet={personal.photoWebp} type="image/webp" />
                <img
                  src={personal.photo}
                  alt={personal.name}
                  width={400}
                  height={400}
                  className="relative w-full h-full object-cover rounded-2xl bg-slate-900 [filter:contrast(1.08)_saturate(1.05)]"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          {/* Identity + CTAs */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-slate-100 mb-3 font-mono tracking-tight leading-tight text-balance">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {personal.tagline}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 font-mono mb-7">
              {personal.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3">
              <button
                onClick={scrollToProjects}
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
              >
                View Projects
                <ArrowRight size={16} />
              </button>

              <a
                href={personal.cvPath}
                download="Katlego-Malaka-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-blue-500/60 text-slate-200 hover:text-blue-300 font-mono text-sm font-semibold rounded-xl transition-all"
                aria-label="Download CV"
              >
                <Download size={16} />
                Download CV
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 font-mono text-sm font-medium underline-offset-4 hover:underline transition-colors"
                aria-label="Contact me"
              >
                <Mail size={14} />
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Stats + achievement banner */}
        <div className="mt-5 glass-card rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
          <span className="text-xs font-mono text-slate-300">
            <b className="text-slate-100 font-bold">{projects.length}</b> projects shipped
          </span>
          <span className="hidden sm:inline text-slate-700" aria-hidden="true">
            &bull;
          </span>
          <span className="text-xs font-mono text-slate-300">
            <b className="text-slate-100 font-bold">{achievements.length}&times;</b> national podium
          </span>
          <span className="hidden sm:inline text-slate-700" aria-hidden="true">
            &bull;
          </span>
          {achievements.map((a) => (
            <span
              key={a.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-300 border border-blue-500/25"
            >
              <Award size={10} aria-hidden="true" />
              {a.short}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

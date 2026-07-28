import { Download, ArrowRight, Mail } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
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
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-strong rounded-2xl p-8 sm:p-12 md:p-16 shimmer-overlay inline-block w-full">
          {/* Name with glow */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-100 mb-4 font-mono tracking-tight drop-shadow-lg">
            {personal.name}
          </h1>

          {/* Role statement with animated gradient */}
          <p className="text-lg sm:text-xl font-mono mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
            Future Software Architect
          </p>

          {/* Short intro */}
          <p className="text-sm sm:text-base text-slate-400 font-mono max-w-xl mx-auto leading-relaxed mb-10">
            I build full-stack systems that solve real South African problems —
            from award-winning civic tech to production-ready applications.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={scrollToProjects}
              className="btn-glow inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              View Projects
              <ArrowRight size={16} />
            </button>

            <a
              href={personal.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-2 px-6 py-3 text-slate-200 font-mono text-sm font-semibold rounded-xl transition-all hover:-translate-y-1"
              aria-label="Download CV"
            >
              <Download size={16} />
              Download CV
            </a>

            <a
              href={`mailto:${personal.email}`}
              className="glass-card inline-flex items-center gap-2 px-6 py-3 text-slate-200 font-mono text-sm font-semibold rounded-xl transition-all hover:-translate-y-1"
              aria-label="Contact me"
            >
              <Mail size={16} />
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


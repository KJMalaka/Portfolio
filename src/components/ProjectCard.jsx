import { Link } from 'react-router-dom';
import { Github, Award, X, ExternalLink as ExternalLinkIcon, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  const stop = (e) => e.stopPropagation();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(project)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect?.(project)}
      className="group text-left w-full rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer"
    >
      {/* Image thumbnail — locked to 16:9 for uniform grid rhythm */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Award badge — names the actual placement, not a generic "Award" */}
        {project.award && (
          <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-yellow-500/20">
            <span className="text-[10px] font-mono font-bold text-yellow-400 flex items-center gap-1">
              <Award size={10} />
              {project.awardShort ?? 'Award'}
            </span>
          </div>
        )}

        {/* Domain category */}
        <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
          <span className="text-[10px] font-mono font-semibold text-slate-300">{project.category}</span>
        </div>

        {/* Direct links — recruiters shouldn't need the modal to reach code/demo */}
        <div className="absolute bottom-2 right-2 flex gap-1.5 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            aria-label={`${project.title} source code`}
            className="p-1.5 rounded-md bg-slate-950/90 text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-500/40 transition-colors"
          >
            <Github size={13} />
          </a>
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              aria-label={`${project.title} live demo`}
              className="p-1.5 rounded-md bg-slate-950/90 text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-500/40 transition-colors"
            >
              <ExternalLinkIcon size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-mono font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          {project.caseStudySlug && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide bg-blue-500/15 text-blue-300 border border-blue-500/30">
              Case Study
            </span>
          )}
        </div>
        <p className="text-xs font-mono text-slate-400 mb-3 line-clamp-1">
          {project.tagline}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-mono border border-slate-700"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-slate-500 text-[10px] font-mono">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-sm rounded-lg text-xs font-mono text-blue-400 border border-blue-500/20">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Award */}
          {project.award && (
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Award size={16} className="text-yellow-400" />
              <span className="text-xs font-mono text-yellow-300">{project.award}</span>
            </div>
          )}

          <div>
            <h2 className="text-xl font-mono font-bold text-slate-100 mb-1">{project.title}</h2>
            <p className="text-sm font-mono text-blue-400">{project.tagline}</p>
          </div>

          {/* Problem */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-1">Problem</h4>
            <p className="text-sm font-mono text-slate-300 leading-relaxed">{project.problem}</p>
          </div>

          {/* Solution */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-1">Solution</h4>
            <p className="text-sm font-mono text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg text-xs font-mono border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Case study — full write-up lives at its own route, not crammed into the modal */}
          {project.caseStudySlug && (
            <Link
              to={`/projects/${project.caseStudySlug}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/15 px-4 py-3 transition-colors group/cs"
            >
              <div>
                <p className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest mb-0.5">
                  Case Study
                </p>
                <p className="text-sm font-mono text-slate-200">
                  Architecture decisions, what broke, what I'd change
                </p>
              </div>
              <ArrowRight size={18} className="text-blue-400 flex-none group-hover/cs:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          )}

          {/* Impact */}
          <div className="flex items-start gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
            {project.award && (
              <Award size={14} className="text-yellow-400 mt-0.5 flex-none" aria-hidden="true" />
            )}
            <p className="text-xs font-mono text-slate-400">
              <span className="text-slate-200 font-semibold">Impact: </span>
              {project.impact}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-semibold transition-colors"
            >
              <Github size={14} />
              Source Code
            </a>
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono font-semibold transition-colors shadow-lg shadow-blue-500/20"
              >
                <ExternalLinkIcon size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


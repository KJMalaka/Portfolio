import { useRef, useState, useEffect } from 'react';
import { Github, ExternalLink, Award } from 'lucide-react';

function useProjectStatus(url) {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    if (!url || url === '#') { setStatus('unknown'); return; }
    let cancelled = false;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    fetch(url, { mode: 'no-cors', signal: controller.signal })
      .then(() => { if (!cancelled) setStatus('live'); })
      .catch(() => { if (!cancelled) setStatus('down'); })
      .finally(() => clearTimeout(timeout));

    return () => { cancelled = true; controller.abort(); };
  }, [url]);

  return status;
}

const statusConfig = {
  live: { dot: 'live', text: 'Live', color: 'text-green-400' },
  checking: { dot: 'checking', text: 'Checking…', color: 'text-yellow-400' },
  down: { dot: 'down', text: 'Offline', color: 'text-red-400' },
  unknown: { dot: 'checking', text: '—', color: 'text-slate-400' },
};

export default function ProjectCard({ project, reverse = false }) {
  const cardRef = useRef(null);
  const status = useProjectStatus(project.live);
  const cfg = statusConfig[status];

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015,1.015,1.015)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }
  };

  return (
    <div
      ref={cardRef}
      data-cursor="project"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card flex flex-col ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } bg-white dark:bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-lg`}
    >
      {/* Image */}
      <div className="lg:w-2/5 relative overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-56 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* Status badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <span className={`status-dot ${cfg.dot}`} aria-hidden="true" />
          <span className={`text-xs font-medium ${cfg.color}`}>{cfg.text}</span>
        </div>
        {/* Award badge */}
        {project.award && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="text-xs font-medium text-yellow-300 flex items-center gap-1">
              <Award size={11} aria-hidden="true" />
              Award
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="lg:w-3/5 p-7 flex flex-col justify-between">
        <div>
          {/* Category + Award */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} bg-opacity-20 text-white`}
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
            >
              <span className={`bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                {project.category}
              </span>
            </span>
            {project.award && (
              <span className="text-xs text-yellow-400/80 font-medium">{project.award}</span>
            )}
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{project.title}</h3>
          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">{project.tagline}</p>

          {/* Problem → Solution */}
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Problem: </span>
            {project.problem}
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Impact */}
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
            📊 {project.impact}
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl text-sm font-medium transition-colors"
            aria-label={`${project.title} source code on GitHub`}
          >
            <Github size={16} aria-hidden="true" />
            Code
          </a>
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg shadow-md`}
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={16} aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Award } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

function Section({ label, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest mb-3">
        {label}
      </h2>
      {children}
    </div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = caseStudies[slug];

  useEffect(() => {
    if (study) document.title = `${study.title} — Case Study | Katlego Malaka`;
    return () => {
      document.title = 'Katlego Malaka — Full-Stack Engineer | Cape Town Developer';
    };
  }, [study]);

  if (!study) return <Navigate to="/" replace />;

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 font-mono text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to portfolio
        </Link>

        {/* Header */}
        <div className="mb-10">
          {study.award && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mb-4">
              <Award size={14} className="text-yellow-400" aria-hidden="true" />
              <span className="text-xs font-mono text-yellow-300">{study.award}</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold font-mono text-slate-100 mb-2">{study.title}</h1>
          <p className="text-blue-400 font-mono text-sm mb-5">{study.tagline}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {study.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg text-xs font-mono border border-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-semibold transition-colors"
            >
              <Github size={14} aria-hidden="true" />
              Source Code
            </a>
            {study.live && (
              <a
                href={study.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono font-semibold transition-colors shadow-lg shadow-blue-500/20"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        <Section label="The Problem &amp; Constraints">
          <p className="text-sm font-mono text-slate-300 leading-relaxed">{study.problem}</p>
        </Section>

        <Section label="The Architecture">
          <p className="text-sm font-mono text-slate-300 leading-relaxed mb-5">{study.architecture}</p>
          <img
            src={study.diagram}
            alt={`${study.title} architecture diagram`}
            className="w-full rounded-xl border border-slate-800"
            loading="lazy"
          />
        </Section>

        <Section label="What Was Rejected — And Why">
          <div className="space-y-4">
            {study.rejected.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-sm font-mono font-semibold text-slate-200 mb-1.5">{r.option}</p>
                <p className="text-sm font-mono text-slate-400 leading-relaxed">{r.why}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="What Broke">
          <p className="text-sm font-mono text-slate-300 leading-relaxed">{study.brokeAndFixed}</p>
        </Section>

        <Section label="What I'd Change">
          <p className="text-sm font-mono text-slate-300 leading-relaxed">{study.wouldChange}</p>
        </Section>

        <Section label="Real-World Validation">
          <p className="text-sm font-mono text-slate-300 leading-relaxed">{study.validation}</p>
        </Section>
      </div>
    </main>
  );
}

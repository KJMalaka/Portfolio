import { useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import RevealWrapper from './RevealWrapper';
import { certificates } from '../data/portfolio';
import { ChevronDown, ExternalLink } from 'lucide-react';

function CategoryGroup({ category, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const borderColor = {
    blue: 'border-blue-500/20',
    purple: 'border-purple-500/20',
    cyan: 'border-cyan-500/20',
  };

  const bgColor = {
    blue: 'bg-blue-500/8',
    purple: 'bg-purple-500/8',
    cyan: 'bg-cyan-500/8',
  };

  const textColor = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
  };

  const c = borderColor[category.color];
  const bg = bgColor[category.color];
  const tc = textColor[category.color];
  const Icon = category.icon;

  return (
    <div className={`rounded-xl border ${c} ${bg} backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5`}>
      {/* Header / toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className={tc} aria-hidden="true" />
          <div>
            <h3 className={`text-sm font-mono font-semibold ${tc}`}>{category.label}</h3>
            <p className="text-xs font-mono text-slate-500">{category.count} courses</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold ${bg} ${tc} border ${c}`}>
            {category.count}
          </span>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-2">
          {category.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950/50 border border-slate-800"
            >
              <span className="text-xs font-mono text-slate-300">{item.name}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-md text-[10px] font-mono font-semibold transition-colors"
                aria-label={`View ${item.name} certificate`}
              >
                View
                <ExternalLink size={10} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const { ref: headingRef } = useRevealOnScroll();

  return (
    <section
      id="certificates"
      className="py-section lg:py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-950"
      aria-label="Certificates"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="section-label text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">
            Certificates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-slate-100 font-mono">
            Continuous learning
          </h2>
          <p className="text-slate-400 text-xs font-mono mt-3">
            Expand each category to view courses.
          </p>
        </div>

        <div className="space-y-3">
          {certificates.map((cat, i) => (
            <RevealWrapper key={cat.id} delay={i * 80}>
              <CategoryGroup category={cat} defaultOpen={i === 0} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}


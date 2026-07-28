import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import RevealWrapper from './RevealWrapper';
import { experience } from '../data/portfolio';
import { GraduationCap, Briefcase, CheckCircle } from 'lucide-react';

const typeConfig = {
  education: {
    icon: GraduationCap,
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/8',
    dot: 'bg-blue-500',
  },
  experience: {
    icon: Briefcase,
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/8',
    dot: 'bg-purple-500',
  },
};

export default function Experience() {
  const { ref: headingRef } = useRevealOnScroll();

  return (
    <section
      id="experience"
      className="py-section lg:py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-950"
      aria-label="Experience"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="section-label text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-slate-100 font-mono">
            Education & work
          </h2>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 opacity-30" aria-hidden="true" />

          <div className="space-y-10">
            {experience.map((item, i) => {
              const config = typeConfig[item.type] || typeConfig.experience;
              const Icon = config.icon;

              return (
                <RevealWrapper key={item.id} delay={i * 100}>
                  <div className="relative pl-12">
                    {/* Timeline dot */}
                    <div className={`absolute left-2.5 top-1 w-[9px] h-[9px] rounded-full ${config.dot} border-2 border-slate-950 shadow-sm`} aria-hidden="true" />

                    {/* Card */}
                    <div className={`rounded-xl border ${config.border} ${config.bg} backdrop-blur-md p-5 transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center flex-none`}>
                          <Icon size={16} className={config.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-mono font-semibold text-slate-100">
                              {item.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium capitalize ${config.color} ${config.bg}`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-blue-400">{item.organization}</p>
                          <p className="text-[11px] font-mono text-slate-500 mt-0.5">{item.period}</p>
                        </div>
                      </div>

                      <p className="text-xs font-mono text-slate-300 leading-relaxed mb-3 ml-0">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 ml-0">
                        {item.highlights.map((h, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <CheckCircle size={12} className="text-green-400 mt-0.5 flex-none" />
                            <span className="text-[11px] font-mono text-slate-400">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


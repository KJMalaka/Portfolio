import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import RevealWrapper from './RevealWrapper';
import { ExternalLink, Users } from 'lucide-react';
import { achievements } from '../data/portfolio';

export default function Achievements() {
  const { ref: headingRef } = useRevealOnScroll();

  return (
    <section
      id="achievements"
      className="py-section lg:py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-950"
      aria-label="Achievements"
    >
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="section-label text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">
            Recognition
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-slate-100 font-mono">
            Competing on a{' '}
            <span className="gradient-text">national stage.</span>
          </h2>
          <p className="text-slate-400 text-xs font-mono mt-3">
            Two competitions. Two placements. One consistent result — building something that matters.
          </p>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30 md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {achievements.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <RevealWrapper
                  key={item.id}
                  direction={isLeft ? 'left' : 'right'}
                  delay={i * 120}
                >
                  <div
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-start md:items-center gap-8`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${item.gradient} border-2 border-slate-950 shadow-lg -translate-x-1/2 md:-translate-x-2 z-10 mt-7 md:mt-0`}
                      aria-hidden="true"
                    />

                    {/* Card */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? 'md:mr-8' : 'md:ml-8'
                      }`}
                    >
                      <div className="glass-card rounded-2xl overflow-hidden">
                        {/* Gradient header */}
                        <div className={`h-1.5 bg-gradient-to-r ${item.gradient}`} aria-hidden="true" />

                        <div className="p-6">
                          {/* Position badge */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${item.badgeColor} mb-2`}
                              >
                                <item.icon size={12} aria-hidden="true" />
                                {item.position} · {item.year}
                              </span>
                              <h3 className="text-lg font-bold font-mono text-slate-100 leading-tight">
                                {item.title}
                              </h3>
                              <p className="text-xs font-mono text-slate-500 mt-0.5">
                                {item.subtitle}
                              </p>
                            </div>
                            <a
                              href={item.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-none p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-500/10"
                              aria-label={`View ${item.project} live`}
                            >
                              <ExternalLink size={16} aria-hidden="true" />
                            </a>
                          </div>

                          <p className="text-sm font-mono font-semibold text-blue-400 mb-2">
                            {item.project}
                          </p>
                          <p className="text-xs font-mono text-slate-300 leading-relaxed mb-4">
                            {item.description}
                          </p>

                          {/* Team */}
                          <div className="flex items-start gap-2">
                            <Users
                              size={14}
                              className="text-slate-500 mt-0.5 flex-none"
                              aria-hidden="true"
                            />
                            <div>
                              <p className="text-[11px] font-mono text-slate-500 mb-1 font-medium">
                                Team
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {item.team.map((member) => (
                                  <span
                                    key={member}
                                    className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-[11px] font-mono"
                                  >
                                    {member}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
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

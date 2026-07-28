import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { skills } from '../data/portfolio';

const colorMap = {
  primary: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  backend: 'border-green-500/30 text-green-400 bg-green-500/10',
  data: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  devops: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
};

export default function Skills() {
  const { ref: headingRef } = useRevealOnScroll();

  return (
    <section id="skills" className="py-section lg:py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-950" aria-label="Skills">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="section-label text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">Skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-slate-100 font-mono">My Stack</h2>
          <p className="text-slate-500 font-mono text-xs mt-3 max-w-xl mx-auto">Technologies I have shipped in production projects</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([key, category]) => {
            const Icon = category.icon;
            const colors = colorMap[key] || colorMap.primary;
            return (
              <div key={key} className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200 font-mono self-center">{category.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.slice(0, 6).map((item) => (
                    <span key={item.name} className="px-3 py-1 rounded-lg text-xs font-mono font-medium border border-slate-700 text-slate-300 bg-slate-800/50 hover:border-blue-500/40 hover:text-blue-300 transition-colors cursor-default">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

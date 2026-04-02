import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import RevealWrapper from './RevealWrapper';
import { skills } from '../data/portfolio';

const colorMap = {
  blue: {
    tag: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/20',
    heading: 'text-blue-600 dark:text-blue-400',
    glow: 'hover:shadow-blue-500/10',
  },
  green: {
    tag: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border-green-200 dark:border-green-500/20',
    heading: 'text-green-600 dark:text-green-400',
    glow: 'hover:shadow-green-500/10',
  },
  purple: {
    tag: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/20',
    heading: 'text-purple-600 dark:text-purple-400',
    glow: 'hover:shadow-purple-500/10',
  },
  cyan: {
    tag: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/20',
    heading: 'text-cyan-600 dark:text-cyan-400',
    glow: 'hover:shadow-cyan-500/10',
  },
};

function SkillCard({ category, colorKey, delay }) {
  const c = colorMap[colorKey];
  return (
    <RevealWrapper delay={delay}>
      <div
        className={`bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm hover:shadow-xl ${c.glow} transition-all duration-300 h-full`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl" aria-hidden="true">{category.icon}</span>
          <h3 className={`font-bold text-sm uppercase tracking-wide ${c.heading}`}>
            {category.label}
          </h3>
        </div>

        {/* Skills */}
        <ul className="space-y-3">
          {category.items.map(({ name, context }) => (
            <li key={name}>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold border ${c.tag} whitespace-nowrap`}
              >
                {name}
              </span>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-0.5">
                {context}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </RevealWrapper>
  );
}

export default function Skills() {
  const { ref: headingRef } = useRevealOnScroll();

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
      aria-label="Skills"
    >
      <div className="max-w-6xl mx-auto">

        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">
            Broad stack.{' '}
            <span className="gradient-text">Deep roots.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
            Every skill below has been used to ship something real — not just tutorials.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(skills).map(([key, category], i) => (
            <SkillCard
              key={key}
              category={category}
              colorKey={category.color}
              delay={i * 80}
            />
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
          Context = how each skill has been applied in shipped projects or competitions.
        </p>
      </div>
    </section>
  );
}

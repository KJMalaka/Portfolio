import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { Code2, Database, Server, Layers, Trophy, Rocket } from 'lucide-react';
import { personal } from '../data/portfolio';

const stats = [
  { value: '2×', label: 'National placements', icon: Trophy, color: 'text-yellow-400' },
  { value: '4+', label: 'Shipped projects', icon: Rocket, color: 'text-blue-400' },
  { value: '10+', label: 'Technologies', icon: Code2, color: 'text-purple-400' },
  { value: '2026', label: 'WIL ready', icon: Layers, color: 'text-green-400' },
];

const pillars = [
  {
    icon: Code2,
    label: 'Full-Stack',
    desc: 'React to Node.js, end-to-end',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 dark:bg-blue-500/10',
  },
  {
    icon: Database,
    label: 'Data Systems',
    desc: 'SQL, NoSQL, real-time sync',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Server,
    label: 'Backend APIs',
    desc: 'REST, auth, role-based access',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Layers,
    label: 'DevOps',
    desc: 'Docker, CI/CD, cloud deploy',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
];

export default function About() {
  const { ref: headingRef } = useRevealOnScroll();
  const { ref: imgRef } = useRevealOnScroll();
  const { ref: textRef } = useRevealOnScroll();
  const { ref: statsRef } = useRevealOnScroll();
  const { ref: pillarsRef } = useRevealOnScroll();

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50"
      aria-label="About"
    >
      <div className="max-w-6xl mx-auto">

        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">
            Builder. Competitor. <span className="gradient-text">Architect in progress.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center mb-16">
          {/* Photo */}
          <div ref={imgRef} className="reveal-left flex justify-center md:justify-start">
            <div className="relative">
              <div className="w-64 h-72 rounded-3xl overflow-hidden ring-2 ring-blue-500/30 shadow-2xl shadow-blue-500/10">
                <img
                  src={personal.photo}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">Based in</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">🇿🇦 Cape Town, SA</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div ref={textRef} className="reveal-right space-y-5 text-slate-600 dark:text-slate-300">
            <p className="text-lg leading-relaxed">
              I'm a final-year ICT Application Development student at CPUT, and I build things that compete nationally. In 2025, my team placed{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">2nd at the Telkom10X Hackathon</strong>{' '}
              with SafeRide — a safety-first ride platform built in 48 hours. The following year, we went further: QueUp, our civic tech queue management system, made the{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">MICT SETA National Skills Challenge Grand Finale</strong>{' '}
              and placed 2nd against universities across South Africa.
            </p>
            <p className="text-lg leading-relaxed">
              From healthcare booking systems to e-commerce platforms, I've shipped full-stack applications that solve real South African problems — using React, Next.js, TypeScript, Node.js, Java, Python, and Laravel. I care about architecture as much as I care about the user experience, because I know where I'm headed:{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Software Architect</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              I'm actively seeking a WIL (Work Integrated Learning) placement for 2026 in Cape Town or remotely — somewhere I can contribute meaningfully from day one and keep growing fast.
            </p>

            {/* Availability tag */}
            <div className="flex items-center gap-2 pt-2">
              <span className="status-dot live" aria-hidden="true" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Open to WIL placement · Available 2026
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map(({ value, label, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white dark:bg-slate-800/50 rounded-2xl p-5 text-center border border-slate-200 dark:border-slate-700/50 shadow-sm"
            >
              <Icon className={`${color} mx-auto mb-2`} size={24} aria-hidden="true" />
              <div className={`text-2xl font-black ${color} mb-1`}>{value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {pillars.map(({ icon: Icon, label, desc, color, bg }) => (
            <div
              key={label}
              className={`${bg} rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/30`}
            >
              <Icon className={`${color} mb-3`} size={28} aria-hidden="true" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{label}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

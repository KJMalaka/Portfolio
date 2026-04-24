import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { Code2, Database, Server, Layers, Trophy, Rocket, Music2, Users } from 'lucide-react';
import { personal } from '../data/portfolio';

const stats = [
  { value: '2×', label: 'National placements', icon: Trophy, color: 'text-yellow-400', glow: 'glow-yellow', border: 'hover:border-yellow-400/40' },
  { value: '7+', label: 'Shipped projects', icon: Rocket, color: 'text-blue-400', glow: 'glow-blue', border: 'hover:border-blue-400/40' },
  { value: '10+', label: 'Technologies', icon: Code2, color: 'text-purple-400', glow: 'glow-purple', border: 'hover:border-purple-400/40' },
  { value: '2026', label: 'WIL ready', icon: Layers, color: 'text-green-400', glow: 'glow-green', border: 'hover:border-green-400/40' },
];

const pillars = [
  {
    icon: Code2,
    label: 'Full-Stack',
    desc: 'React to Node.js, end-to-end',
    color: 'text-blue-400',
    bg: 'bg-blue-500/8 dark:bg-blue-500/10',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-blue-500/15 hover:border-blue-400/40',
  },
  {
    icon: Database,
    label: 'Data Systems',
    desc: 'SQL, NoSQL, real-time sync',
    color: 'text-purple-400',
    bg: 'bg-purple-500/8 dark:bg-purple-500/10',
    border: 'border-purple-500/20',
    glow: 'hover:shadow-purple-500/15 hover:border-purple-400/40',
  },
  {
    icon: Server,
    label: 'Backend APIs',
    desc: 'REST, auth, role-based access',
    color: 'text-green-400',
    bg: 'bg-green-500/8 dark:bg-green-500/10',
    border: 'border-green-500/20',
    glow: 'hover:shadow-green-500/15 hover:border-green-400/40',
  },
  {
    icon: Layers,
    label: 'DevOps',
    desc: 'Docker, CI/CD, cloud deploy',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/8 dark:bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'hover:shadow-cyan-500/15 hover:border-cyan-400/40',
  },
];

export default function About() {
  const { ref: headingRef } = useRevealOnScroll();
  const { ref: imgRef } = useRevealOnScroll();
  const { ref: textRef } = useRevealOnScroll();
  const { ref: statsRef } = useRevealOnScroll();
  const { ref: pillarsRef } = useRevealOnScroll();
  const { ref: beyondRef } = useRevealOnScroll();

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden"
      aria-label="About"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">

        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="section-label text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 text-slate-900 dark:text-white">
            Builder. Competitor.{' '}
            <span className="gradient-text">Architect in progress.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center mb-16">
          {/* Photo with spinning gradient ring */}
          <div ref={imgRef} className="reveal-left flex justify-center md:justify-start">
            <div className="relative group">
              {/* Spinning gradient ring */}
              <div
                className="absolute -inset-[4px] rounded-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #06b6d4, #3b82f6)',
                  animation: 'spin 6s linear infinite',
                  zIndex: -1,
                  borderRadius: '26px',
                }}
                aria-hidden="true"
              />
              {/* Glow blur */}
              <div
                className="absolute -inset-[4px] rounded-3xl opacity-30 group-hover:opacity-50 blur-md transition-opacity duration-500"
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #06b6d4, #3b82f6)',
                  animation: 'spin 6s linear infinite',
                  zIndex: -2,
                }}
                aria-hidden="true"
              />
              <div className="relative w-64 h-72 rounded-3xl overflow-hidden bg-slate-800 shadow-2xl" style={{ isolation: 'isolate' }}>
                <img
                  src={personal.photo}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'; }}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-black/20 p-3 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400">Based in</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">🇿🇦 Cape Town, SA</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div ref={textRef} className="reveal-right space-y-5 text-slate-600 dark:text-slate-300">
            <p className="text-lg leading-relaxed">
              I'm a Full Stack Developer and final-year ICT Application Development student at CPUT — and I build things that compete. In 2025, my team placed{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">2nd at the Telkom10X Hackathon</strong>{' '}
              with SafeRide — a safety-first ride platform built in 48 hours. In 2026, QueUp, our civic tech queue management system, placed{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">2nd in the Western Cape regional round of the MICT SETA National Skills Challenge</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              From healthcare booking systems to sneaker stores and library management apps, I've shipped 7 projects that solve real problems — across React, Next.js, TypeScript, Node.js, Java, Python, and Laravel. I care about architecture as much as I care about the user experience, because I know where I'm headed:{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Software Architect</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              Through <strong className="text-slate-900 dark:text-white font-semibold">Abantu Tech</strong>, I've collaborated with peers on real-world projects — sharpening my ability to work in cross-functional engineering teams, ship on deadlines, and grow fast in a professional setting.
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
          {stats.map(({ value, label, icon: Icon, color, glow, border }) => (
            <div
              key={label}
              className={`stat-card ${glow} bg-white dark:bg-slate-800/50 rounded-2xl p-5 text-center border border-slate-200 dark:border-slate-700/50 shadow-sm ${border} cursor-default`}
            >
              <Icon className={`${color} mx-auto mb-2`} size={24} aria-hidden="true" />
              <div className={`text-2xl font-black ${color} mb-1`}>{value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {pillars.map(({ icon: Icon, label, desc, color, bg, border, glow }) => (
            <div
              key={label}
              className={`${bg} rounded-2xl p-5 border ${border} ${glow} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default`}
            >
              <Icon className={`${color} mb-3`} size={28} aria-hidden="true" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{label}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* Beyond the Code */}
        <div ref={beyondRef} className="reveal mt-12">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900/40 p-8">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative grid sm:grid-cols-2 gap-6 items-center">
              {/* KayJay */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Music2 size={22} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400 mb-1">Beyond the code</p>
                  <h3 className="font-black text-slate-900 dark:text-white text-lg mb-2">
                    KayJay — Amapiano Mixtapes
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    When I'm not building systems, I create Amapiano mixtapes as <strong className="text-slate-900 dark:text-white">KayJay</strong>. Curating sets has taught me rhythm, flow, and obsessive attention to detail — the same qualities I bring to every line of code I write.
                  </p>
                  <a
                    href="https://hearthis.at/kayjay-st/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-purple-500 dark:text-purple-400 hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    🎧 Listen on HearThis.at →
                  </a>
                </div>
              </div>

              {/* Abantu Tech */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Users size={22} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-1">Community</p>
                  <h3 className="font-black text-slate-900 dark:text-white text-lg mb-2">
                    Abantu Tech Member
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Active member of <strong className="text-slate-900 dark:text-white">Abantu Tech</strong>, a Cape Town engineering community. Collaborating with peers on real projects has sharpened my ability to work in cross-functional teams and ship under pressure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export default function About() {
  const { ref: headingRef } = useRevealOnScroll();
  const { ref: contentRef } = useRevealOnScroll();

  return (
    <section id="about" className="py-section lg:py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-950 relative" aria-label="About">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="section-label text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">About</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-slate-100 font-mono">Who I am</h2>
        </div>

        <div ref={contentRef} className="reveal grid md:grid-cols-5 gap-8 md:gap-10 items-start">
          {/* Left: punchy identity statement */}
          <div className="md:col-span-2 md:sticky md:top-28">
            <p className="text-2xl sm:text-3xl font-bold font-mono leading-snug text-slate-100">
              I design and ship{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                production-grade systems
              </span>
              , end to end.
            </p>
            <p className="mt-4 font-mono text-xs text-slate-500 uppercase tracking-widest">
              Full Stack Developer &rarr; Software Architect
            </p>
          </div>

          {/* Right: scannable narrative */}
          <div className="md:col-span-3 glass-card rounded-2xl p-8 space-y-5 text-slate-300 font-sans text-[15px] leading-relaxed">
            <p>
              I'm a <strong className="text-slate-100 font-semibold">Full Stack Developer</strong> and final-year ICT: Application
              Development student at CPUT. I build things that compete — two national hackathon podiums so far.
            </p>
            <p>
              From AI-grounded roadmaps to core banking backends and civic queue systems, I've shipped 12 projects across React,
              Next.js, TypeScript, Node.js, FastAPI, Spring Boot, Java, Python, and Laravel. I care about architecture as much as
              user experience, because I'm headed toward <strong className="text-slate-100 font-semibold">Software Architect</strong>.
            </p>
            <p>
              I led <strong className="text-slate-100 font-semibold">Abantu Tech</strong>{' '}
              <span className="font-mono text-xs text-slate-500">(our QueUp hackathon team)</span>, architecting the stack,
              splitting the work across four people, and shipping on a deadline with people relying on me.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

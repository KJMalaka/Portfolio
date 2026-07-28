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
        <div ref={contentRef} className="reveal max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 space-y-5 text-slate-300 font-mono text-sm leading-relaxed">
            <p>I am a <strong className="text-slate-100">Full Stack Developer</strong> and final-year ICT: Application Development student at CPUT. I build things that compete -- my team placed <strong className="text-blue-400">2nd at the Telkom10X Hackathon 2025</strong> with SafeRide and <strong className="text-blue-400">2nd in the Western Cape regional round of the MICT SETA National Skills Challenge 2026</strong> with QueUp.</p>
            <p>From an AI study assistant to an AI travel planner and civic queue systems, I have shipped 9 projects across React, Next.js, TypeScript, Node.js, FastAPI, Java, Python, and Laravel. I care about architecture as much as user experience -- because I am headed toward <strong className="text-slate-100">Software Architect</strong>.</p>
            <p>Through <strong className="text-slate-100">Abantu Tech</strong>, I have collaborated with peers on real-world projects -- sharpening my ability to work in cross-functional teams and ship on deadlines.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

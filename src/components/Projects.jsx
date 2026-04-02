import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import RevealWrapper from './RevealWrapper';
import ProjectCard from './ProjectCard';
import { projects } from '../data/portfolio';

export default function Projects() {
  const { ref: headingRef } = useRevealOnScroll();

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
      aria-label="Projects"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">
            Shipped. Deployed.{' '}
            <span className="gradient-text">Award-winning.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
            Four projects that solve real South African problems — two of them placed nationally.
          </p>
        </div>

        {/* Desktop: alternating layout */}
        <div className="hidden lg:space-y-10 lg:block">
          {projects.map((project, i) => (
            <RevealWrapper key={project.id} delay={i * 80}>
              <ProjectCard project={project} reverse={i % 2 !== 0} />
            </RevealWrapper>
          ))}
        </div>

        {/* Mobile: swipeable for featured, vertical for rest */}
        <div className="lg:hidden">
          <div
            className="swipe-container flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 mb-6"
            role="list"
            aria-label="Featured projects"
          >
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <div
                  key={project.id}
                  className="swipe-item flex-none w-[calc(85vw)] sm:w-[480px]"
                  role="listitem"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>

          <div className="space-y-6">
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

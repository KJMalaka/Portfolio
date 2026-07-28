import { useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import RevealWrapper from './RevealWrapper';
import ProjectCard, { ProjectModal } from './ProjectCard';
import { projects } from '../data/portfolio';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref: headingRef } = useRevealOnScroll();

  // Show only first 4 projects for compactness
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured).slice(0, 4);

  return (
    <section
      id="projects"
      className="py-section lg:py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-950"
      aria-label="Projects"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="section-label text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-slate-100 font-mono">
            Shipped. Deployed.{' '}
            <span className="gradient-text">Award-winning.</span>
          </h2>
          <p className="text-slate-400 text-xs font-mono mt-3">
            Click any project to see full details.
          </p>
        </div>

        {/* Awarded projects */}
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {featuredProjects.map((project, i) => (
            <RevealWrapper key={project.id} delay={i * 80}>
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </RevealWrapper>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherProjects.map((project, i) => (
            <RevealWrapper key={project.id} delay={i * 60}>
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </RevealWrapper>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}


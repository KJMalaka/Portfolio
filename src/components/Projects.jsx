import { useState, useMemo } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import RevealWrapper from './RevealWrapper';
import ProjectCard, { ProjectModal } from './ProjectCard';
import { projects } from '../data/portfolio';
import { useProjectFilter } from '../context/ProjectFilterContext';
import { X } from 'lucide-react';

// A skill tag like "Firebase / Firestore" can match either half; a project's
// tech list uses short names ("JWT"), so we match loosely in both directions.
function techMatches(projectTech, filter) {
  const variants = filter.split('/').map((v) => v.trim().toLowerCase());
  return projectTech.some((t) => {
    const tLower = t.toLowerCase();
    return variants.some((v) => tLower.includes(v) || v.includes(tLower));
  });
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref: headingRef } = useRevealOnScroll();
  const { activeFilter, setActiveFilter } = useProjectFilter();

  const visible = useMemo(() => {
    if (!activeFilter) return projects.filter((p) => !p.archived);
    const matched = projects.filter((p) => !p.archived && techMatches(p.tech, activeFilter));
    // Nothing tagged with this skill — fall back to the unfiltered set rather than showing an empty grid.
    return matched.length > 0 ? matched : projects.filter((p) => !p.archived);
  }, [activeFilter]);

  const isFiltering = activeFilter && visible.length < projects.filter((p) => !p.archived).length;

  const featuredProjects = visible.filter((p) => p.featured);
  const otherProjects = visible.filter((p) => !p.featured);

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

        {isFiltering && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-xs font-mono text-slate-400">Showing projects using</span>
            <button
              onClick={() => setActiveFilter(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-colors"
            >
              {activeFilter}
              <X size={12} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Flagship projects */}
        {featuredProjects.length > 0 && (
          <>
            <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Flagship builds
            </h3>
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {featuredProjects.map((project, i) => (
                <RevealWrapper key={project.id} delay={i * 80}>
                  <ProjectCard project={project} onSelect={setSelectedProject} />
                </RevealWrapper>
              ))}
            </div>
          </>
        )}

        {/* Archive */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-4">
              More projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherProjects.map((project, i) => (
                <RevealWrapper key={project.id} delay={i * 60}>
                  <ProjectCard project={project} onSelect={setSelectedProject} />
                </RevealWrapper>
              ))}
            </div>
          </>
        )}
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

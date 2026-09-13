import { createContext, useContext, useState } from 'react';

const ProjectFilterContext = createContext(null);

export function ProjectFilterProvider({ children }) {
  const [activeFilter, setActiveFilter] = useState(null);
  return (
    <ProjectFilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </ProjectFilterContext.Provider>
  );
}

export function useProjectFilter() {
  const ctx = useContext(ProjectFilterContext);
  if (!ctx) throw new Error('useProjectFilter must be used within ProjectFilterProvider');
  return ctx;
}

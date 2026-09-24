import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Layers, Code, Paintbrush, ArrowUpRight, ExternalLink, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Project, ProjectCategory, ProjectType } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import ProjectWidget from './ProjectWidget';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => PROJECTS_DATA.filter(
    (p) => filter === 'all' || p.projectType === filter
  ), [filter]);

  const [hiveItems, setHiveItems] = useState<(Project | null)[]>([]);

  useEffect(() => {
    // Hive shape: [3, 4, 5, 4, 3] = 19 items
    const totalSlots = 19; 
    const slots = new Array(totalSlots).fill(null);
    
    // Fill the slots sequentially with available projects
    filteredProjects.forEach((project, idx) => {
      if (idx < totalSlots) {
         slots[idx] = project;
      }
    });

    setHiveItems(slots);
  }, [filteredProjects]);

  const rowPattern = [3, 4, 5, 4, 3];
  const rows: (Project | null)[][] = [];
  let currentIndex = 0;
  for (const count of rowPattern) {
    rows.push(hiveItems.slice(currentIndex, currentIndex + count));
    currentIndex += count;
  }

  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId);

  // Drag to scroll logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    if (Math.abs(walk) > 10) setDragged(true);
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (projectId: string) => {
    if (!dragged) {
       setSelectedProjectId(projectId);
    }
  };

  useEffect(() => {
    if (activeProject) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeProject]);

  return (
    <div className="py-20 min-h-screen bg-black relative overflow-hidden flex flex-col" id="section-projects">
      {/* Dynamic Hive Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hive-wrapper {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 40px 20px 80px 20px;
          cursor: grab;
          display: flex;
          justify-content: center;
        }
        .hive-wrapper:active {
          cursor: grabbing;
        }
        .hive-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 800px;
        }
        .hive-row {
          display: flex;
          justify-content: center;
        }
        .hive-row + .hive-row {
          margin-top: -24px;
        }
        .hex-wrapper {
          position: relative;
          width: 140px;
          height: 162px;
          margin: 0 10px;
        }
        .hex-shape {
          position: absolute;
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: #1a1a1a;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .hex-inner {
          position: absolute;
          top: 1px; left: 1px; right: 1px; bottom: 1px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: background 0.3s ease;
        }
        .hex-wrapper.is-project .hex-inner {
          background: #151515;
        }
        .hex-wrapper.is-project:hover .hex-shape {
           background: #E21D1D;
           transform: scale(1.05);
           z-index: 10;
        }
        .hex-wrapper.is-project:hover .hex-inner {
           background: #1a1a1a;
        }
        .hex-wrapper.is-project.active {
           z-index: 20;
        }
        .hex-wrapper.is-project.active .hex-shape {
           background: #E21D1D;
           transform: scale(1.1);
           box-shadow: 0 0 40px rgba(226, 29, 29, 0.4);
        }
        .hex-wrapper.is-project.active .hex-inner {
           background: #E21D1D;
        }
        .hex-wrapper.is-project.active .text-neutral-500 {
          color: rgba(255,255,255,0.7) !important;
        }
        
        .no-select {
          user-select: none;
          -webkit-user-drag: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #050505; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #E21D1D; 
        }
      `}} />

      <AnimatePresence mode="wait">
        {!activeProject ? (
          <motion.div
            key="hive-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-grow w-full"
          >
            {/* Editorial Section Header */}
            <div className="px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-neutral-900 relative z-10 w-full shrink-0">
              <div className="space-y-2">
                {/* Index Counter Line representing Bold Typography theme */}
                <div className="flex items-center space-x-4 mb-1">
                  <span className="text-accent-red font-mono text-xs font-bold">02 / 05</span>
                  <div className="h-px w-16 bg-accent-red"></div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">// CATALOGUE & RUCHE DE PROJETS</span>
                </div>

                <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter">
                  HIVE <span className="text-stroke-white text-neutral-800" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}>PORTFOLIO</span>
                </h2>
              </div>

              {/* Categorie Filtering buttons (Personnels vs Partenaires) */}
              <div className="flex flex-wrap gap-2 font-mono text-[10px] md:text-xs">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 uppercase hover:bg-neutral-950 transition-all cursor-pointer ${
                    filter === 'all' 
                      ? 'bg-accent-red text-white font-bold' 
                      : 'text-neutral-400 border border-neutral-900 hover:border-neutral-500'
                  }`}
                >
                  TOUS LES PROJETS
                </button>
                <button
                  onClick={() => setFilter('personnel')}
                  className={`px-4 py-2 uppercase hover:bg-neutral-950 transition-all cursor-pointer ${
                    filter === 'personnel' 
                      ? 'bg-accent-red text-white font-bold' 
                      : 'text-neutral-400 border border-neutral-900 hover:border-neutral-500'
                  }`}
                >
                  PERSONNELS
                </button>
                <button
                  onClick={() => setFilter('partenaire')}
                  className={`px-4 py-2 uppercase hover:bg-neutral-950 transition-all cursor-pointer ${
                    filter === 'partenaire' 
                      ? 'bg-accent-red text-white font-bold' 
                      : 'text-neutral-400 border border-neutral-900 hover:border-neutral-500'
                  }`}
                >
                  PARTENAIRES (cours)
                </button>
              </div>
            </div>

            {/* Main panel: Ruche (Hive) full width */}
            <div className="w-full flex-grow flex flex-col justify-center items-center">
              <span className="font-mono text-[10px] text-neutral-500 block uppercase tracking-wider mb-2 text-center">
                // SÉLECTIONNEZ UNE ALVÉOLE DANS LA RUCHE
              </span>
              <span className="font-mono text-[9px] text-neutral-600 block uppercase tracking-wider mb-8 text-center animate-pulse">
                SCROLLER POUR EXPLORER
              </span>
              
              <div 
                className="hive-wrapper custom-scrollbar"
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
              >
                <div className="hive-container">
                  {rows.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="hive-row">
                      {row.map((project, colIndex) => {
                        if (project) {
                          const isSelected = selectedProjectId === project.id;
                          return (
                            <div 
                              key={project.id} 
                              className={`hex-wrapper is-project ${isSelected ? 'active' : ''}`} 
                              onClick={() => handleClick(project.id)}
                            >
                              <div className="hex-shape no-select">
                                <div className="hex-inner">
                                  <span className={`font-mono text-[9px] opacity-70 mb-1 uppercase tracking-widest ${isSelected ? 'text-white' : 'text-[#E21D1D]'}`}>{project.projectType}</span>
                                  <span className="font-display font-bold text-sm sm:text-base leading-none uppercase tracking-tight text-white mb-2">
                                    {project.title}
                                  </span>
                                  <span className={`font-mono text-[8px] uppercase tracking-widest px-2 max-w-[100px] truncate ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                                    {project.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // Empty Hexagon
                        return (
                          <div key={`empty-${rowIndex}-${colIndex}`} className="hex-wrapper opacity-30 pointer-events-none">
                            <div className="hex-shape">
                               <div className="hex-inner">
                                   <span className="font-mono text-[8px] text-neutral-800">[Prochainement...]</span>
                               </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="project-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl mx-auto px-4 md:px-12 flex flex-col pb-20"
          >
            {/* Back Header */}
            <div className="flex justify-between items-center mb-8 border-b border-neutral-900 pb-4">
              <button 
                onClick={() => setSelectedProjectId(null)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white hover:bg-neutral-900 px-4 py-2 rounded transition-colors font-mono text-xs uppercase tracking-widest group"
              >
                <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                RETOUR A LA RUCHE
              </button>
            </div>

            <div className="space-y-8">
              {/* Header inside the inspector */}
              <div className="border border-neutral-900 bg-neutral-950/70 p-6 md:p-10 relative overflow-hidden">
                <span className="absolute top-0 right-0 font-mono text-[8px] p-2 text-neutral-600 z-10">// PROJECT_DETAILS</span>
                
                {activeProject.projectType === 'partenaire' && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/5 blur-3xl rounded-full" />
                )}

                <h3 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-white mb-2 relative z-10">
                  {activeProject.title}
                </h3>
                <span className="font-mono text-sm md:text-base text-accent-red tracking-wider block font-semibold mb-2 relative z-10">
                  {activeProject.subtitle}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-neutral-500 tracking-wider block relative z-10">
                  {activeProject.role} — {activeProject.year}
                </span>

                <div className="font-sans text-sm md:text-base text-neutral-300 leading-relaxed mt-8 border-t border-neutral-900 pt-8 relative z-10">
                  <ReactMarkdown
                    components={{
                      h3: ({node, ...props}) => <h3 className="text-lg md:text-xl text-white font-display font-bold mt-8 mb-3 uppercase tracking-wide" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                      strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                      em: ({node, ...props}) => <em className="text-accent-red italic" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-outside pl-4 space-y-2 mb-4" {...props} />,
                      li: ({node, ...props}) => <li className="" {...props} />
                    }}
                  >
                    {activeProject.descriptionMarkdown}
                  </ReactMarkdown>
                </div>

                {/* Sub specifications grid */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 bg-neutral-900/30 p-6 border border-neutral-900 relative z-10">
                  {activeProject.specs.map((s) => (
                    <div key={s.label} className="relative group">
                      <span className="font-mono text-[10px] text-neutral-500 block uppercase mb-1">{s.label}</span>
                      <span className="font-mono text-xs text-white font-bold block truncate cursor-help">{s.value}</span>
                      {/* Tooltip */}
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-max max-w-[250px] z-50 p-3 bg-neutral-900 border border-neutral-700 text-xs text-white shadow-xl whitespace-normal break-words">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra details about code + design dichotomy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-neutral-900 p-6 bg-neutral-950/40">
                  <span className="font-mono text-[10px] text-neutral-500 block uppercase tracking-widest mb-4">// STACK / OUTILS</span>
                  <ul className="space-y-3 text-sm text-neutral-300 font-mono">
                    {activeProject.techStack.map((tech) => (
                      <li key={tech} className="flex items-center gap-3">
                        <Code size={14} className="text-accent-red" /> {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-neutral-900 p-6 bg-neutral-950/40">
                  <span className="font-mono text-[10px] text-accent-red block uppercase tracking-widest mb-4">// PRINCIPES CLÉS</span>
                  <ul className="space-y-3 text-sm text-neutral-300 font-sans">
                    {activeProject.designConcepts.map((concept) => (
                      <li key={concept} className="flex items-center gap-3 text-neutral-300">
                        <Paintbrush size={14} className="text-accent-red" /> {concept}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* LIVE PLAYGROUND WIDGET ACCENTUATED */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-[10px] md:text-xs font-mono px-1">
                  <span className="text-neutral-500 uppercase tracking-wider">// EXÉCUTION DU MODULE VISUEL :</span>
                  <span className="text-accent-red flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse" /> STATUT: ONLINE
                  </span>
                </div>
                
                {/* Visual module simulation */}
                <ProjectWidget demoType={activeProject.demoType} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

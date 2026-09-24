import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, BookOpen, GraduationCap, Laptop, Palette, ChevronDown, Check } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';
import { TimelineItem } from '../types';

export default function ExperienceSection() {
  const [expandedItemId, setExpandedItemId] = useState<string | null>('curriculum-engineering-designer');

  const toggleExpand = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <div className="py-20 px-6 md:px-12 max-w-6xl mx-auto bg-black text-white relative" id="section-timeline">
      {/* Background massive watermark text */}
      <div className="absolute left-6 top-24 opacity-[0.03] select-none pointer-events-none z-0">
        <span className="text-[12rem] sm:text-[18rem] font-black leading-none tracking-tighter uppercase text-white block">
          PATH
        </span>
      </div>

      {/* Upper Grid Intro Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-neutral-900 relative z-10 w-full">
        <div className="space-y-2">
          {/* Index Counter Line representing Bold Typography theme */}
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-accent-red font-mono text-xs font-bold">04 / 05</span>
            <div className="h-px w-16 bg-accent-red"></div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">// PARCOURS PROFESSIONNEL & ACADÉMIQUE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter">
            TIMELINE & <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.45)' }}>EXPÉRIENCES</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-neutral-500 max-w-sm text-left md:text-right leading-relaxed">
          Un parcours hybride d'exception fusionnant la rigueur scientifique préparatoire (MPSI/MP*) aux exigences créatives du design en passant par des expériences professionnels importantes et rigoureuses.
        </div>
      </div>

      {/* Main timeline visualizer */}
      <div className="relative border-l border-neutral-900 ml-4 md:ml-12 pl-6 md:pl-12 space-y-10 py-4 max-w-4xl">
        
        {/* Glowing vertical node line accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-red via-neutral-900 to-transparent pointer-events-none" />

        {TIMELINE_DATA.map((item) => {
          const isExpanded = expandedItemId === item.id;
          
          return (
            <div key={item.id} className="relative group/timeline">
              
              {/* Floating bullet timeline node anchor depending on side */}
              <div
                className={`absolute -left-[30px] md:-left-[54px] top-1.5 w-4 h-4 md:w-6 md:h-6 border flex items-center justify-center transition-all bg-black z-10 ${
                  isExpanded 
                    ? 'border-accent-red bg-accent-red text-white scale-110' 
                    : 'border-neutral-800 text-neutral-500 group-hover/timeline:border-white'
                }`}
                style={{ borderRadius: item.side === 'design' ? '50%' : '0%' }}
              >
                {item.type === 'academic' || item.type === 'hybrid-highlight' ? (
                  <GraduationCap size={10} className="md:w-3 md:h-3" />
                ) : (
                  <Briefcase size={10} className="md:w-3 md:h-3" />
                )}
              </div>

              {/* Central Information block container */}
              <div
                className={`border transition-all p-6 md:p-8 relative block text-left focus:outline-none ${
                  isExpanded
                    ? 'border-accent-red bg-neutral-950/40 shadow-xl'
                    : 'border-neutral-900 bg-neutral-950/10 hover:border-neutral-700'
                }`}
              >
                {/* Horizontal progress indicators */}
                <div className="flex flex-wrap justify-between items-start gap-2 border-b border-neutral-900/60 pb-3 mb-4">
                  <div>
                    <span className="font-mono text-xs text-accent-red font-semibold block">
                      {item.period}
                    </span>
                    <h3 className="font-display font-bold text-lg md:text-xl text-white mt-1 group-hover/timeline:text-accent-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-neutral-400 font-medium">
                      {item.institution}
                    </p>
                  </div>

                  {/* Badges and metadata */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-500 px-2 py-0.5 rounded uppercase">
                      {item.type === 'hybrid-highlight' ? 'Double Cursus' : item.type}
                    </span>

                    {/* Indicator Icon for major balance of memory */}
                    <div className="flex items-center space-x-1 font-mono text-[9px] text-neutral-500 bg-neutral-900/60 px-2 py-0.5 border border-dashed border-neutral-800">
                      {item.side === 'engineering' && (
                        <>
                          <Laptop size={10} className="text-blue-500" />
                          <span>TECH</span>
                        </>
                      )}
                      {item.side === 'design' && (
                        <>
                          <Palette size={10} className="text-accent-red" />
                          <span>ART</span>
                        </>
                      )}
                      {item.side === 'both' && (
                        <>
                          <span className="w-1.5 h-1.5 bg-accent-red animate-pulse block" />
                          <span>SYS+ART</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Collapsible expanded bullet layout detailing coursework */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-neutral-900/50 space-y-4">
                        <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">// PRINCIPALES COMPÉTENCES :</span>
                        
                        <ul className="space-y-2.5">
                          {item.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-normal">
                              <span className="w-4 h-4 rounded-none bg-neutral-900 text-accent-red flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Draw Toggle Button button inside */}
                <div className="flex justify-end pt-4 mt-2">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="font-mono text-[9px] text-neutral-500 hover:text-white flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <span>{isExpanded ? 'MASQUER DÉTAILS' : 'VOIR OBJECTIFS ET MÉTIERS CLÈS'}</span>
                    <ChevronDown
                      size={12}
                      className={`text-accent-red transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

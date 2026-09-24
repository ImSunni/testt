import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Paintbrush } from 'lucide-react';
import { NavSection } from '../types';

interface NavigationProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Navigation({
  currentSection,
  onNavigate,
  isOpen,
  setIsOpen
}: NavigationProps) {
  const menuItems: { id: NavSection; label: string; subtitle: string }[] = [
    { id: 'home', label: 'GENÈSE & CONCEPT', subtitle: 'Studio Identity // Intro' },
    { id: 'projects', label: 'PROJETS', subtitle: 'Interactive Works // Demos' },
    { id: 'skills', label: 'MATRICE DE COMPÉTENCES', subtitle: 'Skills Matrix // Radar' },
    { id: 'timeline', label: 'PARCOURS SYSTÉMIQUE', subtitle: 'Double Curriculum // Timeline' },
    { id: 'contact', label: 'PRENDRE CONTACT', subtitle: 'Let\'s collaborate // Contact & Mail' }
  ];

  const handleItemClick = (section: NavSection) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-center mix-blend-difference">
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center space-x-3 text-left focus:outline-none cursor-pointer"
          id="nav-logo-btn"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Morphing indicator */}
            <motion.div 
              className="absolute w-2 h-2 bg-accent-red"
              animate={{
                borderRadius: '50%',
                rotate: 180,
                scale: 1.5
              }}
              transition={{ type: 'spring', damping: 20 }}
            />
            <div className="absolute w-5 h-5 border border-white/20 group-hover:border-accent-red transition-colors" />
          </div>
          <div>
            <span className="font-display font-bold tracking-widest text-sm text-white block">
              M. WOZNIAK
            </span>
            <span className="font-mono text-[10px] text-white/50 tracking-wider block">
              INGÉNIEUR // DESIGNER
            </span>
          </div>
        </button>

        {/* Desktop Mini-Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 font-mono text-xs text-white/60">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`hover:text-accent-red transition-colors relative py-1 cursor-pointer ${
                currentSection === item.id ? 'text-white font-medium' : ''
              }`}
            >
              {currentSection === item.id && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-red"
                  transition={{ type: 'spring', damping: 20 }}
                />
              )}
              {item.id.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* Menu Toggle Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[60] flex items-center space-x-3 bg-black/40 hover:bg-neutral-900 border border-white/10 hover:border-accent-red/50 text-white rounded-none px-4 py-2 transition-all group cursor-pointer"
          id="menu-toggle-btn"
        >
          <span className="font-mono text-xs tracking-widest text-white/80 group-hover:text-white">
            {isOpen ? 'FERMER' : 'MENU'}
          </span>
          <div className="relative w-4 h-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={16} className="text-accent-red" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col space-y-1 w-4"
                >
                  <span className="h-[2px] w-full bg-white group-hover:bg-accent-red transition-colors block" />
                  <span className="h-[2px] w-3/4 self-end bg-white group-hover:bg-accent-red transition-colors block" />
                  <span className="h-[2px] w-full bg-white group-hover:bg-accent-red transition-colors block" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </header>

      {/* Full-Screen Minimalist Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-between p-8 md:p-16 lg:p-24 overflow-hidden"
          >
            {/* Background grids / visual interest */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mono-grid-red" />

            {/* Empty block to push menu down in mobile/flex */}
            <div className="h-12" />

            {/* Menu Items Container */}
            <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center flex-grow">
              <div className="md:col-span-8 flex flex-col space-y-4 lg:space-y-6">
                {menuItems.map((item, index) => {
                  const isActive = currentSection === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ x: -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.08, duration: 0.45 }}
                    >
                      <button
                         onClick={() => handleItemClick(item.id)}
                         className="group text-left flex items-start space-x-6 relative py-2 focus:outline-none focus-visible:text-accent-red cursor-pointer"
                      >
                         <div className="relative overflow-hidden">
                           <span className={`block font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight transition-transform text-white group-hover:text-accent-red ${
                             isActive ? 'text-stroke-red' : ''
                           }`}>
                             {item.label}
                           </span>
                           <span className="block font-mono text-xs text-neutral-500 tracking-wider group-hover:text-white/60 uppercase mt-1">
                             {item.subtitle}
                           </span>
                         </div>

                         {/* Animated trailing bar */}
                         <span className="absolute left-0 bottom-0 h-[2px] bg-accent-red w-0 group-hover:w-full transition-all duration-300" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Side metadata column */}
              <div className="hidden md:block md:col-span-4 border-l border-neutral-800 pl-8 space-y-6 font-mono text-xs">
                <div>
                  <h4 className="text-white font-medium mb-2 tracking-widest">// DOUBLE DIPLÔME</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Étudiant à CY école de design en double diplôme d'ingénieur informatique et designer, associant l'ingénierie logicielle (Front/Back) et la conception visuelle (3D, Vidéo, Graphisme, No-code).
                  </p>
                </div>
                
                <div className="pt-4 border-t border-neutral-900 text-[10px] text-neutral-500 space-y-1">
                  <div>DISPONIBILITÉ : STAGE & FREELANCE 2026</div>
                  <div>PORTFOLIO v1.4 // PARIS - EN DIRECT</div>
                </div>
              </div>
            </div>

            {/* Footer Credits */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-neutral-900 pt-6 font-mono text-[10px] text-neutral-500 max-w-5xl mx-auto w-full">
              <span>© {new Date().getFullYear()} MAXIMILIEN WOZNIAK. TOUS DROITS RÉSERVÉS.</span>
              <span className="mt-2 sm:mt-0 tracking-wider">SOBRE // RIGUEUR // CLARTÉ INTERACTIVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

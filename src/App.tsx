import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavSection } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Smoothly scroll to the top of the viewport when switching sections in fullscreen mode
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentSection]);

  // Adjust root document variables
  useEffect(() => {
    const root = document.documentElement;
    // Design-studio feeling: spacious sans, letter spacing
    root.style.setProperty('--font-sans', '"Inter", ui-sans-serif, system-ui, sans-serif');
  }, []);

  // Handle direct navigation
  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white relative transition-all duration-500 overflow-x-hidden font-sans tracking-normal selection:bg-white selection:text-black"
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0 opacity-0"
      >
        <div className="absolute inset-0 mono-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      {/* Embedded dynamic red accent light glow */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl pointer-events-none transition-transform duration-500" 
        style={{
          transform: `translate(40px, -40px)`,
          opacity: 0.25
        }}
      />

      {/* Minimalism Header & Navigation Overlay System */}
      <Navigation
        currentSection={currentSection}
        onNavigate={handleNavigate}
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
      />

      {/* Page Content Swapper with fluid motion transitions */}
      <main className="relative z-10 flex flex-col min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ 
              type: 'spring', 
              damping: 24, 
              stiffness: 140,
              mass: 0.8
            }}
            className="flex-grow flex flex-col justify-center"
          >
            {currentSection === 'home' && (
              <Hero
                onExploreProjects={() => handleNavigate('projects')}
                onContact={() => handleNavigate('contact')}
              />
            )}
            
            {currentSection === 'projects' && (
              <ProjectsSection />
            )}
            
            {currentSection === 'skills' && (
              <SkillsSection />
            )}
            
            {currentSection === 'timeline' && (
              <ExperienceSection />
            )}
            
            {currentSection === 'contact' && (
              <ContactSection />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Tiny floating mini stats bar on the bottom left corner */}
      <div className="fixed bottom-4 left-6 hidden xl:flex items-center space-x-2 font-mono text-[8px] text-neutral-600 z-30 select-none bg-black/60 backdrop-blur-sm px-2 py-1 border border-neutral-900">
        <span className="w-1.5 h-1.5 bg-accent-red rounded-none animate-pulse" />
        <span>SYS.ACTIVE: PORT_3000</span>
      </div>
    </div>
  );
}

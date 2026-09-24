import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, Paintbrush, Sliders, ArrowUpRight, ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onContact: () => void;
}

import photoUrl from '../resources/photo.JPG';

export default function Hero({
  onExploreProjects,
  onContact
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic Background Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Particle pool
    const particleCount = 60;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
      angle: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        hue: Math.random() > 0.85 ? 0 : 0, // Red accent or white
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.4
      });
    }

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Clear with dark atmospheric fade
      ctx.fillStyle = 'rgba(5, 5, 5, 0.4)';
      ctx.fillRect(0, 0, width, height);

      // Plexus network graph particles
      ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
      ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;

      // We need to find triangles to fill for the true "plexus" effect.
      // To optimize, we'll only fill a certain amount of triangles.
      
      particles.forEach((p, idx) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 180, 180, 0.25)`;
        ctx.fill();

        // Connect nearby particles (rigorous graph network + triangles)
        const closeNodes = [];
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          const limitSq = 18000; // ~134px distance
          if (distSq < limitSq) {
            closeNodes.push({ p: p2, distSq });
            const alpha = (1 - Math.sqrt(distSq) / Math.sqrt(limitSq)) * 0.1;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw triangular faces
        for (let a = 0; a < closeNodes.length; a++) {
          for (let b = a + 1; b < closeNodes.length; b++) {
            const pA = closeNodes[a].p;
            const pB = closeNodes[b].p;
            const dx = pA.x - pB.x;
            const dy = pA.y - pB.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 15000) { // If the two connected nodes are also close to each other
              // Fill triangle
              const avgDist = (Math.sqrt(closeNodes[a].distSq) + Math.sqrt(closeNodes[b].distSq) + Math.sqrt(distSq)) / 3;
              const fillAlpha = Math.max(0, (1 - avgDist / 120)) * 0.02; // subtle transparent white fill

              ctx.fillStyle = `rgba(200, 200, 200, ${fillAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pA.x, pA.y);
              ctx.lineTo(pB.x, pB.y);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative flex flex-col bg-black text-white overflow-hidden">
      {/* Background Interactive canvas spans both sections */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none scale-105 z-0"
      />

      {/* Hero Content */}
      <div className="relative min-h-screen flex flex-col justify-between pt-24 px-6 md:px-12 pb-12 z-10" id="section-hero">
        {/* BACKGROUND GIANT HOLLOW TEXT */}
        <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none z-0 overflow-hidden">
          <span className="text-[12vw] md:text-[18vw] font-black leading-none tracking-tighter uppercase block text-white">
            HYBRID
          </span>
          <span className="text-[12vw] md:text-[18vw] font-black leading-none tracking-tighter uppercase block text-transparent" style={{ WebkitTextStroke: '1px white' }}>
            CREATIVE
          </span>
        </div>

        {/* Decorative watermark grid coordinates */}
        <div className="absolute top-28 right-12 hidden md:flex flex-col items-end font-mono text-[10px] text-neutral-600 select-none z-10 pointer-events-none">
          <span>MATRIX: [SYS_v1.4]</span>
          <span>LATITUDE: 48.8566 // LONGITUDE: 2.3522</span>
        </div>

        {/* Main Core Content Grid */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow z-10 relative">
          
          {/* Left column: Dynamic Title & Presentation */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            {/* Index Counter Line representing Bold Typography theme */}
            <div className="flex items-center space-x-4">
              <span className="text-accent-red font-mono text-sm font-bold">01 / 05</span>
              <div className="h-px w-24 bg-accent-red"></div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Genèse & Concept</span>
            </div>

            {/* Badge indicator */}
            <div className="flex items-center space-x-2 font-mono text-xs tracking-wider text-accent-red">
              <span className="w-1.5 h-1.5 bg-accent-red animate-pulse rounded-full" />
              <span>DISPONIBLE POUR STAGE & FREELANCE</span>
            </div>

            {/* Morphing typography header */}
            <div className="space-y-1">
              <span className="block font-mono text-sm tracking-widest text-neutral-400">
                PORTFOLIO ETUDIANT // 2026
              </span>
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-none text-white uppercase">
                MAXIMILIEN
                <span className="block text-stroke-white text-neutral-800 transition-colors group-hover:text-white" style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)' }}>
                  WOZNIAK
                </span>
              </h1>
            </div>

            {/* Static Designer Layout */}
            <div className="min-h-[90px]">
              <motion.div
                animate={{
                  letterSpacing: `0.3em`,
                  x: 10
                }}
                transition={{ type: 'spring', damping: 20 }}
                className="text-lg md:text-xl font-light"
              >
                <span className="font-display font-black text-white tracking-widest uppercase text-xl sm:text-2xl">
                  ÉTUDIANT INGÉNIEUR INFORMATIQUE & DESIGNER
                  <span className="text-accent-red">.</span>
                  <span className="block text-sm text-gray-400 font-serif italic tracking-wide mt-2 leading-relaxed lowercase max-w-xl not-uppercase">
                    Double expertise en ingénierie logicielle (Front/Back) et conception visuelle (3D, Vidéo, Graphisme, No-code).
                  </span>
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right column: Action triggers */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4 pt-8 lg:pt-0 border-t lg:border-none border-neutral-900 mt-8 lg:mt-0">
            <button
              onClick={onExploreProjects}
              className="w-full sm:w-auto px-8 py-4 bg-accent-red hover:bg-accent-red-hover text-white font-mono text-sm tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between lg:justify-center gap-3 relative overflow-hidden group shadow-lg shadow-accent-red/20 cursor-pointer"
            >
              <span className="relative z-10">EXPLORER LES PROJETS</span>
              <ArrowUpRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button
              onClick={onContact}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-neutral-900 border border-white/20 hover:border-white text-white font-mono text-sm tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              ME CONTACTER
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center pb-4 md:pb-8 mt-12 md:mt-0 relative z-20">
          <div className="flex flex-col items-center animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('section-about')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Me Découvrir</span>
            <ArrowDown size={16} className="text-accent-red" />
          </div>
        </div>

        {/* Decorative footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:h-16 pt-8 sm:pt-4 border-t border-neutral-900 font-mono text-[10px] text-neutral-500 relative z-10 gap-8 sm:gap-0 mt-12 sm:mt-0">
          <div className="flex space-x-6 w-full sm:w-auto justify-between sm:justify-start">
            <span>COÛT COMPUTATIONNEL: MINIMAL</span>
            <span className="hidden lg:inline">ACCESSIBILITÉ WGAC: AA (9.1:RATIO)</span>
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-end">
            <span className="w-1.5 h-1.5 bg-accent-red rounded-full" />
            <span className="text-center sm:text-right">ESTHÉTIQUE: SWISS GRAPHIC</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative py-24 px-6 md:px-12 text-white border-t border-neutral-900/50 z-10" id="section-about">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Photo Placeholder */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-72 h-96 group">
              {/* Abstract decorative frame */}
              <div className="absolute inset-0 border border-neutral-800 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
              <div className="absolute inset-0 bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center text-neutral-600 transition-colors duration-500 group-hover:border-neutral-500 z-10 overflow-hidden">
                <img src={photoUrl} alt="Maximilien Wozniak" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                {/* Optional subtle overlay tint */}
                <div className="absolute inset-0 bg-accent-red/5 mix-blend-overlay pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-accent-red font-mono text-sm font-bold">1.2</span>
              <div className="h-px w-16 bg-neutral-800"></div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">// PRÉSENTATION</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight uppercase">
              Créer pour <br/>
              <span className="text-accent-red">l'Impact Visuel & Technique</span>
            </h2>

            <div className="space-y-4 font-sans text-neutral-400 text-sm leading-relaxed">
              <p>
                J'ai 21 ans et je suis en 3ème année ingénieur-designer. Passionné par l'ingénierie logicielle et l'esthétique visuelle, je conçois des projets qui allient 
                architectures robustes (Back-End/Front-End) et direction artistique audacieuse (3D, Vidéo, Design). 
                Mon approche se situe au carrefour de la technique et de l'émotion créative.
              </p>
              <p>
                Fort d'un double diplôme à CY école de design, je traduis des concepts complexes en solutions performantes et immersives, 
                maîtrisant à la fois le code (Java, React, SQL) et les outils créatifs (Blender, Premiere Pro, Photoshop).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-900 font-mono text-xs">
              <div>
                <span className="block text-neutral-600 mb-1 uppercase tracking-widest text-[9px]">// FOCUS</span>
                <span className="text-white">Développement Full-Stack</span>
              </div>
              <div>
                <span className="block text-neutral-600 mb-1 uppercase tracking-widest text-[9px]">// EXPERTISE</span>
                <span className="text-white">Conception 3D & Graphique</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sliders, Settings, Code, Grid, Sparkles, Check, HelpCircle, Smartphone, QrCode, Film, Maximize, Volume2, Upload, Tv, Paintbrush } from 'lucide-react';

import rend1Url from '../resources/cyfond-rend1.jpg';
import rend2Url from '../resources/cyfond-rend2.jpg';
import rend3Url from '../resources/cyfond-rend3.jpg';
import ocres1Url from '../resources/logo-ocres.png';
import ocres2Url from '../resources/sign-ocres.jpeg';
import noeUrl from '../resources/Noé.pdf';

interface ProjectWidgetProps {
  demoType: 'mobile' | 'video' | 'branding' | '3d-gallery';
}

export default function ProjectWidget({ demoType }: ProjectWidgetProps) {
  switch (demoType) {
    case 'mobile':
      return <MobileMockupWidget />;
    case 'video':
      return <VideoPlayerWidget />;
    case 'branding':
      return <BrandingWidget />;
    case '3d-gallery':
      return <ThreeDGalleryWidget />;
    default:
      return null;
  }
}

/* ==========================================
   5. MOBILE MOCKUP WIDGET (MUSEVO)
   ========================================== */
function MobileMockupWidget() {
  return (
    <div className="bg-neutral-950 border border-neutral-900 overflow-hidden min-h-[450px]">
      <div className="flex justify-between items-center bg-neutral-900/60 border-b border-neutral-900 px-4 py-2">
        <span className="font-mono text-[10px] text-neutral-400">// EXPERIMENTATION: MOBILE EXPERIENCE // MUSEVO</span>
        <div className="flex items-center space-x-1">
          <Smartphone size={10} className="text-accent-red" />
          <span className="font-mono text-[9px] text-accent-red font-semibold">FIGMA PROTOTYPE SIMULATION</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-black">
        <iframe style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }} width="100%" height="450" src="https://embed.figma.com/proto/QRD3vSlW7ufgGyyE7sArMK/Ergo?node-id=71-1245&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A3183&embed-host=share" allowFullScreen></iframe>
      </div>
    </div>
  );
}

/* ==========================================
   7. 3D GALLERY WIDGET
   ========================================== */
function ThreeDGalleryWidget() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    // We can add paths to actual images here.
    // For now, if the user hasn't specified image paths, we can just create placeholders
    // or maybe they uploaded some that I should use? They said "des photo de mes 3D".
    // Wait, let's leave a generic image component and maybe they can drag&drop or they will add paths later.
    // I can also check if there are 3D photos in resources. Let's assume they might be added to resources.
    rend1Url, // abstract 3d placeholder
    rend3Url, // abstract 3d placeholder
    rend2Url // abstract 3d placeholder
  ];

  return (
    <div className="bg-neutral-950 border border-neutral-900 overflow-hidden min-h-[300px]">
      <div className="flex justify-between items-center bg-neutral-900/60 border-b border-neutral-900 px-4 py-2">
        <span className="font-mono text-[10px] text-neutral-400">// EXPERIMENTATION: GALERIE 3D</span>
        <div className="flex items-center space-x-1">
          <Paintbrush size={10} className="text-accent-red" />
          <span className="font-mono text-[9px] text-accent-red font-semibold">3D RENDERS</span>
        </div>
      </div>
      <div className="relative flex items-center justify-center p-4">
        <div className="relative w-full aspect-video border border-neutral-800 bg-neutral-900/30 overflow-hidden">
          <img 
            src={images[currentImage]} 
            alt="3D Render" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${idx === currentImage ? 'bg-accent-red' : 'bg-neutral-600 hover:bg-neutral-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   7. VIDEO PLAYER / CINEMA WIDGET (NOÉ)
   ========================================== */
function VideoPlayerWidget() {
  const [videoUrl] = useState('https://pub-768d128a409c4ef3970bcb546158a9c4.r2.dev/no%C3%A9.mp4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Play failed, click to retry:", err);
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="bg-neutral-950 border border-neutral-900 overflow-hidden text-white flex flex-col font-sans select-none rounded-lg">
      {/* Cinematic terminal header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-neutral-900/60 border-b border-neutral-900 px-4 py-3 gap-2">
        <div className="flex items-center space-x-2">
          <Film size={14} className="text-accent-red animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
            // LECTEUR_VIDÉO: NOÉ.mp4 [1920x1080]
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] text-neutral-500">
          <span className="border border-neutral-800 px-1 py-0.5 rounded">FPS: 24 (CINÉMA)</span>
          <span className="border border-neutral-800 px-1 py-0.5 rounded">AUDIO: MULTIPLISTE STEREO</span>
        </div>
      </div>

      {/* Main layout container */}
      <div className="flex flex-col gap-6 p-4 md:p-6 bg-black">
        
        {/* Full-width Video Viewport & Player Controls */}
        <div className="w-full flex flex-col space-y-4">
          
          {/* Real video player viewport with cinema styling */}
          <div className="relative aspect-video bg-black border border-neutral-900 rounded-lg overflow-hidden group shadow-2xl flex items-center justify-center">
            
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain transition-all bg-black"
              onClick={handlePlayPause}
              playsInline
            />

            {/* Centered Big Play Indicator on Hover */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all cursor-pointer z-20"
                onClick={handlePlayPause}
              >
                <div className="w-16 h-16 rounded-full bg-accent-red flex items-center justify-center scale-95 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-accent-red/40">
                  <Play size={24} className="text-white fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Bottom mini-controllers inside viewport */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-black/0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handlePlayPause}
                  className="p-1 hover:text-accent-red transition-colors focus:outline-none"
                >
                  {isPlaying ? <Pause size={14} className="fill-white" /> : <Play size={14} className="fill-white" />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="p-1 hover:text-accent-red transition-colors focus:outline-none"
                >
                  <Volume2 size={14} className={isMuted ? "opacity-40" : "opacity-100"} />
                </button>
                <span className="font-mono text-[10px] text-neutral-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest hidden sm:inline mr-2">// THRILLER DE MAXIMILIEN & CO</span>
                <button 
                  onClick={handleFullscreen}
                  className="p-1 hover:text-accent-red transition-colors focus:outline-none mr-2"
                  title="Plein écran"
                >
                  <Maximize size={14} className="opacity-80 hover:opacity-100" />
                </button>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between bg-neutral-900 border border-neutral-800 p-4 rounded-lg mt-4 gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-sm text-white font-bold tracking-widest uppercase">DOSSIER DE PRODUCTION</span>
              <span className="font-sans text-xs text-neutral-400 mt-1">Découvrez la symbolique, la direction artistique et le making-of du film.</span>
            </div>
            
            <a 
              href={noeUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-accent-red hover:bg-accent-red-hover text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-center rounded w-full sm:w-auto"
            >
              LIRE LE DOSSIER PDF
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ==========================================
   8. BRANDING / IDENTITÉ VISUELLE WIDGET
   ========================================== */
function BrandingWidget() {
  return (
    <div className="bg-neutral-950 border border-neutral-900 overflow-hidden text-white flex flex-col font-sans min-h-[500px] rounded-lg mt-8">
      {/* Branding Header */}
      <div className="flex items-center justify-between bg-neutral-900/60 border-b border-neutral-900 px-4 py-3">
        <div className="flex items-center space-x-2">
          <Paintbrush size={14} className="text-accent-red" />
          <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
            // BRANDING_ASSETS: Ô COEUR DES OCRES
          </span>
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 gap-6 bg-black flex-grow">
        {/* Ô Coeur des Ocres */}
        <div className="flex flex-col space-y-4 max-w-3xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Logo Image */}
            <div className="border border-neutral-900 p-4 rounded-lg bg-neutral-900/30 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500"></div>
              <img 
                src={ocres1Url}
                alt="Logo Ô Coeur des Ocres" 
                className="w-full h-auto max-h-[200px] object-contain relative z-10 p-4 drop-shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-4">
                <span className="font-mono text-xs text-neutral-500 mb-2">Image manquante</span>
                <span className="font-sans text-[10px] text-neutral-600">Veuillez uploader l'image du logo sous le nom "logo-ocres.png" dans le dossier public/</span>
              </div>
            </div>

            {/* Sign Image */}
            <div className="border border-neutral-900 p-4 rounded-lg bg-neutral-900/30 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden group shadow-2xl">
              <img 
                src={ocres2Url}
                alt="Signalétique Acier Corten" 
                className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-4 bg-neutral-900/80">
                <span className="font-mono text-xs text-neutral-500 mb-2">Image manquante</span>
                <span className="font-sans text-[10px] text-neutral-600">Veuillez uploader la photo de la plaque sous le nom "sign-ocres.jpg" dans le dossier public/</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

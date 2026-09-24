import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Paintbrush, Code, Shield, Cpu, ExternalLink, RefreshCw, Layers } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Skill } from '../types';

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(SKILLS_DATA[0]);

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const techSKills = SKILLS_DATA.filter((s) => s.category === 'engineering');
  const designSkills = SKILLS_DATA.filter((s) => s.category === 'design');

  return (
    <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-black text-white relative" id="section-skills">
      {/* Background massive watermark text */}
      <div className="absolute right-6 top-24 opacity-[0.03] select-none pointer-events-none z-0">
        <span className="text-[12rem] sm:text-[18rem] font-black leading-none tracking-tighter uppercase text-white block">
          MATRIX
        </span>
      </div>

      {/* Header section with double identity visual bar */}
      <div className="space-y-2 mb-12 relative z-10">
        {/* Index Counter Line representing Bold Typography theme */}
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-accent-red font-mono text-xs font-bold">03 / 05</span>
          <div className="h-px w-16 bg-accent-red"></div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">// PILLIERS DE CONCEPTION</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter">
          GRAPH & <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.45)' }}>COMPÉTENCES</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-neutral-400 font-serif italic tracking-wide max-w-2xl leading-relaxed">
          Mesurable par des livrables concrets
        </p>
      </div>

      {/* Main Core Grid Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Computer Science Engineering Stack */}
        <div className="lg:col-span-4 border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <div className="flex items-center space-x-2 font-mono text-xs font-bold text-white">
                <Terminal size={14} className="text-accent-red" />
                <span>INGÉNIEUR INFORMATIQUE</span>
              </div>
              <span className="font-mono text-[9px] text-neutral-600 uppercase">PROG // CORE</span>
            </div>

            <div className="space-y-6 max-h-[340px] overflow-y-auto scrollbar-thin pr-2">
              {techSKills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => handleSkillSelect(skill)}
                    className={`w-full text-left group focus:outline-none cursor-pointer p-4 transition-all border ${
                      isSelected 
                        ? 'bg-neutral-950 border-accent-red-hover' 
                        : 'bg-neutral-900/10 border-transparent hover:border-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs font-bold text-neutral-200 group-hover:text-accent-red transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-neutral-400 font-bold">{skill.level}%</span>
                    </div>

                    <div className="w-full bg-neutral-900 h-1 relative overflow-hidden">
                      <div
                        className="h-full bg-accent-red transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {skill.subskills.slice(0, 3).map((sub) => (
                        <span key={sub} className="text-[8px] font-mono bg-neutral-900 text-neutral-500 px-1.5 pb-0.5">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: Creative Design & Typography Stack */}
        <div className="lg:col-span-4 border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <div className="flex items-center space-x-2 font-mono text-xs font-bold text-white">
                <Paintbrush size={14} className="text-accent-red" />
                <span>DESIGNER</span>
              </div>
              <span className="font-mono text-[9px] text-neutral-600 uppercase">DESIGN // VISUAL</span>
            </div>

            <div className="space-y-6 max-h-[340px] overflow-y-auto scrollbar-thin pr-2">
              {designSkills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => handleSkillSelect(skill)}
                    className={`w-full text-left group focus:outline-none cursor-pointer p-4 transition-all border ${
                      isSelected 
                        ? 'bg-neutral-950 border-accent-red-hover' 
                        : 'bg-neutral-900/10 border-transparent hover:border-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-medium text-xs text-neutral-200 group-hover:text-accent-red transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-neutral-400 font-bold">{skill.level}%</span>
                    </div>

                    <div className="w-full bg-neutral-900 h-1 relative overflow-hidden">
                      <div
                        className="h-full bg-accent-red transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {skill.subskills.slice(0, 3).map((sub) => (
                        <span key={sub} className="text-[8px] font-mono bg-neutral-900 text-neutral-500 px-1.5 pb-0.5">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inspector & Live Console */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* Selected Skill Attribute Inspector Card */}
          <div className="border border-neutral-800 bg-neutral-950 p-6 relative flex-grow flex flex-col justify-between">
            {/* Ticks decoration */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-red" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-red" />
            
            {selectedSkill ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-accent-red uppercase tracking-wider">// COMPÉTENCES INSPECTOR</span>
                  <span className="font-mono text-[9px] font-bold bg-neutral-900 text-neutral-400 px-1.5 py-0.5 uppercase">
                    {selectedSkill.category}
                  </span>
                </div>

                <div className="border-b border-neutral-900 pb-3">
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white mb-1">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex gap-2 items-center text-xs text-neutral-400 font-mono">
                    <span>Niveau : {selectedSkill.level}%</span>
                    <span className="text-neutral-700">|</span>
                    <span className="text-accent-red font-semibold">Active Module</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                  {selectedSkill.description}
                </p>

                {/* Full Subskills bullet listing */}
                <div className="space-y-1.5 pt-2">
                  <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold">// MODULES TECHNIQUES :</span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSkill.subskills.map((sub) => (
                      <div key={sub} className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                        <span className="text-accent-red font-bold">+</span>
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center font-mono text-xs text-neutral-500">
                Sélectionnez un pilier de compétence pour inspecter...
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

/**
 * Types declarations for the double-profile portfolio (Ingénieur Informatique & Designer)
 */

export type NavSection = 'home' | 'projects' | 'skills' | 'timeline' | 'contact';

export type ProjectCategory = 'engineering' | 'design' | 'hybrid';

export type ProjectType = 'personnel' | 'partenaire';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  projectType?: ProjectType;
  shortDescription: string;
  descriptionMarkdown: string;
  year: string;
  role: string;
  techStack: string[];
  designConcepts: string[];
  specs: { label: string; value: string }[];
  demoType: 'mobile' | 'video' | 'branding' | '3d-gallery';
}

export interface Skill {
  name: string;
  category: 'engineering' | 'design';
  level: number; // 0-100
  subskills: string[];
  description: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  type: 'academic' | 'professional' | 'hybrid-highlight';
  description: string;
  bullets: string[];
  side: 'engineering' | 'design' | 'both';
}

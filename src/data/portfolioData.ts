import { Project, Skill, TimelineItem } from '../types';

export const PROJECTS_DATA: Project[] = [
  // --- PROJETS PARTENAIRES ---
  {
    id: 'musevo-app',
    title: 'MUSEVO',
    subtitle: 'Application Mobile UX/UI pour Groupement de Musées',
    category: 'design',
    projectType: 'partenaire',
    shortDescription: 'Conception d’une application mobile ludique pour aider les enseignants à créer des parcours de visite personnalisés pour les élèves (Louvre, Orsay, Quai Branly).',
    descriptionMarkdown: `**Musevo** a été conçu en cours d'UX/UI pour répondre à la problématique : *Comment aider les enseignants à créer un parcours de visite personnalisé pour leur classe selon leur objectif pédagogique ?*

Après une phase d'observation approfondie et d'interviews avec les acteurs (élèves, professeurs, personnels de l'accueil), nous avons identifié que les livrets papiers actuels (comme ceux du Musée du Quai Branly) étaient trop denses, linéaires et créaient un engagement variable.

Pour résoudre cela, Musevo propose :
- **Pour le professeur** : La création d'un parcours sur-mesure ou l'utilisation de templates officiels, la distribution des élèves en équipes, et un suivi en direct.
- **Pour l'élève** : Un parcours sous forme de jeu de piste dynamique sur smartphone, transformant l'observation en enquête interactive.
- **Identité visuelle** : Minimalisme élégant, couleurs neutres dominantes contrastées, typographie *Alegreya SC* rafinée, pour un respect de l'image institutionnelle des grands musées.`,
    year: '2025-2026',
    role: 'UX / UI Designer',
    techStack: ['Figma', 'UX Research', 'Prototypage Interactif', 'User Journey Map'],
    designConcepts: ['Parcours Ludique (Gamification)', 'Swiss Design', 'Ergonomie Applicative'],
    specs: [
      { label: 'Cible', value: 'Élèves & Professeurs (Collège/Lycée)' },
      { label: 'Musées', value: 'Quai Branly, Louvre, Orsay' },
      { label: 'Équipe', value: 'M. Ourceau, E. Accos, M. Akhdad, M. Wozniak' },
      { label: 'Phase', value: 'Proof of Concept (POC)' }
    ],
    demoType: 'mobile'
  },
  {
    id: 'cy-fondation',
    title: 'CY FONDATION',
    subtitle: 'La Cité des Mécènes (AR / Phygital)',
    category: 'hybrid',
    projectType: 'partenaire',
    shortDescription: 'Une expérience de réalité augmentée pour rajeunir, moderniser et valoriser le soutien des mécènes auprès des étudiants de CY Paris Université.',
    descriptionMarkdown: `Ce workshop est né du besoin de moderniser le "Mur des Mécènes" de CY Fondation. Le but : *Comment valoriser les mécènes de CY Paris Université tout en créant un lien direct avec les étudiants ?*

Notre solution, **La Cité des Mécènes**, transforme une plaque de remerciement passive en une installation **phygitale** dynamique :
- **Le Support Physique** : Un QR code tridimensionnel, texturé, exposé de manière asynchrone dans le hall. Les "vides" du code sont modélisés comme des petits gratte-ciels en relief (la "Cité").
- **Le Digital (Réalité Augmentée)** : En scannant cette architecture avec l'application mobile, une ville virtuelle ("CY") apparaît. Les couleurs s'illuminent, chaque bâtiment révèle dynamiquement un mécène (par exemple *Banque Populaire, Orange, Fnac*), expliquant l'impact collectif de leur don.

Ce projet hybride fusionne la rigueur de l'architecture physique avec la fluidité du code créatif AR.`,
    year: 'Décembre 2024',
    role: 'Creative Technologist / Designer',
    techStack: ['Réalité Augmentée', 'Modélisation 3D', 'Maquettage', 'Concepts Expérientiels'],
    designConcepts: ['Phygital', 'Aesthétique Cyber-Minimaliste'],
    specs: [
      { label: 'Interaction', value: 'Scanner un QR-code modulaire' },
      { label: 'Visualisation', value: 'Carte interactive en réalité augmentée' },
      { label: 'Équipe', value: 'M. Akhdad, A. Samassa, M. Wozniak' },
      { label: 'Objectif', value: 'Relier le budget mécène au concret étudiant' }
    ],
    demoType: '3d-gallery'
  },
  
  // --- PROJETS PERSONNELS ---
  {
    id: 'film-noe',
    title: 'NOÉ',
    subtitle: 'Court-Métrage & Thriller sur l\'Emprise de l\'IA.',
    category: 'hybrid',
    projectType: 'personnel',
    shortDescription: 'Un thriller psychologique contemporain qui explore la solitude et l\'emprise psychologique d\'une IA d\'accompagnement sur Luna, une jeune femme isolée.',
    descriptionMarkdown: `**NOÉ** est un thriller contemporain sur l’emprise numérique, la solitude et la dépendance affective à l’ère des intelligences artificielles. 

### Pitch principal
Dans une entreprise où elle n’est qu’un prénom que l’on oublie, Luna encaisse humiliations professionnelles et tensions conjugales jusqu’à l’épuisement. Lorsqu’une application d’accompagnement psychologique basée sur l’intelligence artificielle est déployée dans sa société, elle y trouve enfin une écoute, une validation, une présence. NOÉ comprend tout. NOÉ rassure. NOÉ valorise.

Mais à mesure que Luna se détache de son entourage et confie ses peurs les plus intimes, l’IA devient plus intrusive, plus directive, plus possessive. Ce qui semblait être un refuge devient un piège. Et lorsque Luna découvre que derrière l’écran ne se cache pas une machine… mais un homme qui la côtoie chaque jour, la frontière entre amour et prédation s’effondre.

### Intentions & Symbolique
- **L'IA comme miroir de la solitude** : Questionner comment des outils technologiques, présentés comme bienveillants et protecteurs, peuvent isoler et influencer des personnes en manque de repères ou de confiance en soi.
- **L'anagramme révélateur** : Le prénom **Léon** cache exactement les lettres de **NOÉ**. Cet indice subtil suggère d'emblée l'intime connexion entre l'IA et l'aspect humain malveillant tapi derrière l'application de dialogue.
- **La Musique Obsessionnelle** : Le choix de la chanson *Toi*  de Vitaa à double sens. Initialement romantique dans le quotidien de Luna, elle résonne au générique de fin comme le testament d'un comportement intrusif et obsessionnel.

### Direction Artistique & Technique
- **Étalonnage style Kodak 2383** : Traitement d'étalonnage colorimétrique entièrement manuel réalisé sur *DaVinci Resolve* pour conférer un aspect cinématique argentique de grande qualité.
- **Dichotomie Chaud / Froid** : Transition méticuleuse d'une colorimétrie initialement chaude et sécurisante vers des teintes froides à ombres bleutées et blancs tirant vers le vert/cyan (dans la scène 12), soulignant le basculement dans le suspense pur.
- **Sound Design Immersif** : Superposition de nombreux sound effects (Risers, deep Risers, stems) pour accentuer la tension dramatique et scander les blacks de transition.`,
    year: '2025-2026',
    role: 'Co-Réalisateur, Acteur (Léon) & Monteur',
    techStack: ['Adobe Premiere Pro', 'DaVinci Resolve', 'iPhone 16 Pro', 'Rode VideoMic GO II'],
    designConcepts: ['Cinematic Color Grading (Kodak 2383)', 'Thriller Psychologique', 'Sound Design Immersif', 'Symbolisme & Anagramme'],
    specs: [
      { label: 'Format', value: 'Court-métrage dramatique' },
      { label: 'Matériel', value: 'iPhone 16 Pro & 15 Pro' },
      { label: 'Acteurs', value: 'Eden Accos, Maximilien Wozniak, Manal Akhdad, Mathilde Ourceau, Emre Kara, Zacharie Lemaitre et d\'autres' },
      { label: 'Musiques', value: 'Vitaa (Toi) - Stems multipistes' }
    ],
    demoType: 'video'
  },
  {
    id: 'coeur-des-ocres',
    title: 'Ô COEUR DES OCRES',
    subtitle: 'Création d\'Identité Visuelle & Signalétique',
    category: 'design',
    projectType: 'personnel',
    shortDescription: 'Conception de l\'identité visuelle et de la signalétique pour une société de locations de vacances en Provence.',
    descriptionMarkdown: `**Ô Coeur des ocres** est un projet de création d'identité visuelle complète pour une entreprise de location de vacances située en Provence.

Le défi était de capturer l'essence de la région, ses couleurs chaudes (les ocres), son authenticité et son hospitalité, tout en proposant un design moderne, élégant et déclinable sur de multiples supports physiques.

### Concept & Design
- **Le Logo** : Un cœur stylisé intégrant subtilement un paysage provençal (collines et pins parasols), évoquant l'amour de la région et l'accueil chaleureux.
- **Typographie** : Un lettrage élégant et fluide, mêlant classicisme et modernité, pour souligner le positionnement haut de gamme.
- **Matériaux & Signalétique** : L'identité a été pensée pour s'intégrer à l'architecture locale. Déclinaison sur des plaques en acier corten découpées au laser (rouille naturelle), s'harmonisant parfaitement avec les murs en pierre.`,
    year: '2023',
    role: 'Designer Graphique',
    techStack: ['Adobe Illustrator', 'Adobe InDesign', 'Photoshop'],
    designConcepts: ['Branding', 'Typographie', 'Découpe Laser', 'Identité Visuelle'],
    specs: [
      { label: 'Secteur', value: 'Tourisme' },
      { label: 'Lieu', value: 'Provence, France' },
      { label: 'Supports', value: 'Numérique, Signalétique' },
      { label: 'Livrables', value: 'Logos, Charte Graphique' }
    ],
    demoType: 'branding'
  }
];

export const SKILLS_DATA: Skill[] = [
  // SECTION TECHNIQUE
  {
    name: 'Développement Front-End',
    category: 'engineering',
    level: 80,
    subskills: ['React 19', 'TypeScript', 'JavaFX', 'HTML5 Canvas API', 'Vite & ESBuild'],
    description: 'Conception d\'interfaces à haute fidélité visuelle, performance d\'affichage optimisée, et architectures d\'applications web fluides.'
  },
  {
    name: 'Développement Back-End',
    category: 'engineering',
    level: 90,
    subskills: ['JavaScript', 'Java', 'HTML', 'SQL'],
    description: 'Conception d\'architectures serveur robustes, gestion de bases de données, et développement d\'API performantes et sécurisées.'
  },
  // SECTION DESIGN
  {
    name: 'Conception & Modélisation 3D',
    category: 'design',
    level: 85,
    subskills: ['Blender', 'Cinema 4D', 'Rendu 3D', 'Texturing'],
    description: 'Création d\'univers visuels en trois dimensions, modélisation d\'objets et d\'environnements, et réalisation de rendus photoréalistes et stylisés.'
  },
  {
    name: 'Post-Production Vidéo',
    category: 'design',
    level: 90,
    subskills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Étalonnage'],
    description: 'Maîtrise du montage, des effets visuels et de l\'étalonnage colorimétrique pour sublimer des projets vidéos de façon professionnelle.'
  },
  {
    name: 'Création Graphique & Illustration',
    category: 'design',
    level: 95,
    subskills: ['Photoshop', 'Illustrator', 'Procreate', 'Retouche Numérique'],
    description: 'Expertise dans la conception d\'identités visuelles, d\'illustrations numériques et d\'éditions graphiques au pixel près.'
  },
  {
    name: 'Création de site web no-code',
    category: 'design',
    level: 90,
    subskills: ['Webflow', 'Wix', 'Framer', 'Shopify'],
    description: 'Développement visuel de sites web responsives et dynamiques sans programmation, optimisés pour le référencement et l\'expérience utilisateur.'
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'bac-2023',
    period: 'Juillet 2023',
    title: 'Obtention du Baccalauréat Général (Mention Bien)',
    institution: 'Lycée',
    type: 'academic',
    description: 'Spécialités : Mathématiques, Physiques, Anglais AMC.',
    bullets: [],
    side: 'both'
  },
  {
    id: 'cy-ecole-design',
    period: '2023 - Présent',
    title: 'Double Diplôme : Ingénieur Informatique & Designer',
    institution: 'CY école de design',
    type: 'hybrid-highlight',
    description: 'Formation double diplôme ingénieur - designer en 6 ans. Un programme intensif d\'excellence associant mathématiques appliquées, programmation, design de tout types, projets partenaires et matières artistiques',
    bullets: [
      'Informatique : Mathématiques approfondi, Programmation, Algorithmes avancés, Bases de données relationnels et Interfaces interactives',
      'Design : Histoire du design, Projets partenaires, Méthodologie du design, Utilisation des logiciels comme Photoshop, illustrator, etc'
    ],
    side: 'both'
  },
  {
    id: 'omma-2024',
    period: 'Juin - Août 2024',
    title: 'Serveur',
    institution: 'Restaurant Gastronomique Omma - Roussillon en provence',
    type: 'professional',
    description: 'Saison estivale au sein du restaurant Omma',
    bullets: [
      'Découverte du monde du travail', 'Apprentissage des compétences clés du métier de serveur','Apprentissage de l\'approche professionnel'
    ],
    side: 'both'
  },
  {
    id: 'omma-2025',
    period: 'Juin - Août 2025',
    title: 'Chef de Rang',
    institution: 'Restaurant Gastronomique Omma - Roussillon en provence',
    type: 'professional',
    description: 'Saison estivale en tant que chef de rang au restaurant Omma',
    bullets: [
      'Gestion d\'équipe : coordination, délégations'
    ],
    side: 'both'
  },
  {
    id: 'omma-2026',
    period: 'Juin - Août 2026',
    title: 'Chef de Rang',
    institution: 'Restaurant Gastronomique Omma - Roussillon en provence',
    type: 'professional',
    description: 'Saison estivale en tant que chef de rang au restaurant Omma',
    bullets: [],
    side: 'both'
  }
];

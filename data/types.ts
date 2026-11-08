export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroStat {
  label: string;
  value: string;
  highlightDot?: boolean;
}

export interface Profile {
  name: string;
  eyebrow: string;
  headline: string;
  heroDescriptions: string[];
  heroStats: HeroStat[];
  seoTitle: string;
  seoDescription: string;
  navbarLogo: {
    start: string;
    accent: string;
    end: string;
  };
  verified: boolean;
  avatarUrl: string;
  avatarHoverUrl: string;
  darkAvatarUrl: string;
  darkAvatarHoverUrl: string;
  location: string;
  shortLocation: string;
  roles: string[];
  availability: {
    status: boolean;
    label: string;
    shortLabel: string;
    contactNote: string;
  };
  credentials: string[];
  award: string;
  email: string;
  callLink?: string;
  githubUsername: string;
  bio: string[];
  social: SocialLink[];
}

export interface ProofLink {
  label: string;
  href: string;
}

export interface ArchitectureNode {
  label: string;
  detail: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  solution: string;
  responsibilities: string[];
  features: string[];
  challenges?: string[];
  outcomes: string[];
}

export interface Project {
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  category: string;
  role: string;
  tier: "primary" | "core" | "additional";
  url?: string;
  github?: string;
  status: "live" | "ongoing" | "research";
  statusLabel: string;
  featured?: boolean;
  tags: string[];
  metrics?: string[];
  highlights?: string[];
  proofLinks?: ProofLink[];
  architectureSummary?: {
    headerLabel: string;
    badgeLabel: string;
    nodes: ArchitectureNode[];
    footerLeft: string;
    footerRight: string;
  };
  caseStudy: ProjectCaseStudy;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface SkillItem {
  name: string;
  primary?: boolean;
  note?: string;
}

export interface CapabilityGroup {
  title: string;
  skills: SkillItem[];
}

export interface AiToolItem {
  name: string;
  description: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  year: string;
  period?: string;
  description?: string;
  technologies?: string[];
  isCurrent?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  year?: string;
  image: string;
  link: string;
  highlight?: string;
}

export interface GalleryItem {
  image: string;
  caption?: string;
}

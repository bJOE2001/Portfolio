export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
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
  roles: string[];
  availability: {
    status: boolean;
    label: string;
  };
  credentials: string[];
  award: string;
  email: string;
  callLink?: string;
  facebookLink: string;
  githubUsername: string;
  bio: string[];
  social: SocialLink[];
}

export interface Project {
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  category: string;
  url?: string;
  github?: string;
  status: "live" | "ongoing" | "research";
  featured?: boolean;
  tags: string[];
  metrics?: string[];
  highlights?: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  year: string;
  period?: string;
  description?: string;
  isCurrent?: boolean;
}

export interface CapabilityCategory {
  title: string;
  skills: string[];
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

import { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "librasense",
    name: "LibraSense",
    subtitle: "Smart Library Engagement and Management System",
    category: "Full-Stack · Machine Learning · Research",
    description:
      "An end-to-end library engagement and catalog management system augmented with ML-powered analytics and resource forecasting, accepted for user acceptability testing by the City Government of Tagum (CICTMO) and presented at BINHI 2026.",
    url: "https://librasense.org",
    status: "live",
    featured: true,
    tags: ["Laravel", "FastAPI", "Python", "PostgreSQL", "ML"],
    metrics: [
      "User Acceptability Accepted by Tagum City CICTMO",
      "Presented at BINHI 2026 Research Conference",
      "Predictive Borrowing & Resource Utilization Analytics",
    ],
    highlights: [
      "Engineered full-stack architecture pairing Laravel RESTful APIs with a Python FastAPI microservice for ML inferences.",
      "Structured PostgreSQL schema for relational catalog data, patron borrowing workflows, and attendance logging.",
      "Designed intuitive administrative dashboards for circulation tracking and inventory auditing.",
    ],
  },
  {
    slug: "leave-management-system",
    name: "Leave Management System",
    subtitle: "Municipal HR Automation & Workflow Platform",
    category: "Enterprise / Government Systems",
    description:
      "Enterprise HR management platform automating civil service leave processing, approval hierarchies, and biometric/ledger tracking for the City Government of Tagum.",
    url: "https://tagumcity.gov.ph/lms/login",
    status: "live",
    featured: false,
    tags: ["Vue.js", "Quasar", "Laravel", "REST APIs"],
    metrics: [
      "Production deployment for Tagum City Government",
      "Multi-tiered approval workflows",
    ],
    highlights: [
      "Built dynamic, accessible frontend interfaces with Quasar framework and Vue.js.",
      "Implemented secure role-based authorization for department heads and HR personnel.",
    ],
  },
  {
    slug: "nligw-carmen",
    name: "NLIGW Carmen",
    subtitle: "Church Community & Discipleship Platform",
    category: "Web Application & CMS",
    description:
      "Official multimedia web platform featuring sermon archives, ministry directories, event management, and structured discipleship pathways.",
    url: "https://newlifecarmen.vercel.app",
    status: "live",
    featured: false,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    metrics: ["Sub-second page transitions", "Real-time headless content updates"],
    highlights: [
      "Architected using Next.js App Router for optimal SEO, responsive media delivery, and fluid navigation.",
      "Integrated Sanity CMS for seamless multimedia publishing by church administrators.",
    ],
  },
  {
    slug: "selah-app",
    name: "Selah: Bible & Devotional",
    subtitle: "Cross-Platform Scripture & Habit Tracking App",
    category: "Mobile Application",
    description:
      "Distraction-free mobile application designed for scripture reading, devotional journaling, and daily spiritual habit tracking with offline local database persistence.",
    url: "https://github.com/bJOE2001/selah-app",
    github: "https://github.com/bJOE2001/selah-app",
    status: "live",
    featured: false,
    tags: ["React Native", "Expo", "SQLite", "TypeScript"],
    metrics: ["100% Offline-First Architecture", "Cross-Platform iOS & Android"],
    highlights: [
      "Built native mobile experience using React Native and Expo with optimized SQLite local storage.",
      "Implemented customized typography rendering and dark-mode reading interfaces.",
    ],
  },
  {
    slug: "sol-chms",
    name: "New Life — SOL ChMS",
    subtitle: "School of Leaders Management System",
    category: "Web Application & Database",
    description:
      "Specialized church management system tracking student lifecycle, lesson milestones, and graduation metrics for leadership academy cohorts.",
    url: "https://newlifecarmen.vercel.app/sol",
    status: "live",
    featured: false,
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    metrics: ["Real-time student progress tracking", "Automated cohort analytics"],
    highlights: [
      "Configured Supabase backend with Row Level Security for authenticated attendance tracking.",
      "Built responsive dashboard with instant filtering and cohort export features.",
    ],
  },
];

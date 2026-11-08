import { Profile } from "./types";

export const profile: Profile = {
  name: "Belly Joe Basadre",
  eyebrow: "FULL-STACK DEVELOPER",
  headline: "Building web applications that solve real-world problems.",
  heroDescriptions: [
    "I help businesses and organizations build reliable web applications, automate workflows, and turn ideas into functional digital solutions.",
    "Specializing in Laravel, Vue.js, Quasar, React, and database-driven systems, I combine practical software engineering with AI-assisted development to deliver maintainable applications.",
  ],
  heroStats: [
    {
      label: "Specialization",
      value: "Full-Stack Development",
    },
    {
      label: "Core Stack",
      value: "Laravel · Vue · React",
    },
    {
      label: "Workflow",
      value: "AI-Assisted Development",
    },
    {
      label: "Availability",
      value: "Open for Projects",
      highlightDot: true,
    },
  ],
  seoTitle: "Belly Joe Basadre — Full-Stack Developer",
  seoDescription:
    "Full-Stack Developer in the Philippines helping businesses and organizations build custom web applications, management systems, workflow automation, and REST APIs with Laravel, Vue.js, Quasar, and React.",
  navbarLogo: {
    start: "bellyjoe",
    accent: ".",
    end: "dev",
  },
  verified: true,
  avatarUrl: "/profile.jpg",
  avatarHoverUrl: "/thumbsup.png",
  darkAvatarUrl: "/sleeping.png",
  darkAvatarHoverUrl: "/sleepinghover.png",
  location: "Davao del Norte, Philippines",
  shortLocation: "Philippines",
  roles: ["Full-Stack Developer"],
  availability: {
    status: true,
    label: "Available for select freelance projects and long-term remote collaborations.",
    shortLabel: "Open for Projects",
    contactNote: "Available for select freelance projects and remote collaborations.",
  },
  credentials: [
    "Full-Stack Web Application & System Development",
    "BS Information Technology — Davao del Norte State College",
    "BINHI 2026 Research Presenter — LibraSense",
    "Prompt Like an Engineer — Cisco Networking Academy",
  ],
  award: "BINHI 2026 Research Presenter",
  email: "basadre.bellyjoe@gmail.com",
  callLink: "https://calendly.com/basadre-bellyjoe/30min",
  githubUsername: "bJOE2001",
  bio: [
    "I am a Full-Stack Developer based in the Philippines helping businesses and organizations build custom web applications, internal management systems, automated workflows, and API integrations.",
    "My core stack centers on Laravel, PHP, Vue.js, Quasar Framework, React, TypeScript, Next.js, SQL Server, and PostgreSQL, paired with an engineer-driven AI-assisted workflow.",
    "I focus on writing maintainable code, structuring reliable relational databases, and shipping software tailored to real operational needs.",
  ],
  social: [
    { label: "GitHub", href: "https://github.com/bJOE2001" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bellyjoedev" },
  ],
};

export const social = profile.social;

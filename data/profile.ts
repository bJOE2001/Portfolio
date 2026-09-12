import { Profile } from "./types";

export const profile: Profile = {
  name: "Belly Joe Basadre",
  seoTitle: "Belly Joe Basadre — Full-Stack Developer",
  seoDescription: "Full-stack developer building modern web applications, enterprise systems, and digital products with Next.js, Laravel, TypeScript, and modern web technologies.",
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
  location: "Carmen, Davao del Norte, Philippines",
  roles: ["Full-Stack Developer"],
  availability: {
    status: true,
    label: "Available for select projects",
  },
  credentials: [
    "Web Developer at City Government of Tagum",
    "BS Information Technology — DNSC",
    "Prompt Like an Engineer — Cisco / DICT-ITU",
    "Capstone Project — LibraSense (Accepted by CICTMO)",
    "BINHI Research Presenter",
  ],
  award: "BINHI 2026 Research Presenter",
  email: "basadre.bellyjoe@gmail.com",
  callLink: "https://calendly.com/basadre-bellyjoe/30min",
  facebookLink: "https://www.facebook.com/bellyjoe.official",
  githubUsername: "bJOE2001",
  bio: [
    "I'm a responsible and hardworking Full-Stack Developer who builds practical, resilient, and meaningful web applications. Currently serving as a Web Developer for the City Government of Tagum, I specialize in end-to-end web architectures, automated workflows, and data-driven systems.",
    "My focus is on engineering clean, maintainable codebases with intentional UI/UX design. From municipal HR portals to ML-backed library management systems, I enjoy turning complex operational challenges into dependable software.",
    "Driven by continuous learning and pragmatic engineering, my goal is to deliver digital solutions that are reliable, accessible, and high-impact.",
  ],
  social: [
    { label: "GitHub", href: "https://github.com/bJOE2001" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bellyjoedev" },
    { label: "Instagram", href: "https://www.instagram.com/itsmebellyj" },
    { label: "Facebook", href: "https://www.facebook.com/bellyjoe.official" },
  ],
};

export const social = profile.social;

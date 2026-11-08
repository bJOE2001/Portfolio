import { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "tcysdo-youth-information-system",
    name: "TCYSDO Youth Information System",
    subtitle: "Tagum City Youth & Sports Development Office Platform",
    category: "Government Information System",
    role: "Full-Stack Developer — End-to-End Development",
    tier: "primary",
    description:
      "Independently designed and developed a complete Youth Information System for the Tagum City Youth and Sports Development Office. The application centralizes youth information management and supports organizational data collection and administrative workflows.",
    url: "https://tagumcity.gov.ph/TCYSDO/",
    status: "live",
    statusLabel: "Live System",
    featured: true,
    tags: [
      "Laravel",
      "Quasar Framework",
      "SQL Server",
      "OpenAI Codex (AI-Assisted Development)",
    ],
    highlights: [
      "Centralized youth registry and organizational data collection",
      "Administrative record management and workflow support",
      "End-to-end architecture from relational schema to frontend UI",
    ],
    architectureSummary: {
      headerLabel: "System Architecture",
      badgeLabel: "End-to-End Build",
      nodes: [
        { label: "Frontend Client", detail: "Quasar Framework SPA" },
        { label: "Application Backend", detail: "Laravel REST API" },
        { label: "Data Persistence", detail: "Microsoft SQL Server" },
      ],
      footerLeft: "TCYSDO · Tagum City",
      footerRight: "Live Web System",
    },
    caseStudy: {
      overview:
        "A web-based Youth Information System independently designed and developed end-to-end for the Tagum City Youth and Sports Development Office (TCYSDO).",
      problem:
        "Managing youth demographic records and organizational data across scattered spreadsheets or manual forms makes administrative tracking, verification, and reporting slower to maintain.",
      solution:
        "Built a centralized web platform connecting a responsive Quasar Framework interface with a Laravel backend and Microsoft SQL Server database to standardize data capture and daily office workflows.",
      responsibilities: [
        "Independently handled end-to-end requirements translation, system architecture, and implementation.",
        "Designed and structured relational tables and queries in Microsoft SQL Server.",
        "Developed backend REST API endpoints, validation rules, and business logic in Laravel.",
        "Built responsive administrative dashboards, data entry workflows, and management views using Quasar Framework.",
        "Used OpenAI Codex as part of an engineer-reviewed AI-assisted workflow for faster implementation and debugging.",
      ],
      features: [
        "Centralized youth profile and organizational record management",
        "Structured administrative data collection and validation workflows",
        "Searchable registries and administrative management views",
        "Authenticated role-scoped office access",
      ],
      outcomes: [
        "Delivered a complete, maintainable web system accessible at tagumcity.gov.ph/TCYSDO/.",
        "Streamlined youth information management and administrative data organization for TCYSDO.",
      ],
    },
  },
  {
    slug: "leave-management-system",
    name: "Tagum City Leave Management System",
    subtitle: "HR Leave Workflows, Credit Computation & Notifications",
    category: "Government / Business Process Automation",
    role: "Contributing Full-Stack Developer",
    tier: "core",
    description:
      "Contributed to a government Leave Management System featuring automated leave approval workflows, tardiness calculations, compensatory overtime credits, and SMS notifications.",
    url: "https://tagumcity.gov.ph/lms/login",
    status: "live",
    statusLabel: "Live System",
    featured: false,
    tags: [
      "Laravel",
      "Vue.js",
      "Quasar Framework",
      "OpenAI Codex (AI-Assisted Development)",
    ],
    highlights: [
      "Multi-step leave filing and approval workflows",
      "Automated tardiness and compensatory overtime credit calculations",
      "SMS status notifications for leave updates",
    ],
    architectureSummary: {
      headerLabel: "Workflow Modules",
      badgeLabel: "Team Contribution",
      nodes: [
        { label: "Approval Engine", detail: "Multi-step HR routing" },
        { label: "Credit Rules", detail: "Tardiness & COC ledger" },
        { label: "Messaging", detail: "Automated SMS alerts" },
      ],
      footerLeft: "Laravel · Vue.js · Quasar",
      footerRight: "Live Portal",
    },
    caseStudy: {
      overview:
        "A government HR workflow platform supporting digital leave applications, approval hierarchies, credit computations, and employee notifications for the City Government of Tagum.",
      problem:
        "Manual paper-based leave routing, tardiness deductions, and compensatory overtime credit tracking create delays for both employees and HR administrators.",
      solution:
        "Collaborated on a web-based Leave Management System using Laravel, Vue.js, and Quasar Framework to digitize approval steps, automate credit calculations, and send timely SMS updates.",
      responsibilities: [
        "Contributed as a full-stack developer alongside the development team on system modules and enhancements.",
        "Implemented and refined frontend components and administrative views in Vue.js and Quasar Framework.",
        "Worked on Laravel backend logic supporting leave approval workflows, tardiness computations, compensatory overtime credits, and SMS notifications.",
        "Utilized OpenAI Codex within an engineer-verified workflow for feature implementation and issue resolution.",
      ],
      features: [
        "Automated multi-tier leave filing and approval workflows",
        "Tardiness deduction and leave balance calculations",
        "Compensatory Overtime Credit (COC) tracking",
        "SMS notification integration for application status updates",
      ],
      outcomes: [
        "Deployed for municipal HR operations at tagumcity.gov.ph/lms/login.",
        "Reduced manual routing steps across leave filing, credit calculation, and status follow-ups.",
      ],
    },
  },
  {
    slug: "sol-management-system",
    name: "New Life School of Leaders — Management System",
    subtitle: "Cohort, Attendance & Progression Administration",
    category: "Web Application / Management System",
    role: "Full-Stack Developer — End-to-End Development",
    tier: "core",
    description:
      "Developed a management system for student attendance, lesson progression, cohort management, role-based access control, and audit trails.",
    url: "https://newlifecarmen.vercel.app/sol",
    status: "live",
    statusLabel: "Live Application",
    featured: false,
    tags: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL"],
    highlights: [
      "Student attendance and multi-stage lesson progression tracking",
      "Cohort administration with role-based access control (RBAC)",
      "Database-level security policies and administrative audit trails",
    ],
    architectureSummary: {
      headerLabel: "Application Stack",
      badgeLabel: "End-to-End Build",
      nodes: [
        { label: "SPA Frontend", detail: "React + TypeScript + Vite" },
        { label: "Auth & RBAC", detail: "Supabase Row-Level Security" },
        { label: "Relational Store", detail: "PostgreSQL + Audit Logs" },
      ],
      footerLeft: "React · Vite · Supabase",
      footerRight: "Live Web App",
    },
    caseStudy: {
      overview:
        "An administrative management web application built with React, TypeScript, and Vite backed by Supabase and PostgreSQL for managing leadership training cohorts.",
      problem:
        "Coordinating student attendance, lesson milestones, and cohort completion across multiple classes required structured role permissions and reliable change tracking.",
      solution:
        "Engineered a responsive React and Vite single-page management system integrated with PostgreSQL and Supabase authentication, enforcing role-based access control and recording administrative audit trails.",
      responsibilities: [
        "Designed and built the React + TypeScript + Vite frontend architecture and administrative interfaces.",
        "Modeled the PostgreSQL relational schema for cohorts, students, attendance records, and lesson milestones.",
        "Configured Supabase authentication and Row-Level Security (RLS) for role-based access control.",
        "Implemented audit trail logging to track administrative updates across student and cohort records.",
      ],
      features: [
        "Student enrollment and cohort lifecycle management",
        "Session attendance logging and lesson progression tracking",
        "Role-based access control (RBAC) for administrators and coordinators",
        "Audit trail history for accountability across record modifications",
      ],
      outcomes: [
        "Live and accessible at newlifecarmen.vercel.app/sol.",
        "Centralized attendance, progression, and cohort administration into a single permissioned system.",
      ],
    },
  },
  {
    slug: "librasense",
    name: "LibraSense",
    subtitle: "Smart Library Management & ML Analytics System",
    category: "Full-Stack Development / Machine Learning / Research",
    role: "Full-Stack & ML Integration Developer",
    tier: "core",
    description:
      "Developed a smart library management system integrating circulation workflows, QR-based features, machine learning demand forecasting, and anomaly detection. The project received academic recognition and was presented at BINHI 2026.",
    url: "https://librasense.org",
    status: "research",
    statusLabel: "Capstone & Research",
    featured: false,
    tags: [
      "Laravel",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "XGBoost",
      "Isolation Forest",
      "Cursor (AI-Assisted Development)",
    ],
    highlights: [
      "Presented at the BINHI 2026 Research Conference",
      "Capstone completion & user acceptability recognized by CICTMO & DNSC",
      "Laravel + PostgreSQL core integrated with a Python FastAPI ML service",
    ],
    proofLinks: [
      {
        label: "BINHI 2026 Presentation Certificate",
        href: "/Capstone project presentation from Binhi.jpg",
      },
      {
        label: "CICTMO User Acceptability Certificate",
        href: "/Capstone project certificate from organization.jpg",
      },
    ],
    architectureSummary: {
      headerLabel: "Hybrid Service Architecture",
      badgeLabel: "Capstone & Research",
      nodes: [
        { label: "Core Web System", detail: "Laravel + PostgreSQL + QR" },
        { label: "Demand Forecasting", detail: "FastAPI · XGBoost" },
        { label: "Anomaly Detection", detail: "FastAPI · Isolation Forest" },
      ],
      footerLeft: "Presented at BINHI 2026",
      footerRight: "CICTMO User Acceptability",
    },
    caseStudy: {
      overview:
        "A smart library management capstone and research project pairing a Laravel and PostgreSQL web platform with a Python FastAPI machine learning service for demand forecasting and anomaly detection.",
      problem:
        "Conventional library catalog and borrowing trackers record transactions but lack automated insight into future resource demand and unusual circulation or attendance patterns.",
      solution:
        "Combined full-stack library circulation and QR workflows in Laravel and PostgreSQL with a dedicated FastAPI microservice executing XGBoost demand forecasting and Isolation Forest anomaly detection.",
      responsibilities: [
        "Engineered the full-stack Laravel web application and PostgreSQL database schema for catalog, patron, and circulation records.",
        "Integrated QR-based patron and borrowing workflows into the administrative interface.",
        "Connected Laravel with a Python FastAPI service exposing XGBoost forecasting and Isolation Forest anomaly detection endpoints.",
        "Used Cursor for AI-assisted code editing and debugging during development and research preparation.",
      ],
      features: [
        "Catalog management and book circulation workflows",
        "QR-based patron check-in and transaction support",
        "Resource demand forecasting powered by XGBoost",
        "Circulation and usage anomaly detection via Isolation Forest",
      ],
      outcomes: [
        "Presented at the BINHI 2026 Research Conference (June 2026).",
        "Received Capstone Completion & User Acceptability certification from Tagum City CICTMO and Davao del Norte State College (April 2026).",
      ],
    },
  },
  {
    slug: "nligw-carmen",
    name: "NLIGW Carmen",
    subtitle: "Community Web Platform & Headless CMS",
    category: "Web Application & CMS",
    role: "Full-Stack Developer",
    tier: "additional",
    description:
      "Multimedia community web platform featuring sermon archives, ministry directories, event listings, and structured content publishing powered by Sanity CMS.",
    url: "https://newlifecarmen.vercel.app",
    status: "live",
    statusLabel: "Live Website",
    featured: false,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    caseStudy: {
      overview:
        "Public web platform and headless CMS integration built with Next.js, TypeScript, Tailwind CSS, and Sanity CMS for NLIGW Carmen.",
      problem:
        "Administrators needed an approachable way to publish sermons, events, and ministry updates while visitors needed a fast, mobile-friendly site.",
      solution:
        "Built a Next.js App Router frontend connected to Sanity CMS studios for structured content updates without code changes.",
      responsibilities: [
        "Built responsive pages and navigation using Next.js, TypeScript, and Tailwind CSS.",
        "Structured Sanity CMS schemas and content queries for sermons, ministries, and events.",
      ],
      features: [
        "Sermon media archive and filtering",
        "Ministry directories and event schedules",
        "Headless CMS publishing via Sanity",
      ],
      outcomes: ["Deployed and maintained live at newlifecarmen.vercel.app."],
    },
  },
  {
    slug: "selah-app",
    name: "Selah: Bible & Devotional",
    subtitle: "Offline-First Mobile Scripture & Journaling App",
    category: "Mobile Application",
    role: "Mobile Application Developer",
    tier: "additional",
    description:
      "Cross-platform mobile application for scripture reading, devotional journaling, and daily habit tracking with offline local SQLite persistence.",
    url: "https://github.com/bJOE2001/selah-app",
    github: "https://github.com/bJOE2001/selah-app",
    status: "live",
    statusLabel: "Open Source",
    featured: false,
    tags: ["React Native", "Expo", "SQLite", "TypeScript"],
    caseStudy: {
      overview:
        "A distraction-free mobile reading and devotional journaling application built with React Native, Expo, TypeScript, and local SQLite storage.",
      problem:
        "Readers wanted a clean, offline-capable scripture and journaling companion that works reliably without constant network connectivity.",
      solution:
        "Developed an offline-first mobile app using React Native and Expo backed by local SQLite persistence and customizable reading themes.",
      responsibilities: [
        "Developed cross-platform mobile screens and navigation with React Native, Expo, and TypeScript.",
        "Implemented local SQLite storage for offline scripture access, notes, and habit logs.",
      ],
      features: [
        "Offline scripture reading backed by SQLite",
        "Personal devotional notes and journaling",
        "Daily reading habit tracking and dark mode support",
      ],
      outcomes: [
        "Published source repository on GitHub at github.com/bJOE2001/selah-app.",
      ],
    },
  },
];

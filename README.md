# Belly Joe Basadre — Developer Portfolio

Client-focused freelance full-stack developer portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

**Live Website:** [https://bellyjoe.dev/](https://bellyjoe.dev/)

## Architecture & Sections

1. **Hero / Introduction (`components/hero/Hero.tsx`)** — Freelance value proposition, availability indicator, interactive developer portrait, and 4-column specialization strip.
2. **Selected Work & Case Studies (`components/projects/Projects.tsx` & `app/projects/[slug]/page.tsx`)** — Prioritized showcase featuring TCYSDO Youth Information System, Tagum City Leave Management System, New Life School of Leaders Management System, LibraSense, NLIGW Carmen, and Selah, with structured individual case study pages.
3. **Services (`components/Services.tsx`)** — Dedicated 6-card overview of client software engineering services.
4. **Technical Expertise & AI-Assisted Workflow (`components/TechStack.tsx`)** — Core stack specialization, categorized technical capabilities, AI-assisted engineering tools (OpenAI Codex, Claude Code, Google Antigravity, Cursor), and 6-step engineering workflow.
5. **Experience & Recognition (`components/Experience.tsx`)** — Professional software roles, remote CMS experience, education, and verified certificate lightbox viewer.
6. **Contact / Start a Project (`components/contact/ContactCTA.tsx`)** — Direct email inquiry action, optional intro call link, and professional channels.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript + React 18
- **Styling:** Tailwind CSS + CSS Custom Properties (`app/globals.css`)
- **Motion:** Framer Motion (with `prefers-reduced-motion` support)
- **Icons:** Lucide React
- **Theming:** `next-themes` (Light / Dark / System)
- **Portfolio Assistant:** `@google/generative-ai` (`app/api/chat/route.ts`) with deterministic local fallback

## Getting Started

```bash
npm install
npm run dev
```

Optional `.env.local` for live Gemini streaming in the portfolio assistant:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Validation Scripts

- `npm run lint` — ESLint (`next/core-web-vitals`)
- `npx tsc --noEmit` — TypeScript check
- `npm run build` — Production build

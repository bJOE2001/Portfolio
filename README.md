# Portfolio

Personal portfolio web app built with Next.js 14, Tailwind CSS, and a Gemini-powered AI chat assistant.

## Features

- **Single-Story Editorial Architecture**: Replaces cramped sidebars with a fluid, recruiter-friendly single-story narrative
- **Editorial Hero Section**: Bold typography, live project availability status, credential ticker, and integrated personality avatar (day/hover/dark-mode animations)
- **Selected Work Showcase**: Dominant hero case study (**LibraSense**) plus a balanced 2-column secondary project grid (**Leave Management System**, **NLIGW Carmen**, **Selah**, **SOL ChMS**)
- **Experience Timeline**: Asymmetric 2-column career and education milestones with subtle hover physics
- **Capabilities Grid**: Typography-first 4-column domain breakdown (Frontend, Backend, Data/Infra, AI/Tools) avoiding messy badge walls
- **Proof & Credentials**: Recognition list (Capstone CICTMO Acceptance, BINHI Research, CICTMO OJT) with high-resolution certificate lightbox & zoom
- **Activity Stream**: Interactive GitHub commit calendar with year filtering (2026 down to 2023) and hover tooltips
- **Beyond the Code Gallery**: Photographic moment strip with smooth carousel controls and full-screen lightbox modal
- **High-Conversion Contact CTA**: Dedicated closing section featuring direct email and social channels
- **AI Assistant**: Redesigned Gemini-powered assistant (`gemini-3-flash-preview`) with real-time text streaming, suggestion prompts, and slide-over drawer
- **Theme System**: Minimalist Swiss/Vercel styling with seamless dark/light mode toggle via `next-themes` and CSS variables

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript + React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: `next-themes`
- **AI**: `@google/generative-ai` (Gemini API)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run lint checks

## Project Structure

```text
app/
  api/
    chat/route.ts                 # Gemini-backed chatbot API streaming route
    github-contributions/route.ts # GitHub contributions fetcher proxy route
  globals.css                     # Swiss/Vercel design system tokens and styles
  layout.tsx                      # Root layout, SEO metadata, theme provider & global mounts
  page.tsx                        # Main portfolio page with single-story narrative
components/
  Chatbot.tsx                     # Slide-over Gemini AI assistant widget
  Experience.tsx                  # Career & education editorial timeline
  Gallery.tsx                     # Beyond the Code photographic carousel with lightbox
  GithubContributions.tsx         # Interactive GitHub activity graph with year tabs
  Navbar.tsx                      # Sticky top header with scroll blur & theme toggle
  RecentCertifications.tsx        # Proof section with certificate modal viewer & zoom
  TechStack.tsx                   # Typography-first 4-column capabilities grid
  ThemeProvider.tsx               # next-themes provider wrapper
  contact/
    ContactCTA.tsx                # High-conversion closing banner
  hero/
    Hero.tsx                      # Editorial hero with avatar personality & credibility ticker
  layout/
    Footer.tsx                    # Minimalist footer with smooth back-to-top
    ScrollProgress.tsx            # Fixed top 2px scroll progress bar
  profile/
    InteractiveProfileImage.tsx   # "Developer State" interactive avatar with 3D tilt & crossfade
  projects/
    Projects.tsx                  # Dominant featured project + secondary project grid
data/
  types.ts                        # TypeScript interfaces
  profile.ts                      # Identity, bio, credentials, avatars, and contact links
  projects.ts                     # Featured and secondary project definitions
  experience.ts                   # Career history and educational milestones
  capabilities.ts                 # Categorized engineering skills
  certifications.ts               # Credentials and certificate assets
  gallery.ts                      # Moments photos and captions
  portfolio.ts                    # Central re-export hub for backward compatibility
public/                           # Static assets (avatars, certificates, gallery photos)
```

## Customization

All portfolio content is centralized in modular files under `data/`:

- `data/profile.ts` - Bio, availability status, credentials, avatar images, social channels
- `data/projects.ts` - Case studies, tags, external URLs, architectural notes
- `data/experience.ts` - Employment history, internships, and education
- `data/capabilities.ts` - Categorized technologies and developer tools
- `data/certifications.ts` - Awards, presentation honors, and certificate previews
- `data/gallery.ts` - Behind-the-scenes photography and descriptions

## Chatbot Notes

- Frontend chat widget: `components/Chatbot.tsx`
- Backend streaming endpoint: `app/api/chat/route.ts`
- Persona context is fed directly from the modular data layer
- When deploying to production (e.g., Vercel), add `GEMINI_API_KEY` to your hosting environment variables.

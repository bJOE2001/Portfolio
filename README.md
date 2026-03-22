# Portfolio

Personal portfolio web app built with Next.js, Tailwind CSS, and a Gemini-powered chat assistant.

## Features

- Responsive portfolio layout with sidebar and content sections
- Theme switching (light/dark/system) via `next-themes`
- Data-driven profile, projects, experience, and skills
- AI chat widget that answers using your portfolio data
- Streaming chatbot responses from `/api/chat`

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- `@google/generative-ai`
- `lucide-react`

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

Important:
- Keep API keys private.
- Do not commit real keys to Git.

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
  api/chat/route.ts     # Gemini-backed chatbot API route
  layout.tsx            # Root layout, metadata, theme provider, chatbot mount
  page.tsx              # Main portfolio page
components/             # UI sections and shared components
data/portfolio.ts       # Main content source (profile, projects, stack, etc.)
public/                 # Static assets (profile and other images)
```

## Customization

Most content is centralized in `data/portfolio.ts`:
- `profile`
- `techStack`
- `experience`
- `projects`
- `certifications`
- `gallery`
- `whatIBuild`
- `social`

To personalize the site:
- Edit text/data in `data/portfolio.ts`
- Replace images inside `public/`
- Update component styles in `components/` and `app/globals.css`

## Chatbot Notes

- Frontend chat UI: `components/Chatbot.tsx`
- Backend route: `app/api/chat/route.ts`
- If `GEMINI_API_KEY` is missing, chat requests return an error response
- Chatbot context is built from `data/portfolio.ts`

## Production

Build and run locally:

```bash
npm run build
npm run start
```

When deploying (for example to Vercel), set `GEMINI_API_KEY` in the hosting environment variables.

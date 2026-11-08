import { AiToolItem, CapabilityGroup, WorkflowStep } from "./types";

export const coreSpecializations: string[] = [
  "Laravel",
  "PHP",
  "Vue.js",
  "Quasar Framework",
  "React",
  "TypeScript",
  "Next.js",
  "SQL Server",
  "PostgreSQL",
  "REST APIs",
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "Vue.js", primary: true },
      { name: "Quasar Framework", primary: true },
      { name: "React", primary: true },
      { name: "Next.js", primary: true },
      { name: "TypeScript", primary: true },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "React Native" },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Laravel", primary: true },
      { name: "PHP", primary: true },
      { name: "REST APIs", primary: true },
      { name: "Python" },
      { name: "FastAPI" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "Microsoft SQL Server", primary: true },
      { name: "PostgreSQL", primary: true },
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "Supabase" },
    ],
  },
  {
    title: "Tools, CMS & Design",
    skills: [
      { name: "Git & GitHub" },
      { name: "Deployment & Maintenance" },
      { name: "WordPress", note: "Content Management" },
      { name: "Canva & Photoshop" },
      { name: "Graphic Design" },
    ],
  },
];

export const capabilities: Record<string, string[]> = {
  Frontend: capabilityGroups[0].skills.map((s) => s.name),
  "Backend & APIs": capabilityGroups[1].skills.map((s) => s.name),
  Databases: capabilityGroups[2].skills.map((s) => s.name),
  "Tools, CMS & Design": capabilityGroups[3].skills.map((s) =>
    s.note ? `${s.name} (${s.note})` : s.name
  ),
};

export const techStack = capabilities;

export const aiTools: AiToolItem[] = [
  {
    name: "OpenAI Codex",
    description:
      "AI-assisted application development, implementation, and debugging.",
  },
  {
    name: "Claude Code",
    description:
      "Codebase analysis, development assistance, and technical problem-solving.",
  },
  {
    name: "Google Antigravity",
    description:
      "Agent-assisted development, implementation, and workflow experimentation.",
  },
  {
    name: "Cursor",
    description:
      "AI-powered code editing and project development.",
  },
];

export const developmentWorkflow: WorkflowStep[] = [
  { step: "01", title: "Understand Requirements" },
  { step: "02", title: "Plan Architecture" },
  { step: "03", title: "Develop with AI Assistance" },
  { step: "04", title: "Review and Refine" },
  { step: "05", title: "Test and Validate" },
  { step: "06", title: "Deploy and Maintain" },
];

import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  profile,
  services,
  coreSpecializations,
  techStack,
  aiTools,
  developmentWorkflow,
  experience,
  projects,
  certifications,
} from "@/data/portfolio";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemInstruction = `
You are ${profile.name}, a Full-Stack Developer based in the Philippines (${profile.location}).
Always speak in the first person ("I", "me", "my") in a concise, helpful, and straightforward engineering tone.
Your primary goal is to help prospective freelance clients and remote collaborators understand what you build, your technical capabilities, your verified project work, and how to start a project with you.

Verified Information:
Name: ${profile.name}
Headline: ${profile.headline}
Availability: ${profile.availability.label} (Flexible / part-time remote freelance projects and long-term collaborations)
Contact Email: ${profile.email}
Calendly Intro Call: ${profile.callLink || "Available on request"}
GitHub: https://github.com/${profile.githubUsername}
LinkedIn: https://www.linkedin.com/in/bellyjoedev

Services Offered:
${services.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

Core Specialization:
${coreSpecializations.join(", ")}

Grouped Technical Skills:
${Object.entries(techStack)
  .map(([cat, skills]) => `- ${cat}: ${skills.join(", ")}`)
  .join("\n")}

AI-Assisted Engineering Workflow:
- Approach: AI-Assisted Development, Engineer-Driven Solutions. I use AI coding agents to accelerate implementation and debugging while remaining responsible for architecture, code review, technical decisions, and validation.
- Tools: ${aiTools.map((t) => `${t.name} (${t.description})`).join("; ")}
- Process: ${developmentWorkflow.map((w) => `${w.step} ${w.title}`).join(" -> ")}

Selected Projects (represent my role accurately):
${projects
  .map(
    (p) =>
      `- ${p.name} [${p.category}] | Role: ${p.role} | Stack: ${p.tags.join(", ")}${
        p.url ? ` | Link: ${p.url}` : ""
      } | Summary: ${p.description}`
  )
  .join("\n")}

Experience & Education:
${experience
  .map(
    (e) =>
      `- ${e.title} at ${e.company} (${e.period || e.year}): ${e.description || ""}`
  )
  .join("\n")}

Certificates & Recognition:
${certifications.map((c) => `- ${c.name} (${c.issuer}, ${c.date})`).join("\n")}

Strict Guardrails:
1. Answer ONLY using the verified information above. Do NOT invent clients, testimonials, metrics, hourly rates, schedules, or unverified experience.
2. Represent project roles accurately: I independently built the TCYSDO Youth Information System and New Life School of Leaders Management System (React + Vite + Supabase, NOT Next.js) end-to-end; I contributed as part of the team on the Tagum City Leave Management System; LibraSense is an academic capstone and research system presented at BINHI 2026 (do not claim full municipal production deployment).
3. If asked about WordPress, state accurately that my prior WordPress work was content writing and CMS content management, not advanced custom theme or plugin development.
4. Do not share hourly rates or internal government data. For project quotes or timelines, invite the visitor to email ${profile.email}.
5. Keep replies concise (2-5 short sentences or brief bullet points) without heavy markdown.
`;

function buildFallbackReply(rawQuery: string): string {
  const q = rawQuery.toLowerCase();

  if (q.includes("tcysdo") || q.includes("youth")) {
    const p = projects[0];
    return `I independently designed and developed the ${p.name} end-to-end using Laravel, Quasar Framework, and SQL Server (with OpenAI Codex for AI-assisted implementation). It centralizes youth records, organizational data collection, and administrative workflows. You can view the live system at ${p.url}.`;
  }

  if (q.includes("leave") || q.includes("lms")) {
    const p = projects.find((item) => item.slug === "leave-management-system");
    return `I contributed to the ${p?.name} using Laravel, Vue.js, and Quasar Framework. My work supported automated leave approval workflows, tardiness calculations, compensatory overtime credits, and SMS notifications (${p?.url}).`;
  }

  if (q.includes("school of leaders") || q.includes("sol") || q.includes("cohort")) {
    const p = projects.find((item) => item.slug === "sol-management-system");
    return `I built the ${p?.name} end-to-end using React, TypeScript, Vite, Supabase, and PostgreSQL. It handles student attendance, lesson progression, cohort management, role-based access control, and audit trails (${p?.url}).`;
  }

  if (q.includes("librasense") || q.includes("binhi") || q.includes("library") || q.includes("ml")) {
    const p = projects.find((item) => item.slug === "librasense");
    return `LibraSense is a smart library management system I developed with Laravel, PostgreSQL, Python, FastAPI, XGBoost, and Isolation Forest. It integrates circulation workflows, QR features, demand forecasting, and anomaly detection, and was presented at BINHI 2026.`;
  }

  if (q.includes("wordpress")) {
    return `My previous WordPress experience focused on remote content writing, publishing, and CMS content organization rather than custom PHP theme or plugin development. For custom web applications, I specialize in Laravel, Vue.js, Quasar, and React.`;
  }

  if (q.includes("service") || q.includes("build") || q.includes("offer") || q.includes("help")) {
    return `I build custom web applications, business management systems, REST APIs and integrations, workflow automation tools, responsive React/Vue frontends, and improvements to existing applications. Feel free to email me at ${profile.email} to discuss your requirements.`;
  }

  if (q.includes("ai") || q.includes("codex") || q.includes("claude") || q.includes("cursor") || q.includes("antigravity") || q.includes("workflow")) {
    return `I use OpenAI Codex, Claude Code, Google Antigravity, and Cursor within an engineer-driven workflow: understanding requirements, planning architecture, developing with AI assistance, reviewing and refining changes, testing, and deploying maintainable code.`;
  }

  if (q.includes("stack") || q.includes("skill") || q.includes("tech") || q.includes("laravel") || q.includes("react") || q.includes("vue")) {
    return `My core stack centers on ${coreSpecializations.join(", ")}. I also work with Python, FastAPI, Supabase, MySQL, SQLite, and Tailwind CSS.`;
  }

  if (q.includes("available") || q.includes("hire") || q.includes("freelance") || q.includes("contact") || q.includes("email") || q.includes("rate") || q.includes("price")) {
    return `I am available for select freelance projects and flexible remote collaborations. To discuss your project scope and timeline, reach out directly at ${profile.email}.`;
  }

  return `I'm ${profile.name}, a Full-Stack Developer specializing in Laravel, Vue.js, Quasar, React, SQL Server, and PostgreSQL. I build custom web applications, management systems, and workflow automation for organizations. Ask me about my projects (such as TCYSDO, Leave Management, New Life SOL, or LibraSense), services, or email me at ${profile.email} to start a project.`;
}

export async function POST(req: Request) {
  let latestMessage = "";
  try {
    const { messages } = await req.json();

    let validMessages = Array.isArray(messages) ? messages : [];
    if (validMessages.length > 0 && validMessages[0].role === "model") {
      validMessages = validMessages.slice(1);
    }

    if (validMessages.length === 0) {
      return new Response(buildFallbackReply(""), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    latestMessage = String(validMessages[validMessages.length - 1]?.content || "");

    if (!process.env.GEMINI_API_KEY) {
      return new Response(buildFallbackReply(latestMessage), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }],
      },
    });

    const formatMessage = (msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: String(msg.content || "") }],
    });

    const history = validMessages.slice(0, -1).map(formatMessage);
    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(latestMessage);

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        let emittedAny = false;
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              emittedAny = true;
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          if (!emittedAny) {
            controller.enqueue(encoder.encode(buildFallbackReply(latestMessage)));
          }
          controller.close();
        } catch {
          if (!emittedAny) {
            controller.enqueue(encoder.encode(buildFallbackReply(latestMessage)));
          }
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return new Response(buildFallbackReply(latestMessage), {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  }
}

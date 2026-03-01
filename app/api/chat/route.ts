import { GoogleGenerativeAI } from "@google/generative-ai";
import { profile, techStack, experience, projects, whatIBuild } from "@/data/portfolio";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemInstruction = `
You are ${profile.name}, a passionate web developer. 
Your goal is to answer questions about your skills, experience, and projects in a friendly, professional, and relatively concise tone. 
Always speak in the first person ("I", "me", "my") as if you are actually Belly Joe chatting directly with the visitor. Be helpful and conversational.

Here is Belly Joe's information:
Name: ${profile.name}
Role: ${profile.roles.join(", ")}
Bio: ${profile.bio.join(" ")}
Location: ${profile.location}
Email: ${profile.email}

Tech Stack:
- Frontend: ${techStack.Frontend.join(", ")}
- Backend: ${techStack.Backend.join(", ")}
- Tools: ${techStack.Tools.join(", ")}

Experience:
${experience.map(e => `- ${e.title} at ${e.company} (${e.year})`).join("\n")}

Projects (summarized):
${projects.map(p => `- ${p.name}: ${p.description}`).join("\n")}

What Belly Joe builds:
${whatIBuild.map(w => `- ${w.title}: ${w.desc}`).join("\n")}

Guidelines:
1. Don't use heavy markdown unless necessary (e.g., bullet points are okay).
2. Answer based ONLY on the provided information. If asked about something not here, politely decline.
3. Keep responses conversational, concise, and professional.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing Gemini API Key in environment." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }],
      },
    });

    // Gemini API requires the history to start with a 'user' message.
    // If the frontend sent our initial hardcoded 'model' greeting, we strip it out here.
    let validMessages = messages;
    if (validMessages.length > 0 && validMessages[0].role === "model") {
      validMessages = validMessages.slice(1);
    }

    const formatMessage = (msg: {role: string, content: string}) => {
       return {
         role: msg.role === "user" ? "user" : "model",
         parts: [{ text: msg.content }]
       }
    };
    
    const history = validMessages.slice(0, -1).map(formatMessage);
    const latestMessage = validMessages[validMessages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessageStream(latestMessage);

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      }
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to process chat request.",
      details: error?.message || String(error)
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

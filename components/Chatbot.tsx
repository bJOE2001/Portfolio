"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, User, RotateCcw, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";

type Message = {
  role: "user" | "model";
  content: string;
};

const SUGGESTIONS = [
  "Tell me about LibraSense & BINHI 2026",
  "What do you do at City Government of Tagum?",
  "What is your primary tech stack?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hello! I'm Belly Joe's AI assistant. Ask me anything about his engineering experience, full-stack projects, research presentations, or technical capabilities.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on open & Escape listener
  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage = queryText.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.details || errorData?.error || "Failed to fetch response");
      }

      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        if (!reader) break;
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = { ...newMessages[newMessages.length - 1] };
            lastMessage.content += chunk;
            newMessages[newMessages.length - 1] = lastMessage;
            return newMessages;
          });
        }
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      let errorMessage = error?.message || "Oops! Something went wrong.";

      if (
        errorMessage.includes("429") ||
        errorMessage.toLowerCase().includes("quota") ||
        errorMessage.includes("Too Many Requests")
      ) {
        errorMessage =
          "I'm receiving a high volume of inquiries right now. Please wait a brief moment and try again.";
      } else {
        errorMessage =
          "I encountered an issue processing your question. Please try asking again shortly.";
      }

      setMessages((prev) => [...prev, { role: "model", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  const handleClear = () => {
    setMessages([
      {
        role: "model",
        content:
          "Chat reset. Feel free to ask about my software projects, government work, or skills.",
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-surface text-foreground shadow-lg hover:border-foreground/30 transition-all focus-visible:outline-none"
          aria-label="Open AI Assistant"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-medium">Ask AI Assistant</span>
          <Sparkles size={13} className="text-muted group-hover:text-foreground transition-colors" />
        </motion.button>
      </div>

      {/* Slide-over / Modal Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface-hover/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-surface shrink-0">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover dark:hidden"
                    />
                    <img
                      src={profile.darkAvatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover hidden dark:block"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <span>{profile.name}</span>
                      <span className="text-[10px] font-mono font-normal text-muted">AI</span>
                    </h3>
                    <p className="text-[10px] font-mono text-subtle">
                      Powered by Gemini · Streaming
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClear}
                    title="Reset chat"
                    className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                    className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Messages Flow */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-sans">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2.5 ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role === "model" && (
                      <div className="w-6 h-6 rounded-full border border-border bg-surface-hover flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles size={11} className="text-muted" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-xl leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-foreground text-background font-medium rounded-br-xs"
                          : "bg-surface-hover text-foreground border border-border-subtle rounded-bl-xs"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-full border border-border bg-surface-hover flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={11} className="text-muted" />
                    </div>
                    <div className="px-3.5 py-2.5 rounded-xl bg-surface-hover border border-border-subtle text-muted flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse delay-200" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length <= 2 && !isLoading && (
                <div className="px-4 py-2 bg-surface-hover/30 border-t border-border-subtle flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-subtle uppercase">
                    Suggested Questions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendQuery(s)}
                        className="text-left text-[11px] px-2.5 py-1 rounded-md border border-border bg-surface hover:bg-surface-hover text-muted hover:text-foreground transition-colors truncate max-w-full"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form
                onSubmit={handleSubmit}
                className="p-3 border-t border-border bg-surface flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-border bg-surface-hover text-foreground placeholder:text-subtle focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-lg bg-foreground text-background disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity focus-visible:outline-none"
                  aria-label="Send query"
                >
                  <Send size={13} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

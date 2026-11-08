"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, Send, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";

type Message = {
  role: "user" | "model";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "model",
  content:
    "Hi! I'm Belly Joe's portfolio assistant. Ask about his freelance development services, delivered systems, core stack, or availability.",
};

const SUGGESTIONS = [
  "What systems can you build for clients?",
  "Tell me about the TCYSDO project",
  "What is your core stack & AI workflow?",
  "How can we start a project?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading, isOpen]);

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
    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setInput("");
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done && reader) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) => {
            const updated = [...prev];
            const last = { ...updated[updated.length - 1] };
            last.content += chunk;
            updated[updated.length - 1] = last;
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: `I couldn't process that right now. You can reach me directly at ${profile.email} to discuss your project.`,
        },
      ]);
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
          "Conversation cleared. Ask about my services, case studies, technical stack, or freelance availability.",
      },
    ]);
  };

  return (
    <>
      {/* Unobtrusive Floating Trigger */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-border bg-surface/95 backdrop-blur-sm text-muted hover:text-foreground hover:border-foreground/35 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Open portfolio assistant"
          >
            <MessageSquare size={14} aria-hidden="true" />
            <span className="hidden sm:inline text-xs font-mono">
              Ask Assistant
            </span>
          </button>
        </div>
      )}

      {/* Assistant Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px]"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="chatbot-title"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[82vh] flex flex-col rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-surface-hover/50">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border bg-surface shrink-0">
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name}
                      fill
                      sizes="28px"
                      className="object-cover dark:hidden"
                    />
                    <Image
                      src={profile.darkAvatarUrl}
                      alt={profile.name}
                      fill
                      sizes="28px"
                      className="object-cover hidden dark:block"
                    />
                  </div>
                  <div>
                    <h2
                      id="chatbot-title"
                      className="text-xs font-bold text-foreground flex items-center gap-1.5"
                    >
                      <span>{profile.name}</span>
                      <span className="text-[10px] font-mono font-normal text-muted">
                        · Assistant
                      </span>
                    </h2>
                    <p className="text-[10px] font-mono text-subtle">
                      Projects, services &amp; availability
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Reset conversation"
                    title="Reset conversation"
                    className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close assistant"
                    className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-xl leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-foreground text-background font-medium rounded-br-sm"
                          : "bg-surface-hover text-foreground border border-border-subtle rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div
                      aria-label="Assistant is typing"
                      className="px-3.5 py-2.5 rounded-xl bg-surface-hover border border-border-subtle text-muted flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse delay-200" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length <= 2 && !isLoading && (
                <div className="px-4 py-2.5 bg-surface-hover/30 border-t border-border-subtle flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-subtle uppercase tracking-wider">
                    Quick Questions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendQuery(s)}
                        className="text-left text-[11px] px-2.5 py-1 rounded-md border border-border bg-surface hover:bg-surface-hover text-muted hover:text-foreground transition-colors truncate max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
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
                <label htmlFor="chatbot-input" className="sr-only">
                  Ask a question about Belly Joe&apos;s work or services
                </label>
                <input
                  id="chatbot-input"
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects or services..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-border bg-surface-hover text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-lg bg-foreground text-background disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  aria-label="Send message"
                >
                  <Send size={13} aria-hidden="true" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

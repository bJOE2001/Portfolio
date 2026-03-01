"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hi! I'm Belly Joe. Ask me anything about my skills, experience, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
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
      
      // Customize error messages so visitors don't see technical API jargon
      if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota") || errorMessage.includes("Too Many Requests")) {
        errorMessage = "Whoa, I'm getting a lot of messages right now! Give me a minute to catch my breath and please try again.";
      } else {
        errorMessage = "Hmm, I seem to be having a little trouble thinking of a response right now. Could you ask me again in a moment?";
      }

      setMessages((prev) => [
        ...prev,
        { role: "model", content: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-6 w-[350px] sm:w-[400px] max-h-[600px] flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 ring-1 ring-black/5 dark:ring-white/10"
          >
            {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                    <>
                      <img 
                        src="/profile.jpg" 
                        alt="Belly Joe" 
                        className="w-full h-full object-cover dark:hidden"
                      />
                      <img 
                        src="/sleeping.png" 
                        alt="Belly Joe" 
                        className="w-full h-full object-cover hidden dark:block"
                      />
                    </>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-none mb-1">Belly Joe</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Online</span>
                    </div>
                  </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px] bg-zinc-50 dark:bg-zinc-900/50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ${
                      message.role === "user"
                        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        : "border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User size={16} />
                    ) : (
                      <>
                        <img src="/profile.jpg" alt="Belly Joe" className="w-full h-full object-cover dark:hidden" />
                        <img src="/sleeping.png" alt="Belly Joe" className="w-full h-full object-cover hidden dark:block" />
                      </>
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed overflow-hidden break-words ${
                      message.role === "user"
                        ? "bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-tr-sm"
                        : "bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-tl-sm"
                    }`}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <img src="/profile.jpg" alt="Belly Joe" className="w-full h-full object-cover dark:hidden" />
                    <img src="/sleeping.png" alt="Belly Joe" className="w-full h-full object-cover hidden dark:block" />
                  </div>
                  <div className="px-3 py-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-tl-sm flex items-center gap-1.5">
                    <Loader2 size={16} className="animate-spin text-zinc-400" />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center w-full"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my skills, projects, or experience..."
                  className="w-full pl-4 pr-12 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-800/50 border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 rounded-full outline-none text-zinc-900 dark:text-zinc-100 transition-all placeholder:text-zinc-500 focus:bg-white dark:focus:bg-zinc-800 ring-4 ring-transparent focus:ring-emerald-500/10"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 rounded-full bg-emerald-500 text-white disabled:opacity-50 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 hover:bg-emerald-600 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={16} className="ml-[1px] mb-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={isOpen ? {} : { y: [0, -8, 0] }}
        transition={isOpen ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full shadow-2xl flex items-center justify-center z-50 border border-transparent hover:border-zinc-700 dark:hover:border-zinc-300 transition-colors"
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </>
  );
}

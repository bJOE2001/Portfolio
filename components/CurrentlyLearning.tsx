"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

const learning = [
  { topic: "Machine Learning with Python", detail: "Scikit-learn, data preprocessing & model evaluation", color: "bg-amber-50 border-amber-100 text-amber-700" },
  { topic: "Advanced Laravel Patterns", detail: "Repository pattern, service layers & API optimization", color: "bg-sky-50 border-sky-100 text-sky-700" },
  { topic: "Docker & Containerization", detail: "Deploying apps with Docker Compose & container networking", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
];

export default function CurrentlyLearning() {
  return (
    <section className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <p className="section-label mb-0">Currently Learning</p>
        <span className="flex h-2 w-2 relative ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
        </span>
      </div>

      <div className="space-y-2.5">
        {learning.map((item, i) => (
          <motion.div
            key={item.topic}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: i * 0.07 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-[var(--border)] hover:border-gray-300 transition-colors"
          >
            <BookOpen size={14} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[var(--text)] leading-tight">{item.topic}</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">{item.detail}</p>
            </div>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ml-auto mt-0.5 ${item.color}`}>
              Active
            </span>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-[var(--text-light)] mt-3 flex items-center gap-1">
        <Sparkles size={10} /> Always growing, always building.
      </p>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import { currentlyLearning } from "@/data/portfolio";

export default function CurrentlyLearning() {
  return (
    <motion.section 
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <p className="section-label mb-0 leading-none">Currently Learning</p>
      </div>

      <div className="space-y-2.5">
        {currentlyLearning.map((item, i) => (
          <motion.div
            key={item.topic}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: i * 0.07 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-[var(--accent-light)] border border-[var(--border)] hover:border-[var(--text-light)] transition-colors"
          >
            <Brain size={14} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[var(--text)] leading-tight">{item.topic}</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-[var(--text-light)] mt-3 flex items-center gap-1">
        <Sparkles size={10} /> Always growing, always building.
      </p>
    </motion.section>
  );
}

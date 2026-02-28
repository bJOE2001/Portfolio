"use client";

import { motion } from "framer-motion";
import { Globe, Database, Puzzle, Cpu } from "lucide-react";

import { whatIBuild } from "@/data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe size={18} className="text-[var(--text)]" />,
  database: <Database size={18} className="text-[var(--text)]" />,
  puzzle: <Puzzle size={18} className="text-[var(--text)]" />,
  cpu: <Cpu size={18} className="text-[var(--text)]" />,
};

export default function WhatIBuild() {
  return (
    <motion.section 
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="section-label">What I Build</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {whatIBuild.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: i * 0.06 }}
            className={`flex items-start gap-3 p-3 rounded-xl border bg-[var(--accent-light)] border-[var(--border)]`}
          >
            <div className={`w-8 h-8 rounded-lg border bg-[var(--card)] border-[var(--border)] flex items-center justify-center shrink-0`}>
              {iconMap[s.iconName] || <Globe size={18} className="text-black" />}
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text)] mb-0.5">{s.title}</p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { techStack } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
  Frontend: "from-violet-500/20 to-purple-500/10 border-violet-500/20",
  Backend: "from-cyan-500/20 to-teal-500/10 border-cyan-500/20",
  "DevOps & Cloud": "from-pink-500/20 to-rose-500/10 border-pink-500/20",
};

const chipColors: Record<string, string> = {
  Frontend: "bg-violet-500/10 border-violet-500/25 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400",
  Backend: "bg-cyan-500/10 border-cyan-500/25 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400",
  "DevOps & Cloud": "bg-pink-500/10 border-pink-500/25 text-pink-300 hover:bg-pink-500/20 hover:border-pink-400",
};

export default function TechStack() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="section-label">02 — Skills</p>
          <h2 className="text-2xl font-bold text-[var(--text)]">Tech Stack</h2>
        </div>
        <a href="#" className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
          View All <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="space-y-4">
        {Object.entries(techStack).map(([category, skills], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className={`glass rounded-2xl p-5 border bg-gradient-to-r ${categoryColors[category] ?? "border-[var(--border)]"}`}
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)] mb-3">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all duration-200 cursor-default ${chipColors[category] ?? "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]"}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

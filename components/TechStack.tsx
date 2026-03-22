"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/portfolio";

export default function TechStack() {
  return (
    <motion.section
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="section-label mb-4">Tech Stack</p>

      <div className="space-y-4">
        {Object.entries(techStack).map(([category, skills], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: i * 0.05 }}
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-light)]">
              {category}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

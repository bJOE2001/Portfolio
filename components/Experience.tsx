"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <motion.section 
      id="experience" 
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="section-label">Experience</p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-gray-200" />

        <div className="space-y-4 pl-6">
          {experience.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: i * 0.05 }}
              className="relative group"
            >
              {/* Dot */}
              <span className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-300 group-hover:border-black transition-colors" />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--text)] leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.company}</p>
                </div>
                <span className="text-[11px] font-semibold text-[var(--text-light)] shrink-0 mt-0.5">
                  {item.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

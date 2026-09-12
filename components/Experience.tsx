"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="space-y-3 mb-12 sm:mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
          02 / EXPERIENCE
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Where I&apos;ve worked.
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Professional engineering roles, municipal government software experience, and formal education.
        </p>
      </div>

      {/* Editorial Timeline Rows */}
      <div className="divide-y divide-border">
        {experience.map((item, i) => (
          <motion.div
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            className="py-6 sm:py-8 grid sm:grid-cols-[140px_1fr] gap-4 sm:gap-8 items-start group transition-transform"
          >
            {/* Year / Period Column */}
            <div className="font-mono text-xs text-muted flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2">
              <span className="font-semibold text-foreground">{item.year}</span>
              <span className="text-[11px] text-subtle">{item.period || item.year}</span>
            </div>

            {/* Role & Company Column */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                {item.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Present
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-medium text-muted font-mono">
                {item.company} {item.location && `· ${item.location}`}
              </p>

              {item.description && (
                <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

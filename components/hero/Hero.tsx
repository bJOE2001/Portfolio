"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import InteractiveProfileImage from "@/components/profile/InteractiveProfileImage";

export default function Hero() {
  return (
    <section aria-label="Introduction" className="pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-border">
      {/* Top Availability Pill */}
      {profile.availability.status && (
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-foreground font-mono leading-snug">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{profile.availability.label}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Editorial Typography + Portrait */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-start">
        {/* Left: Headline, Value Proposition & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-6 max-w-2xl"
        >
          <div>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-muted mb-3">
              {profile.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-[-0.035em] text-foreground leading-[1.04]">
              {profile.name}
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed">
            {profile.headline}
          </p>

          <div className="space-y-3 text-sm sm:text-base text-muted leading-relaxed">
            {profile.heroDescriptions.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>Start a Project</span>
              <ArrowRight size={13} aria-hidden="true" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-surface text-foreground text-xs font-mono uppercase tracking-wider hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>Explore My Work</span>
              <ArrowDown size={13} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Right: Interactive Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:w-64 xl:w-72"
        >
          <InteractiveProfileImage />
        </motion.div>
      </div>

      {/* Four-Column Freelance Capabilities Strip */}
      <div className="mt-12 sm:mt-16 pt-6 border-t border-border-subtle grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-xs font-mono">
        {profile.heroStats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <span className="text-subtle block uppercase tracking-wider text-[10px]">
              {stat.label}
            </span>
            <span className="text-foreground font-medium flex items-center gap-2">
              {stat.highlightDot && (
                <span
                  className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shrink-0"
                  aria-hidden="true"
                />
              )}
              <span>{stat.value}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

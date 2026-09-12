"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";

import InteractiveProfileImage from "@/components/profile/InteractiveProfileImage";

export default function Hero() {
  return (
    <section className="pt-8 sm:pt-16 pb-12 sm:pb-20 border-b border-border">
      {/* Top Meta & Availability */}
      <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-2">
          {profile.availability.status && (
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border bg-surface text-xs text-foreground font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{profile.availability.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Editorial Typography + Avatar Personality */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-start">
        {/* Left: Headline & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-2xl"
        >
          <div>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-muted mb-3">
              {profile.roles.join(" · ")}
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] text-foreground leading-[1.04]">
              {profile.name}
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed">
            I design and build digital products that solve real-world problems.
          </p>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {profile.bio[0]}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none"
            >
              <Mail size={13} />
              <span>Get in Touch</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-surface text-foreground text-xs font-mono uppercase tracking-wider hover:bg-surface-hover transition-colors focus-visible:outline-none"
            >
              <span>Selected Work</span>
              <ArrowDown size={13} />
            </a>
          </div>
        </motion.div>

        {/* Right: Integrated Developer State Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:w-64 xl:w-72"
        >
          <InteractiveProfileImage />
        </motion.div>
      </div>

      {/* Credibility Ticker / Editorial Strip */}
      <div className="mt-12 sm:mt-16 pt-6 border-t border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-subtle block uppercase tracking-wider text-[10px]">Current Role</span>
          <span className="text-foreground font-medium mt-0.5 block">Web Developer, Tagum City</span>
        </div>
        <div>
          <span className="text-subtle block uppercase tracking-wider text-[10px]">Education</span>
          <span className="text-foreground font-medium mt-0.5 block">BSIT — DNSC</span>
        </div>
        <div>
          <span className="text-subtle block uppercase tracking-wider text-[10px]">Capstone</span>
          <span className="text-foreground font-medium mt-0.5 block">CICTMO Accepted</span>
        </div>
        <div>
          <span className="text-subtle block uppercase tracking-wider text-[10px]">Research</span>
          <span className="text-foreground font-medium mt-0.5 block">BINHI 2026 Presenter</span>
        </div>
      </div>
    </section>
  );
}

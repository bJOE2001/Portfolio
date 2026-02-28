"use client";

import { motion } from "framer-motion";
import { Mail, Phone, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-6">
      {/* Animated gradient orbs */}
      <div className="orb w-[500px] h-[500px] bg-violet-600/20 -top-20 -left-32" style={{ animationDuration: "14s" }} />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/15 top-40 right-0" style={{ animationDuration: "18s", animationDelay: "-6s" }} />
      <div className="orb w-[300px] h-[300px] bg-pink-500/10 bottom-0 left-1/2" style={{ animationDuration: "22s", animationDelay: "-10s" }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-[var(--border)] mb-8"
            >
              <span className="pulse-dot" />
              <span className="text-xs font-medium text-[var(--text-muted)]">
                Available for new opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[var(--text)] mb-2">
                {profile.name.split(" ")[0]}{" "}
                <span className="shimmer">{profile.name.split(" ").slice(1).join(" ")}</span>
              </h1>
            </motion.div>

            {/* Roles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 mb-6"
            >
              {profile.roles.map((role, i) => (
                <span key={role} className="flex items-center gap-3">
                  <span className="text-base sm:text-lg font-medium text-[var(--text-muted)]">
                    {role}
                  </span>
                  {i < profile.roles.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-[var(--text-dim)]" />
                  )}
                </span>
              ))}
            </motion.div>

            {/* Bio preview */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[var(--text-muted)] text-base leading-relaxed max-w-lg mb-8"
            >
              {profile.bio[0].slice(0, 140)}…
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <a href={profile.callLink} target="_blank" rel="noreferrer" className="btn-primary">
                <Phone size={15} />
                Schedule a Call
              </a>
              <a href={`mailto:${profile.email}`} className="btn-ghost">
                <Mail size={15} />
                Send Email
              </a>
              {/* <a href={profile.blogLink} target="_blank" rel="noreferrer" className="btn-ghost">
                <BookOpen size={15} />
                Blog
                <ArrowRight size={13} />
              </a> */}
            </motion.div>
          </div>

          {/* Right — Avatar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, type: "spring", stiffness: 120 }}
            className="hidden lg:flex flex-col items-center gap-4"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-48 h-48 rounded-3xl glass gradient-border overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/10" />
                <span className="text-7xl font-black gradient-text z-10">
                  {profile.name.charAt(0)}
                </span>
              </div>
              {/* Award badge */}
              {/* <div className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-xl glass border border-[var(--border)] flex items-center gap-2 shadow-xl">
                <Sparkles size={13} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-300 whitespace-nowrap">
                  {profile.award}
                </span>
              </div> */}
            </div>

            {/* Location */}
            <div className="text-center mt-5">
              <p className="text-xs text-[var(--text-muted)] font-medium">📍 {profile.location}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 w-52">
              {[
                { value: "200K+", label: "Community" },
                { value: "50+", label: "Projects" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-3 text-center border border-[var(--border)]">
                  <p className="text-xl font-bold gradient-text">{s.value}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] font-semibold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-violet-500/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

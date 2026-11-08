"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Calendar } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-border bg-surface p-7 sm:p-12 lg:p-14 space-y-8 relative overflow-hidden"
      >
        <div className="space-y-4 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
            05 / CONTACT
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.08]">
            Let&apos;s Build Something Useful.
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted leading-relaxed pt-1">
            <p className="text-foreground font-medium text-base sm:text-lg">
              Have a project in mind or an existing application that needs improvement?
            </p>
            <p>
              I help businesses and organizations turn requirements into reliable digital solutions. Let&apos;s discuss your project, technical needs, and how I can help.
            </p>
          </div>
        </div>

        {/* Availability Note */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-surface-hover/60 text-xs font-mono text-foreground">
          <span
            className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shrink-0"
            aria-hidden="true"
          />
          <span>{profile.availability.contactNote}</span>
        </div>

        {/* Primary & Optional Call Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(
              "Freelance Project Inquiry"
            )}`}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Mail size={14} aria-hidden="true" />
            <span>Start a Project</span>
          </a>

          {profile.callLink && (
            <a
              href={profile.callLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface text-foreground text-xs font-mono uppercase tracking-wider hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Calendar size={13} aria-hidden="true" />
              <span>Book an Intro Call</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Professional Contact Channels */}
        <div className="pt-7 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-foreground transition-colors w-fit rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            {profile.email}
          </a>

          <div className="flex flex-wrap items-center gap-6">
            {profile.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                <span>{s.label}</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

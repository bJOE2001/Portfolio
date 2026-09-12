"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-surface p-8 sm:p-14 space-y-8 text-center sm:text-left relative overflow-hidden"
      >
        <div className="space-y-4 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
            07 / CONTACT
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.08]">
            Let&apos;s build something useful.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Have an operational challenge, a new venture, or an engineering role you want to discuss? Send me an email and let&apos;s talk through the architecture and execute.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none shadow-sm"
          >
            <Mail size={14} />
            <span>Send an Email</span>
          </a>
        </div>

        {/* Social Connection Channels */}
        <div className="pt-8 border-t border-border-subtle flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs font-mono text-muted">
          <span>Direct: {profile.email}</span>

          <div className="flex items-center gap-5">
            {profile.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                <span>{s.label}</span>
                <ArrowUpRight size={11} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

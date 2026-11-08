"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import {
  capabilityGroups,
  coreSpecializations,
  aiTools,
  developmentWorkflow,
  profile,
} from "@/data/portfolio";

export default function TechStack() {
  return (
    <section id="expertise" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
            03 / TECHNICAL EXPERTISE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Core Stack &amp; Capabilities.
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            Centered on full-stack web applications, relational database architecture, and maintainable APIs.
          </p>
        </div>

        <a
          href={`https://github.com/${profile.githubUsername}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-colors group shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Github size={14} aria-hidden="true" />
          <span>github.com/{profile.githubUsername}</span>
          <ArrowUpRight
            size={13}
            aria-hidden="true"
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>
      </div>

      {/* Core Specialization Callout */}
      <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted">
            Primary Specialization
          </span>
          <span className="text-[11px] font-mono text-subtle">
            Production Web Systems &amp; Relational Databases
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {coreSpecializations.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-foreground text-background"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Grouped Technical Capabilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-14 sm:pb-16 border-b border-border-subtle">
        {capabilityGroups.map((group, colIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: colIndex * 0.06 }}
            className="space-y-4"
          >
            <div className="border-b border-border pb-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                {group.title}
              </h3>
            </div>

            <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-baseline justify-between gap-2"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        skill.primary ? "bg-foreground" : "bg-border"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={
                        skill.primary
                          ? "text-foreground font-medium"
                          : "text-muted"
                      }
                    >
                      {skill.name}
                    </span>
                  </span>
                  {skill.note && (
                    <span className="text-[10px] text-subtle text-right">
                      {skill.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Dedicated AI-Assisted Development Subsection */}
      <div className="pt-14 sm:pt-16 space-y-10">
        <div className="space-y-3 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
            ENGINEERING WORKFLOW
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            AI-Assisted Development. Engineer-Driven Solutions.
          </h3>
          <div className="space-y-3 text-sm sm:text-base text-muted leading-relaxed">
            <p>
              I integrate AI coding agents into my development workflow to accelerate implementation, support debugging, explore technical solutions, and improve development efficiency.
            </p>
            <p>
              I use AI as part of my development process while remaining responsible for understanding requirements, reviewing changes, making technical decisions, and validating application functionality.
            </p>
          </div>
        </div>

        {/* Four Featured AI Tools */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-xl border border-border bg-surface p-5 space-y-2 hover:border-foreground/35 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-foreground font-mono">
                  {tool.name}
                </h4>
                <span className="text-[10px] font-mono text-subtle">
                  0{index + 1}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Six-Step Development Workflow */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
            Development Process
          </h4>
          <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {developmentWorkflow.map((item) => (
              <li
                key={item.step}
                className="rounded-lg border border-border bg-surface p-3.5 flex flex-col justify-between gap-2"
              >
                <span className="text-[11px] font-mono font-semibold text-subtle">
                  {item.step}
                </span>
                <span className="text-xs font-medium text-foreground leading-snug">
                  {item.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

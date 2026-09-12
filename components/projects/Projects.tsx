"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Sparkles, Database, Cpu, Layers } from "lucide-react";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const secondaryProjects = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="space-y-3 mb-12 sm:mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
          01 / SELECTED WORK
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Things I&apos;ve built.
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          A selection of production systems, enterprise platforms, and digital products engineered to solve operational and organizational problems.
        </p>
      </div>

      {/* Dominant Featured Project (Hero Showcase) */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="group relative rounded-2xl border border-border bg-surface p-6 sm:p-10 hover:border-foreground/40 transition-all duration-300 mb-8"
      >
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-12 items-center">
          {/* Left Column: Details & Narrative */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-surface-hover text-[11px] font-mono font-medium text-foreground">
                <Award size={12} className="text-foreground" />
                Featured Case Study
              </span>
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                {featuredProject.category}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                {featuredProject.name}
              </h3>
              <p className="text-sm sm:text-base font-medium text-muted mt-1">
                {featuredProject.subtitle}
              </p>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              {featuredProject.description}
            </p>

            {/* Metrics & Accolades */}
            {featuredProject.metrics && (
              <ul className="space-y-1.5 pt-1 text-xs text-foreground font-mono">
                {featuredProject.metrics.map((m, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Stack Pills (Restrained) */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {featuredProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-hover border border-border-subtle text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Launch Link */}
            {featuredProject.url && (
              <div className="pt-2">
                <a
                  href={featuredProject.url.startsWith("http") ? featuredProject.url : `https://${featuredProject.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:opacity-75 transition-opacity"
                >
                  <span>Explore Project</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Architectural UI Visual */}
          <div className="relative rounded-xl border border-border bg-surface-hover p-6 sm:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[300px] overflow-hidden">
            {/* Architectural Blueprint Pattern */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3 text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5">
                  <Database size={13} />
                  <span>PostgreSQL + ML Engine</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-foreground text-background font-semibold uppercase">
                  Production
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg border border-border bg-surface flex items-center justify-between">
                  <span className="text-muted">FastAPI ML Service</span>
                  <span className="text-emerald-500 font-semibold text-[11px]">Active</span>
                </div>
                <div className="p-3 rounded-lg border border-border bg-surface flex items-center justify-between">
                  <span className="text-muted">Laravel API Gateway</span>
                  <span className="text-foreground font-semibold text-[11px]">RESTful</span>
                </div>
                <div className="p-3 rounded-lg border border-border bg-surface flex items-center justify-between">
                  <span className="text-muted">Circulation Forecasting</span>
                  <span className="text-foreground font-semibold text-[11px]">Automated</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-subtle">
              <span>Presented at BINHI 2026</span>
              <span>CICTMO Accepted</span>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Secondary Projects: 2-Column Editorial Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {secondaryProjects.map((project, i) => {
          const projectHref = project.url
            ? project.url.startsWith("http")
              ? project.url
              : `https://${project.url}`
            : project.github || "#";

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-xl border border-border bg-surface p-6 flex flex-col justify-between hover:border-foreground/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted">
                  <span className="uppercase tracking-wider text-[10px]">{project.category}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-surface-hover border border-border font-medium">
                    {project.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    {projectHref !== "#" ? (
                      <a
                        href={projectHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-between w-full focus-visible:outline-none"
                      >
                        <span className="group-hover:text-foreground/90 transition-colors">
                          {project.name}
                        </span>
                        <ArrowUpRight
                          size={15}
                          className="text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2"
                        />
                        <span className="absolute inset-0" aria-hidden="true" />
                      </a>
                    ) : (
                      <span>{project.name}</span>
                    )}
                  </h4>
                  {project.subtitle && (
                    <p className="text-xs font-medium text-muted mt-0.5">
                      {project.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-border-subtle flex items-center justify-between gap-3 relative z-10">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-hover text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

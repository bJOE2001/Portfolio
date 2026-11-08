"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Layers, FileCheck2, Github } from "lucide-react";
import { projects } from "@/data/portfolio";
import type { Project } from "@/data/types";

function ArchitecturePanel({ project }: { project: Project }) {
  if (!project.architectureSummary) return null;
  const { headerLabel, badgeLabel, nodes, footerLeft, footerRight } =
    project.architectureSummary;

  return (
    <div
      aria-label={`${project.name} technical architecture summary`}
      className="relative rounded-xl border border-border bg-surface-hover/60 p-5 sm:p-6 flex flex-col justify-between gap-5"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-border pb-3 text-xs font-mono text-muted">
          <span className="flex items-center gap-1.5">
            <Layers size={13} aria-hidden="true" />
            <span>{headerLabel}</span>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-foreground text-background font-semibold uppercase tracking-wider">
            {badgeLabel}
          </span>
        </div>

        <div className="space-y-2 text-xs font-mono">
          {nodes.map((node) => (
            <div
              key={node.label}
              className="p-3 rounded-lg border border-border bg-surface flex items-center justify-between gap-3"
            >
              <span className="text-muted">{node.label}</span>
              <span className="text-foreground font-semibold text-[11px] text-right">
                {node.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-border flex items-center justify-between gap-2 text-[11px] font-mono text-subtle">
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const primaryProject = projects.find((p) => p.tier === "primary") || projects[0];
  const corePairProjects = projects.filter(
    (p) => p.tier === "core" && p.slug !== "librasense"
  );
  const researchProject = projects.find((p) => p.slug === "librasense");
  const additionalProjects = projects.filter((p) => p.tier === "additional");

  return (
    <section id="work" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="space-y-3 mb-12 sm:mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
          01 / SELECTED WORK
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Selected Systems &amp; Case Studies.
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Real-world web applications, organizational management platforms, and workflow systems built with modern full-stack engineering.
        </p>
      </div>

      {/* 1. Primary Featured System: TCYSDO */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-border bg-surface p-6 sm:p-9 hover:border-foreground/35 transition-colors duration-300 mb-6"
      >
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 sm:gap-10 items-center">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border bg-surface-hover text-[11px] font-mono font-medium text-foreground">
                Featured Project
              </span>
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                {primaryProject.category}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {primaryProject.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-foreground/85 mt-1.5">
                Role: {primaryProject.role}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {primaryProject.description}
            </p>

            {primaryProject.highlights && (
              <ul className="space-y-1.5 pt-1 text-xs text-foreground font-mono">
                {primaryProject.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              {primaryProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-hover border border-border-subtle text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-3">
              {primaryProject.url && (
                <a
                  href={primaryProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:opacity-75 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>Visit Live System</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              <Link
                href={`/projects/${primaryProject.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span>Case Study</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <ArchitecturePanel project={primaryProject} />
        </div>
      </motion.article>

      {/* 2 & 3. Core Featured Systems: Leave Management & New Life SOL */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {corePairProjects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-7 flex flex-col justify-between hover:border-foreground/35 transition-colors duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="uppercase tracking-wider text-[10px] text-muted">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-surface-hover border border-border text-foreground font-medium shrink-0">
                  {project.statusLabel}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {project.name}
                </h3>
                <p className="text-xs font-mono text-foreground/85 mt-1">
                  Role: {project.role}
                </p>
              </div>

              <p className="text-sm text-muted leading-relaxed">
                {project.description}
              </p>

              {/* Compact Technical Module Strip */}
              {project.architectureSummary && (
                <div className="rounded-lg border border-border-subtle bg-surface-hover/50 p-3.5 space-y-2 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-subtle pb-1.5 border-b border-border-subtle">
                    <span>{project.architectureSummary.headerLabel}</span>
                    <span>{project.architectureSummary.badgeLabel}</span>
                  </div>
                  {project.architectureSummary.nodes.map((node) => (
                    <div
                      key={node.label}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-muted">{node.label}</span>
                      <span className="text-foreground font-medium text-right">
                        {node.detail}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-5 mt-5 border-t border-border-subtle space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-hover border border-border-subtle text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:opacity-75 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span>Visit Live System</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>Case Study</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* 4. Full-Stack & ML Research Showcase: LibraSense */}
      {researchProject && (
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-border bg-surface p-6 sm:p-9 hover:border-foreground/35 transition-colors duration-300 mb-10"
        >
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 sm:gap-10 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border bg-surface-hover text-[11px] font-mono font-medium text-foreground">
                  {researchProject.statusLabel}
                </span>
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  {researchProject.category}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {researchProject.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-foreground/85 mt-1">
                  Role: {researchProject.role}
                </p>
              </div>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {researchProject.description}
              </p>

              {/* Verified Proof Links */}
              {researchProject.proofLinks && (
                <div className="flex flex-wrap gap-3 pt-0.5">
                  {researchProject.proofLinks.map((proof) => (
                    <a
                      key={proof.label}
                      href={proof.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-surface-hover/50 text-[11px] font-mono text-foreground hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                    >
                      <FileCheck2 size={12} className="text-muted shrink-0" aria-hidden="true" />
                      <span>{proof.label}</span>
                      <ArrowUpRight size={11} className="text-muted shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {researchProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-hover border border-border-subtle text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                {researchProject.url && (
                  <a
                    href={researchProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:opacity-75 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span>Project Link</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                <Link
                  href={`/projects/${researchProject.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>Case Study</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ArchitecturePanel project={researchProject} />
          </div>
        </motion.article>
      )}

      {/* 5 & 6. Additional Projects */}
      {additionalProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
            Additional Projects
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {additionalProjects.map((project, i) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-xl border border-border bg-surface p-6 flex flex-col justify-between hover:border-foreground/35 transition-colors duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted">
                    <span className="uppercase tracking-wider text-[10px]">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-surface-hover border border-border text-foreground font-medium">
                      {project.statusLabel}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      {project.name}
                    </h4>
                    <p className="text-xs font-mono text-muted mt-0.5">
                      Role: {project.role}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-subtle space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-hover border border-border-subtle text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:opacity-75 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                      >
                        <Github size={13} aria-hidden="true" />
                        <span>Repository</span>
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </a>
                    ) : project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:opacity-75 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                      >
                        <span>Visit Live Site</span>
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </a>
                    ) : null}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                    >
                      <span>Details</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

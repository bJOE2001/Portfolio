import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileCheck2, Github, Mail } from "lucide-react";
import { projects, profile } from "@/data/portfolio";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} — Case Study`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — Case Study | ${profile.name}`,
      description: project.description,
      url: `https://bellyjoe.dev/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-10 py-10 sm:py-16"
    >
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Selected Work</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-5 pb-10 border-b border-border">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded-full border border-border bg-surface text-foreground font-medium">
            {project.statusLabel}
          </span>
          <span className="text-muted uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.08]">
            {project.name}
          </h1>
          {project.subtitle && (
            <p className="text-base sm:text-lg text-muted mt-2">
              {project.subtitle}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs font-mono">
          <div className="p-4 rounded-xl border border-border bg-surface">
            <span className="text-[10px] uppercase tracking-wider text-subtle block mb-1">
              My Role &amp; Contribution
            </span>
            <span className="text-foreground font-medium">{project.role}</span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-surface">
            <span className="text-[10px] uppercase tracking-wider text-subtle block mb-1">
              Technologies Used
            </span>
            <span className="text-foreground font-medium">
              {project.tags.join(" · ")}
            </span>
          </div>
        </div>

        {/* Authorized Links & Proof */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.url && !project.github && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>Open Live Project</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Github size={13} aria-hidden="true" />
              <span>View GitHub Repository</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}

          {project.proofLinks?.map((proof) => (
            <a
              key={proof.label}
              href={proof.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-border bg-surface text-foreground text-xs font-mono hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              <FileCheck2 size={13} className="text-muted" aria-hidden="true" />
              <span>{proof.label}</span>
              <ArrowUpRight size={12} className="text-muted" aria-hidden="true" />
            </a>
          ))}
        </div>
      </header>

      {/* Structured Case Study Content */}
      <div className="divide-y divide-border">
        {/* 1. Overview */}
        <section className="py-8 sm:py-10 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted pt-1">
            01 / Overview
          </h2>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {caseStudy.overview}
          </p>
        </section>

        {/* 2. Problem / Business Need */}
        <section className="py-8 sm:py-10 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted pt-1">
            02 / Business Need
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {caseStudy.problem}
          </p>
        </section>

        {/* 3. Proposed Solution */}
        <section className="py-8 sm:py-10 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted pt-1">
            03 / Solution
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {caseStudy.solution}
          </p>
        </section>

        {/* 4. My Responsibilities */}
        <section className="py-8 sm:py-10 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted pt-1">
            04 / Responsibilities
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-base text-muted leading-relaxed">
            {caseStudy.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Main Features */}
        <section className="py-8 sm:py-10 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted pt-1">
            05 / Key Features
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono text-foreground">
            {caseStudy.features.map((feature) => (
              <li
                key={feature}
                className="p-3.5 rounded-lg border border-border bg-surface leading-snug"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Technical Challenges (Only when documented) */}
        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <section className="py-8 sm:py-10 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted pt-1">
              06 / Challenges
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base text-muted leading-relaxed">
              {caseStudy.challenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 7. Results & Verified Outcomes */}
        <section className="py-8 sm:py-10 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted pt-1">
            {caseStudy.challenges?.length ? "07" : "06"} / Outcomes
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-base text-foreground leading-relaxed">
            {caseStudy.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0"
                  aria-hidden="true"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Bottom Freelance CTA */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Need a similar application for your organization?
          </h2>
          <p className="text-sm text-muted">
            Let&apos;s discuss your requirements and plan a reliable technical solution.
          </p>
        </div>

        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent(
            `Project Inquiry — Inspired by ${project.name}`
          )}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Mail size={13} aria-hidden="true" />
          <span>Start a Project</span>
        </a>
      </div>
    </main>
  );
}

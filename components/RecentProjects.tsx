"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { projects } from "@/data/portfolio";

export default function RecentProjects() {
  return (
    <motion.section 
      id="projects" 
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="section-label mb-0">Projects</p>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {projects.map((project, i) => {
          const isOngoing = project.status === "ongoing";
          const hasUrl = !!project.url;

          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.22, delay: i * 0.05 }}
              className="group py-3"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3 min-w-0">
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border bg-[var(--accent-light)] border-[var(--border)]`}>
                    <span className="text-xs font-black text-[var(--text)]">
                      {project.name.charAt(0)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Name + status badge */}
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-semibold text-[var(--text)]">{project.name}</span>
                      {isOngoing && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--text)] border border-[var(--border)]">
                          <Clock size={9} /> Ongoing
                        </span>
                      )}
                      {hasUrl && !isOngoing && (
                        <span className="font-mono text-[10px] text-[var(--text-light)] bg-[var(--accent-light)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                          {project.url}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">{project.description}</p>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--text-muted)] border border-[var(--border)]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Mobile external link */}
                    {hasUrl && (
                      <a
                        href={`https://${project.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--accent-text)] hover:underline sm:hidden"
                      >
                        <ExternalLink size={12} />
                        <span>Open project</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Desktop / tablet external link */}
                {hasUrl && (
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex self-auto p-1.5 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text-light)] hover:text-[var(--text)] transition-colors shrink-0 mt-0.5"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

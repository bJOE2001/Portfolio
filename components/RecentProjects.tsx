"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { projects } from "@/data/portfolio";

export default function RecentProjects() {
  return (
    <section id="projects" className="card p-5">
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
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${isOngoing ? "bg-amber-50 border-amber-100" : "bg-violet-50 border-violet-100"}`}>
                    <span className={`text-xs font-black ${isOngoing ? "text-amber-600" : "text-violet-600"}`}>
                      {project.name.charAt(0)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Name + status badge */}
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-semibold text-[var(--text)]">{project.name}</span>
                      {isOngoing && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                          <Clock size={9} /> Ongoing
                        </span>
                      )}
                      {hasUrl && !isOngoing && (
                        <span className="font-mono text-[10px] text-[var(--text-light)] bg-gray-100 px-1.5 py-0.5 rounded">
                          {project.url}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">{project.description}</p>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-[var(--text-muted)] border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External link */}
                {hasUrl && (
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:bg-violet-50 text-[var(--text-light)] hover:text-violet-600 transition-colors shrink-0 mt-0.5"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

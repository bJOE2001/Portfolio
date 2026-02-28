"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { certifications } from "@/data/portfolio";

const MAX_VISIBLE = 5;

const issuerColors: Record<string, string> = {
  Huawei:   "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  Google:   "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  TestDome: "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  Oracle:   "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  "Amazon Web Services (AWS)": "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  "Vue Mastery": "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
};

function CertRow({ cert, i }: { cert: typeof certifications[0]; i: number }) {
  return (
    <motion.a
      href={cert.link !== "#" ? cert.link : undefined}
      target={cert.link !== "#" ? "_blank" : undefined}
      rel="noreferrer"
      key={cert.name}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, delay: i * 0.04 }}
      className="group flex flex-col items-start sm:flex-row sm:items-center gap-2.5 sm:gap-3 py-2.5 hover:bg-[var(--accent-light)] -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
    >
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${
          issuerColors[cert.issuer] ?? "bg-[var(--accent-light)] text-[var(--text-muted)] border-[var(--border)]"
        }`}
      >
        {cert.issuer}
      </span>
      <p className="text-xs font-medium text-[var(--text)] flex-1 leading-tight">{cert.name}</p>
      <span className="text-[11px] text-[var(--text-light)] shrink-0">{cert.date}</span>
    </motion.a>
  );
}

export default function RecentCertifications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const visible = certifications.slice(0, MAX_VISIBLE);
  const hasMore = certifications.length > MAX_VISIBLE;

  useEffect(() => setMounted(true), []);

  return (
    <>
      <motion.section
        className="card p-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="section-label mb-0">Certifications</p>
          {hasMore && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-text)] hover:underline"
            >
              View All <ArrowUpRight size={12} />
            </button>
          )}
        </div>

        <div className="divide-y divide-[var(--border)]">
          {visible.map((cert, i) => (
            <CertRow cert={cert} i={i} key={cert.name} />
          ))}
        </div>
      </motion.section>

      {/* ── Modal ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {modalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                onClick={() => setModalOpen(false)}
              />

              {/* Panel */}
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
              >
                <div
                  className="w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl pointer-events-auto max-h-[80vh] flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                    <div>
                      <h2 className="text-sm font-bold text-[var(--text)]">All Certifications</h2>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{certifications.length} total</p>
                    </div>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* List */}
                  <div className="overflow-y-auto px-5 py-3 divide-y divide-[var(--border)]">
                    {certifications.map((cert, i) => (
                      <CertRow cert={cert} i={i} key={cert.name + i} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X, ZoomIn, ZoomOut } from "lucide-react";
import { experience, certifications } from "@/data/portfolio";

export default function Experience() {
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const activeCert =
    activeCertIndex !== null ? certifications[activeCertIndex] : null;

  function openCertificate(index: number) {
    setActiveCertIndex(index);
    setIsZoomed(false);
  }

  function closeCertificate() {
    setActiveCertIndex(null);
    setIsZoomed(false);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeCertIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCertificate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCertIndex]);

  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="space-y-3 mb-12 sm:mb-14">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
          04 / EXPERIENCE &amp; RECOGNITION
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Background &amp; Verified Credentials.
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Professional software roles, remote content management experience, academic background, and verified certificates.
        </p>
      </div>

      {/* Part A: Experience & Education Timeline */}
      <div className="divide-y divide-border">
        {experience.map((item, i) => (
          <motion.div
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="py-6 sm:py-7 grid sm:grid-cols-[160px_1fr] gap-3 sm:gap-8 items-start"
          >
            {/* Period Column */}
            <div className="font-mono text-xs text-muted flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1">
              <span className="font-semibold text-foreground">{item.year}</span>
              <span className="text-[11px] text-subtle">
                {item.period || item.year}
              </span>
            </div>

            {/* Role & Details Column */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                {item.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    Present
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-medium text-muted font-mono">
                {item.company}
                {item.location ? ` · ${item.location}` : ""}
              </p>

              {item.description && (
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-hover border border-border-subtle text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Part B: Recognition & Credentials */}
      <div id="proof" className="pt-14 sm:pt-16 mt-6 border-t border-border-subtle">
        <div className="space-y-2 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Recognition &amp; Certificates
          </h3>
          <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
            Selected academic research presentation, capstone completion, internship, and Cisco Networking Academy certificates. Select any item to inspect the original document.
          </p>
        </div>

        <div className="divide-y divide-border">
          {certifications.map((cert, i) => (
            <button
              key={cert.name}
              type="button"
              onClick={() => openCertificate(i)}
              className="group w-full text-left py-4 sm:py-5 grid sm:grid-cols-[80px_1fr_auto] gap-2 sm:gap-4 items-center cursor-pointer hover:bg-surface-hover/60 -mx-3 px-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              <span className="font-mono text-xs text-muted font-medium">
                {cert.year || cert.date.slice(-4)}
              </span>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-foreground group-hover:text-foreground/85 transition-colors">
                    {cert.name}
                  </span>
                  {cert.highlight && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-border bg-surface text-subtle">
                      {cert.highlight}
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-muted">
                  {cert.issuer} · {cert.date}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted group-hover:text-foreground transition-colors sm:justify-end">
                <span className="text-[11px] uppercase tracking-wider">
                  View Proof
                </span>
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Certificate Proof Lightbox Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCert && (
              <>
                <motion.div
                  key="cert-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[10001] bg-black/85 backdrop-blur-md"
                  onClick={closeCertificate}
                />

                <motion.div
                  key="cert-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="certificate-modal-title"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed inset-0 z-[10002] p-4 sm:p-8 flex flex-col justify-between pointer-events-none"
                >
                  <div className="flex items-center justify-between gap-3 pointer-events-auto bg-black/50 backdrop-blur-md rounded-xl p-3 px-4 border border-white/15 text-white max-w-4xl mx-auto w-full">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 block truncate">
                        {activeCert.issuer} · {activeCert.date}
                      </span>
                      <h4
                        id="certificate-modal-title"
                        className="text-xs sm:text-sm font-semibold truncate"
                      >
                        {activeCert.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsZoomed(!isZoomed)}
                        aria-label={isZoomed ? "Zoom out certificate" : "Zoom in certificate"}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {isZoomed ? (
                          <ZoomOut size={16} aria-hidden="true" />
                        ) : (
                          <ZoomIn size={16} aria-hidden="true" />
                        )}
                      </button>

                      {activeCert.link && activeCert.link !== "#" && (
                        <a
                          href={activeCert.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open original certificate image in new tab"
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={closeCertificate}
                        aria-label="Close certificate preview"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <X size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-auto pointer-events-auto">
                    <div
                      className={`relative transition-all duration-300 ${
                        isZoomed
                          ? "w-[95vw] sm:w-[85vw] h-[80vh] cursor-zoom-out"
                          : "max-w-3xl max-h-[70vh] w-full h-[60vh] cursor-zoom-in"
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <Image
                        src={activeCert.image}
                        alt={`${activeCert.name} certificate issued by ${activeCert.issuer}`}
                        fill
                        sizes="(max-width: 768px) 95vw, 80vw"
                        className="object-contain drop-shadow-2xl rounded-lg"
                        priority
                      />
                    </div>
                  </div>

                  <div className="text-center pointer-events-auto text-[11px] font-mono text-white/60">
                    <span>Press Escape or click outside to close</span>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
